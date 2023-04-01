package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/middleware"
	"server/model"
)

func (r *RouteController) ApplyTable(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		Redis:          r.Redis,
		DatabaseName:   r.DatabaseName,
		CollectionName: model.TABLE_COLL_NAME,
	}

	permHandler := middleware.PermissionHandler{
		MongoClient:  r.Mongo,
		DatabaseName: r.DatabaseName,
	}

	throttleHandler := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "table",
		LimitCount:  10,
		TTL:         20,
		Debug:       false,
	}

	createThrottle := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "table/create",
		LimitCount:  1,
		TTL:         5,
		Debug:       false,
	}

	public := router.Group("/table")
	public.Use(throttleHandler.Limit())
	{
		// api.sushikame.com/table/availability?day=4?month=1?year=2023
		public.GET("/availability", ctrl.GetTablesOnDate())
	}

	private := router.Group("/table")
	private.Use(createThrottle.Limit())
	{
		private.POST("/", ctrl.CreateTable())
	}

	admin := router.Group("/table")
	admin.Use(middleware.Authorize())
	admin.Use(permHandler.AttachPermissions())
	{
		// ...
	}
}
