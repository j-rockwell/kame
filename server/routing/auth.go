package routing

import (
	"github.com/gin-gonic/gin"
	"server/config"
	"server/controller"
	"server/middleware"
)

// ApplyAuth applies auth endpoints to the provided
// gin router
func (r *RouteController) ApplyAuth(router *gin.Engine) {
	conf := config.Prepare()

	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		Redis:          r.Redis,
		DatabaseName:   r.DatabaseName,
		CollectionName: "", // left nil since this route is coupled closely with accounts
	}

	throttleHandler := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "auth",
		LimitCount:  60,
		TTL:         10,
		Debug:       conf.Gin.Mode != gin.ReleaseMode,
	}

	public := router.Group("/auth")
	public.Use(throttleHandler.Limit())
	{
		public.GET("/refresh", ctrl.RefreshToken())
		public.POST("/", ctrl.AuthWithCredentials())
	}

	private := router.Group("/auth")
	private.Use(throttleHandler.Limit())
	private.Use(middleware.Authorize())
	{
		private.GET("/token", ctrl.AuthWithToken())
		private.DELETE("/logout", ctrl.Invalidate())
	}
}
