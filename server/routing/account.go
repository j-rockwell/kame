package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
)

// ApplyAccounts applies account endpoints to the
// provided gin router
func ApplyAccounts(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          nil,
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
