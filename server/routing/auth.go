package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
)

// ApplyAuth applies auth endpoints to the provided
// gin router
func ApplyAuth(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          nil,
		DatabaseName:   "prod",
		CollectionName: "account",
	}

	public := router.Group("/auth")
	{
		public.POST("/", ctrl.AuthWithCredentials())
	}

	private := router.Group("/auth")
	{
		private.POST("/refresh", ctrl.RefreshToken())
		private.DELETE("/logout", ctrl.Invalidate())
	}
}
