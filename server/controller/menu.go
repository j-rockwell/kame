package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/database"
	"server/model"
	"strconv"
)

// GetMenus queries and returns all menus in the database
func (controller *DataController) GetMenus() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// GetAvailableMenus returns all available menus on the provided
// day, month, year, and timeslot
func (controller *DataController) GetAvailableMenus() gin.HandlerFunc {
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: controller.CollectionName,
	}

	blackoutmqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: model.MENU_BLACKOUT_COLL_NAME,
	}

	return func(ctx *gin.Context) {
		dayStr, dayPresent := ctx.GetQuery("day")
		monthStr, monthPresent := ctx.GetQuery("month")
		yearStr, yearPresent := ctx.GetQuery("year")
		groupStr, groupPresent := ctx.GetQuery("group")

		if !dayPresent || !monthPresent || !yearPresent || !groupPresent {
			ctx.AbortWithStatusJSON(
				http.StatusBadRequest,
				GenerateErrorResponse("day, month, year and group must be present in query params"))

			return
		}

		day, err := strconv.Atoi(dayStr)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("day invalid number"))
			return
		}

		month, err := strconv.Atoi(monthStr)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("month invalid number"))
			return
		}

		year, err := strconv.Atoi(yearStr)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("year invalid number"))
			return
		}

		group, err := model.GetTableGroupFromString(groupStr)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse(err.Error()))
			return
		}

		// Query menus with the matching attributes:
		//	- day, month, year match
		//	- active is true
		result, err := database.FindManyDocumentsByKeyValue[bool, model.Menu](mqp, "active", true)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.AbortWithStatusJSON(http.StatusNotFound, GenerateErrorResponse("no available menus"))
				return
			}

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to perform query on menus:\n"+err.Error()))
			return
		}

		var available []model.MenuSanitized
		for _, menu := range result {
			filter := bson.M{}
			filter["menu"] = menu.ID
			filter["time.day"] = day
			filter["time.month"] = month
			filter["time.year"] = year
			filter["group"] = group

			_, err := database.FindDocumentByFilter[model.MenuBlackout](blackoutmqp, filter)
			if err != nil {
				if err == mongo.ErrNoDocuments {
					sanitized := model.MenuSanitized{
						ID:    menu.ID,
						Name:  menu.Name,
						Price: menu.Price,
					}

					available = append(available, sanitized)
					continue
				}

				ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to query blackout dates for menus"))
				return
			}
		}

		ctx.JSON(http.StatusOK, available)
	}
}

// CreateMenu creates a new menu and inserts the document in to the database
func (controller *DataController) CreateMenu() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var params model.CreateMenuRequest
		err := ctx.ShouldBindJSON(&params)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to bind params"))
			return
		}
	}
}

// UpdateMenu updates an existing menu object in the database
func (controller *DataController) UpdateMenu() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var params model.UpdateMenuRequest
		err := ctx.ShouldBindJSON(&params)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to bind params"))
			return
		}
	}
}

// DeleteMenu deletes a menu object from the database
func (controller *DataController) DeleteMenu() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		idStr, idPresent := ctx.GetQuery("id")
		if !idPresent {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("document id not present"))
			return
		}

		id, err := primitive.ObjectIDFromHex(idStr)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("invalid id hex"))
			return
		}

		fmt.Println(id) // TODO: impl DeleteMenu func
	}
}
