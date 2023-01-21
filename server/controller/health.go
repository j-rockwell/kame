package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// GetStatus returns a plain OK 200 to signal to external clients
// the server is currently online.
func (controller *DataController) GetStatus() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Status(http.StatusOK)
	}
}
