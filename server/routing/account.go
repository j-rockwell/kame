package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/middleware"
)

// ApplyAccounts applies account endpoints to the
// provided gin router
func (r *RouteController) ApplyAccounts(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		DatabaseName:   "prod",
		CollectionName: "account",
	}

	public := router.Group("/account")
	{
		public.GET("/availability/email/:email", ctrl.GetEmailAvailability())
		public.POST("/", ctrl.CreateAccount())
	}

	private := router.Group("/account")
	private.Use(middleware.Authorize())
	{
		private.PUT("/", ctrl.UpdateAccount())
	}
}
