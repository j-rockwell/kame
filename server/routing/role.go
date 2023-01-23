package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
)

// ApplyRoles apply role routes to the provided gin router
func (r *RouteController) ApplyRoles(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		DatabaseName:   "prod",
		CollectionName: "role",
	}

	private := router.Group("/role")
	{
		private.GET("/", ctrl.GetRoles())
		private.GET("/:accountId", ctrl.GetRolesByAccount())

		private.POST("/", ctrl.CreateRole())
		private.POST("/account/grant", ctrl.GrantRole())
		private.POST("/account/revoke", ctrl.RevokeRole())
		private.POST("/grant", ctrl.GrantRolePermission())
		private.POST("/revoke", ctrl.RevokeRolePermission())

		private.PUT("/", ctrl.UpdateRole())

		private.DELETE("/", ctrl.DeleteRole())
	}
}
