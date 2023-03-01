package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/middleware"
	"server/model"
)

// ApplyMenu applies menu specific routes to the provided gin router
func (r *RouteController) ApplyMenu(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		Redis:          r.Redis,
		DatabaseName:   r.DatabaseName,
		CollectionName: model.MENU_COLL_NAME,
	}

	permHandler := middleware.PermissionHandler{
		MongoClient:  r.Mongo,
		DatabaseName: r.DatabaseName,
	}

	public := router.Group("/menu")
	{
		public.GET("/availability", ctrl.GetAvailableMenus())
	}

	private := router.Group("/menu")
	private.Use(middleware.Authorize())
	private.Use(permHandler.AttachPermissions())
	{
		private.GET("/", ctrl.GetMenus())
		private.POST("/", ctrl.CreateMenu())
		private.PUT("/", ctrl.UpdateMenu())
		private.DELETE("/", ctrl.DeleteMenu())
	}
}
