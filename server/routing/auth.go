package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/middleware"
)

// ApplyAuth applies auth endpoints to the provided
// gin router
func (r *RouteController) ApplyAuth(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		DatabaseName:   "prod",
		CollectionName: "account",
	}

	public := router.Group("/auth")
	{
		public.POST("/", ctrl.AuthWithCredentials())
	}

	private := router.Group("/auth")
	private.Use(middleware.Authorize())
	{
		private.POST("/refresh", ctrl.RefreshToken())
		private.DELETE("/logout", ctrl.Invalidate())
	}
}
