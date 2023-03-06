package controller

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/auth"
	"server/config"
	"server/database"
	"server/model"
	"server/validate"
)

// AuthWithCredentials attempts to authenticate an account using email/password
// combination and if successful will return a new auth token in 200 OK response
func (controller *DataController) AuthWithCredentials() gin.HandlerFunc {
	conf := config.Prepare()
	accessTokenPubkey := conf.Auth.AccessTokenPubkey
	accessTokenTTL := conf.Auth.AccessTokenTTL
	refreshTokenPubkey := conf.Auth.RefreshTokenPubkey
	refreshTokenTTL := conf.Auth.RefreshTokenTTL
	isReleaseVersion := conf.Gin.Mode == "release"

	// account mqp only
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: model.ACCOUNT_COLL_NAME,
	}

	rqp := database.RedisQueryParams{
		RedisClient: controller.Redis,
	}

	return func(ctx *gin.Context) {
		var params model.AuthWithStandardCredentialsRequest

		err := ctx.ShouldBindJSON(&params)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to bind params: "+err.Error()))
			return
		}

		account, err := database.FindDocumentByKeyValue[string, model.Account](mqp, "email_address", params.Email)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.AbortWithStatusJSON(http.StatusNotFound, GenerateErrorResponse("account not found"))
				return
			}

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to query account"))
			panic("failed to query account:\n" + err.Error())
			return
		}

		if !auth.IsMatchedHash(account.Password, params.Password) {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, GenerateErrorResponse("password does not match"))
			return
		}

		accessToken, err := auth.GenerateToken(account.ID.Hex(), accessTokenPubkey, int(accessTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to generate access token"))
			panic("failed to generate access token:\n" + err.Error())
			return
		}

		refreshToken, err := auth.GenerateToken(account.ID.Hex(), refreshTokenPubkey, int(refreshTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to generate refresh token"))
			panic("failed to generate refresh token:\n" + err.Error())
			return
		}

		res := model.AuthSuccessResponse{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}

		_, err = database.SetCacheValue(rqp, refreshToken, account.ID.Hex(), int(refreshTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to cache refresh token"))
			panic("failed to cache refresh token:\n" + err.Error())
			return
		}

		var cookieDomain = ".localhost"
		if isReleaseVersion {
			cookieDomain = "*.sushikame.com"
		}

		ctx.SetSameSite(http.SameSiteStrictMode)
		ctx.SetCookie("refresh_token", refreshToken, int(refreshTokenTTL), "/", cookieDomain, true, true)
		ctx.JSON(http.StatusOK, res)
	}
}

// AuthWithToken attempts to authorize a user using a token provided
// in their request params
func (controller *DataController) AuthWithToken() gin.HandlerFunc {
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: controller.CollectionName,
	}

	return func(ctx *gin.Context) {
		id := ctx.GetString("accountId")
		account, err := database.FindDocumentById[model.Account](mqp, id)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to query account"))
			return
		}

		res := model.AuthWithTokenResponse{
			ID:           account.ID,
			EmailAddress: account.EmailAddress,
			FirstName:    account.FirstName,
			LastName:     account.LastName,
		}

		ctx.JSON(http.StatusOK, res)
	}
}

// RefreshToken attempts to refresh an accounts auth token and updates the
// token in our caching layer
func (controller *DataController) RefreshToken() gin.HandlerFunc {
	conf := config.Prepare()
	accessTokenPubKey := conf.Auth.AccessTokenPubkey
	accessTokenTTL := conf.Auth.AccessTokenTTL
	refreshTokenPubKey := conf.Auth.RefreshTokenPubkey
	rqp := database.RedisQueryParams{RedisClient: controller.Redis}
	accmqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: model.ACCOUNT_COLL_NAME,
	}

	return func(ctx *gin.Context) {
		refreshToken, err := ctx.Cookie("refresh_token")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to read refresh_token cookie"))
			return
		}

		_, err = validate.Token(refreshToken, refreshTokenPubKey)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to validate refresh token"))
			return
		}

		accountId, err := database.GetCacheValue(rqp, refreshToken)
		if err != nil || accountId == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, GenerateErrorResponse("account not found"))
			return
		}

		_, err = database.FindDocumentById[model.Account](accmqp, accountId)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.AbortWithStatusJSON(http.StatusNotFound, GenerateErrorResponse("account not found"))
				return
			}

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to perform account query"))
			panic("failed to perform account query during token refresh:\n" + err.Error())
			return
		}

		newToken, err := auth.GenerateToken(accountId, accessTokenPubKey, int(accessTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to generate new token"))
			panic("failed to perform token generation while refreshing token:\n" + err.Error())
			return
		}

		res := model.RefreshTokenResponse{AccessToken: newToken}
		ctx.JSON(http.StatusOK, res)
	}
}

// Invalidate will destroy all cached auth credentials for the provided
// account connected to the request metadata
func (controller *DataController) Invalidate() gin.HandlerFunc {
	conf := config.Prepare()
	refreshTokenPubKey := conf.Auth.RefreshTokenPubkey
	isReleaseVersion := conf.Gin.Mode == "release"
	rqp := database.RedisQueryParams{RedisClient: controller.Redis}

	return func(ctx *gin.Context) {
		refreshToken, err := ctx.Cookie("refresh_token")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to read refresh token cookie"))
			return
		}

		_, err = validate.Token(refreshToken, refreshTokenPubKey)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, GenerateErrorResponse("failed to validate refresh token"))
			return
		}

		deleted, err := database.DeleteCacheValue(rqp, refreshToken)
		if err != nil || deleted <= 0 {
			ctx.AbortWithStatusJSON(http.StatusNotFound, GenerateErrorResponse("no tokens were deleted"))
			return
		}

		var cookieDomain string
		cookieDomain = ".localhost"
		if isReleaseVersion {
			cookieDomain = "*.sushikame.com"
		}

		ctx.SetCookie(
			"refresh_token",
			refreshToken,
			-1,
			"/",
			cookieDomain,
			true,
			true,
		)

		ctx.Status(http.StatusOK)
	}
}
