package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
)

func ApplyRoles(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          nil,
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