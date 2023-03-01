package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/middleware"
	"server/model"
)

// ApplyAccounts applies account endpoints to the
// provided gin router
func (r *RouteController) ApplyAccounts(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		Redis:          r.Redis,
		DatabaseName:   r.DatabaseName,
		CollectionName: model.ACCOUNT_COLL_NAME,
	}

	permHandler := middleware.PermissionHandler{
		MongoClient:  r.Mongo,
		DatabaseName: r.DatabaseName,
	}

	public := router.Group("/account")
	{
		public.GET("/availability/email/:email", ctrl.GetEmailAvailability())
		public.POST("/", ctrl.CreateAccount())
	}

	private := router.Group("/account")
	private.Use(middleware.Authorize())
	private.Use(permHandler.AttachPermissions())
	{
		private.PUT("/", ctrl.UpdateAccount())
	}
}
