package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/middleware"
	"server/model"
)

// ApplyRoles apply role routes to the provided gin router
func (r *RouteController) ApplyRoles(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		Redis:          r.Redis,
		DatabaseName:   r.DatabaseName,
		CollectionName: model.ROLE_COLL_NAME,
	}

	permHandler := middleware.PermissionHandler{
		MongoClient:  r.Mongo,
		DatabaseName: r.DatabaseName,
	}

	private := router.Group("/role")
	private.Use(middleware.Authorize())
	private.Use(permHandler.AttachPermissions())
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
