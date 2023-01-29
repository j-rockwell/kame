package controller

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/auth"
	"server/config"
	"server/database"
	"server/model"
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

		account, err := database.FindDocumentByKeyValue[string, model.Account](mqp, "email", params.Email)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.AbortWithStatus(http.StatusNotFound)
				return
			}

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to query account"))
			return
		}

		if !auth.IsMatchedHash(params.Password, account.Password) {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, GenerateErrorResponse("password does not match"))
			return
		}

		accessToken, err := auth.GenerateToken(account.ID.Hex(), accessTokenPubkey, int(accessTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to generate access token"))
			return
		}

		refreshToken, err := auth.GenerateToken(account.ID.Hex(), refreshTokenPubkey, int(refreshTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to generate refresh token"))
			return
		}

		res := model.AuthSuccessResponse{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}

		_, err = database.SetCacheValue(rqp, refreshToken, account.ID.Hex(), int(refreshTokenTTL))
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to cache refresh token"))
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

// RefreshToken attempts to refresh an accounts auth token and updates the
// token in our caching layer
func (controller *DataController) RefreshToken() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// Invalidate will destroy all cached auth credentials for the provided
// account connected to the request metadata
func (controller *DataController) Invalidate() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}
