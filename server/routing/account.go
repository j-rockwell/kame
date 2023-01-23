package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
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
		public.GET("/availability/email", ctrl.GetEmailAvailability())
		public.POST("/", ctrl.CreateAccount())
	}

	private := router.Group("/account")
	{
		private.PUT("/", ctrl.UpdateAccount())
	}
}
