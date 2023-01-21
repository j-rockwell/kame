package controller

import "github.com/gin-gonic/gin"

// AuthWithCredentials attempts to authenticate an account using email/password
// combination and if successful will return a new auth token in 200 OK response
func (controller *DataController) AuthWithCredentials() gin.HandlerFunc {
	return func(ctx *gin.Context) {

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
