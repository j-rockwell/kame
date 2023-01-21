package controller

import "github.com/gin-gonic/gin"

// CreateAccount will attempt to create a new account with provided
// credentials within the POST request. If successful an account will
// be created and the account id will be returned in an OK 200 response
func (controller *DataController) CreateAccount() gin.HandlerFunc {
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
