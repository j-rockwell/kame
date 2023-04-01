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

	createThrottle := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "account/create",
		LimitCount:  1,
		TTL:         5,
	}

	updateThrottle := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "account/update",
		LimitCount:  3,
		TTL:         30,
	}

	queryThrottle := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "account/query",
		LimitCount:  10,
		TTL:         15,
	}

	public := router.Group("/account")
	public.Use(queryThrottle.Limit())
	{
		public.GET("/availability/email/:email", ctrl.GetEmailAvailability())
	}

	publicThrottled := router.Group("/account")
	publicThrottled.Use(createThrottle.Limit())
	{
		publicThrottled.POST("/", ctrl.CreateAccount())
	}

	private := router.Group("/account")
	private.Use(middleware.Authorize())
	private.Use(permHandler.AttachPermissions())
	private.Use(updateThrottle.Limit())
	{
		private.PUT("/", ctrl.UpdateAccount())
	}
}
