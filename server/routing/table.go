package routing

import (
	"github.com/gin-gonic/gin"
	"server/controller"
	"server/model"
)

func (r *RouteController) ApplyTable(router *gin.Engine) {
	ctrl := controller.DataController{
		Mongo:          r.Mongo,
		Redis:          r.Redis,
		DatabaseName:   r.DatabaseName,
		CollectionName: model.TABLE_COLL_NAME,
	}

	public := router.Group("/table")
	{
		// api.sushikame.com/table/availability?day=4?month=1?year=2023
		public.GET("/availability", ctrl.GetTablesOnDate())
	}

	private := router.Group("/table")
	{
		private.POST("/", ctrl.CreateTable())
	}
}
