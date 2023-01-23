package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
)

// ApplyHealthCheck applies all health check routes to the
// provided gin router.
func (r *RouteController) ApplyHealthCheck(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		DatabaseName:   "",
		CollectionName: "",
	}

	router.GET("/status", ctrl.GetStatus())
}
