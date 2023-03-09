package controller

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/auth"
	"server/database"
	"server/model"
	"server/validate"
	"time"
)

// CreateAccount will attempt to create a new account with provided
// credentials within the POST request. If successful an account will
// be created and the account id will be returned in an OK 200 response
func (controller *DataController) CreateAccount() gin.HandlerFunc {
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: controller.CollectionName,
	}

	return func(ctx *gin.Context) {
		var params model.CreateAccountRequest
		err := ctx.ShouldBindJSON(&params)

		if err != nil {
			ctx.AbortWithStatusJSON(
				http.StatusBadRequest,
				GenerateErrorResponse("failed to unmarshal json obj: "+err.Error()),
			)
			return
		}

		err = validate.Email(params.EmailAddress)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse(err.Error()))
			return
		}

		err = validate.Name(params.FirstName)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse(err.Error()))
			return
		}

		err = validate.Name(params.LastName)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse(err.Error()))
			return
		}

		err = validate.Password(params.Password)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse(err.Error()))
			return
		}

		pwd, err := auth.GetHash(params.Password)
		if err != nil {
			ctx.AbortWithStatusJSON(
				http.StatusInternalServerError,
				GenerateErrorResponse("failed to generate hash: "+err.Error()),
			)
			return
		}

		account := model.Account{
			EmailAddress: params.EmailAddress,
			FirstName:    params.FirstName,
			LastName:     params.LastName,
			Password:     pwd,
			Phone:        params.Phone,
			Preferences:  params.Preferences,
			CreatedAt:    time.Now(),
		}

		id, err := database.InsertDocument(mqp, account)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "encountered an error while trying to insert document"})
			return
		}

		idHex, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "unable to convert new account id to hex"})
			return
		}

		accessToken, err := auth.GenerateToken(id, "test", 10) // TODO: Add pubkey from config file
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "unable to sign token"})
			return
		}

		refreshToken, err := auth.GenerateToken(id, "test", 10) // TODO: Add pubkey from config file
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "unable to sign refresh token"})
			return
		}

		// TODO: Set this to sushikame.com and/or booking.sushikame.com depending on release version
		domain := "*.localhost"
		ctx.SetSameSite(http.SameSiteStrictMode)
		// TODO: Set max age from config file
		ctx.SetCookie("refresh_token", refreshToken, 10, "/", domain, true, true)

		res := model.CreateAccountResponse{
			ID:           idHex,
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}

		ctx.JSON(http.StatusCreated, res)
	}
}

// UpdateAccount will attempt to update an existing account in the
// database provided with the credentials within the POST request.
// If successful, an account update response will be returned in
// an OK 200 response
func (controller *DataController) UpdateAccount() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// GetEmailAvailability queries the database for a provided email and returns
// a CONFLICT 409 response if there is an email in the database that matches or
// an OK 200 if the email can be used to create a new account
func (controller *DataController) GetEmailAvailability() gin.HandlerFunc {
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: controller.CollectionName,
	}

	return func(ctx *gin.Context) {
		email := ctx.Param("email")
		err := validate.Email(email)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		}

		_, err = database.FindDocumentByKeyValue[string, model.Account](mqp, "email_address", email)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.Status(http.StatusOK)
				return
			}

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "failed to query account data and can not verify"})
			return
		}

		ctx.Status(http.StatusConflict)
	}
}
