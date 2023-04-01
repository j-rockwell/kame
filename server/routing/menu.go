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

	throttleHandler := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "menu",
		LimitCount:  10,
		TTL:         20,
	}

	public := router.Group("/menu")
	public.Use(throttleHandler.Limit())
	{
		public.GET("/availability", ctrl.GetAvailableMenus())
	}

	private := router.Group("/menu")
	private.Use(throttleHandler.Limit())
	private.Use(middleware.Authorize())
	private.Use(permHandler.AttachPermissions())
	{
		private.GET("/", ctrl.GetMenus())
		private.POST("/", ctrl.CreateMenu())
		private.PUT("/", ctrl.UpdateMenu())
		private.DELETE("/", ctrl.DeleteMenu())
	}
}
