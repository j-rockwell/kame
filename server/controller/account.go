package controller

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"server/auth"
	"server/database"
	"server/model"
	"server/validate"
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
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "failed to unmarshal json obj: " + err.Error()})
			return
		}

		err = validate.ValidateEmail(params.EmailAddress)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		err = validate.ValidateName(params.FirstName)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error() + " (first name)"})
			return
		}

		err = validate.ValidateName(params.LastName)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error() + " (last name)"})
			return
		}

		err = validate.ValidatePassword(params.Password)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		account := model.Account{
			EmailAddress: params.EmailAddress,
			FirstName:    params.FirstName,
			LastName:     params.LastName,
			Password:     "",
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

		accessToken, err := auth.GenerateToken(id, "", 10)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "unable to sign token"})
			return
		}

		res := model.CreateAccountResponse{
			ID:          idHex,
			AccessToken: accessToken,
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
	return func(ctx *gin.Context) {

	}
}
