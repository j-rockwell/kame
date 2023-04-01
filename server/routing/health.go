package routing

import (
	"github.com/gin-gonic/gin"
	"server/config"
	"server/controller"
	"server/middleware"
)

// ApplyHealthCheck applies all health check routes to the
// provided gin router.
func (r *RouteController) ApplyHealthCheck(router *gin.Engine) {
	conf := config.Prepare()

	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		DatabaseName:   r.DatabaseName,
		CollectionName: "", // left nil, not needed here
	}

	throttleHandler := middleware.ThrottleHandler{
		RedisClient: r.Redis,
		Key:         "health",
		LimitCount:  5,
		TTL:         30,
		Debug:       conf.Gin.Mode != gin.ReleaseMode,
	}

	public := router.Group("/status")
	public.Use(throttleHandler.Limit())
	{
		public.GET("/", ctrl.GetStatus())
	}
}
