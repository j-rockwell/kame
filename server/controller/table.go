package controller

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"reflect"
	"server/database"
	"server/model"
	"time"
)

// GetTables will query and return all tables reserved
// within the next 30 days.
func (controller *DataController) GetTables() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// GetTablesOnDate will query and return all tables reserved
// within the provided day
func (controller *DataController) GetTablesOnDate() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// IsBlackoutDay will query and return true or false if the provided
// day is considered a blackout day
func (controller *DataController) IsBlackoutDay() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// CreateTable will attempt to create a new table reservation
func (controller *DataController) CreateTable() gin.HandlerFunc {
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: controller.CollectionName,
	}

	return func(ctx *gin.Context) {
		var params model.CreateTableRequest

		err := ctx.ShouldBindJSON(&params)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("failed to bind params"))
			return
		}

		existingByAttendee, err := database.FindDocumentByKeyValue[primitive.ObjectID, model.Table](mqp, "attendee", params.Attendee)
		if err != nil && err != mongo.ErrNoDocuments {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to query existing table requests (attendee)"))
			panic("failed to query existing table requests:\n" + err.Error())
			return
		}

		existingByGroup, err := database.FindManyDocumentsByKeyValue[model.TableGroup, model.Table](mqp, "group", params.Group)
		if err != nil && err != mongo.ErrNoDocuments {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to query existing table requests (group)"))
		}

		if !reflect.ValueOf(existingByAttendee).IsNil() {
			// TODO: Check if user has permissions to make more than one reservation for attendee
			ctx.AbortWithStatusJSON(http.StatusConflict, GenerateErrorResponse("attendee has too many reservations"))
			return
		}

		if !reflect.ValueOf(existingByGroup).IsNil() {
			ctx.AbortWithStatusJSON(http.StatusConflict, GenerateErrorResponse("group is not available"))
			return
		}

		if params.GroupSize < 1 {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("group size must be greater than 1"))
			return
		}

		if params.GroupSize > 10 {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("group size exceeds 10"))
			return
		}

		/*
			TODO: Permission checks we need to perform:
				- If req is creating a blackout, do they have perms to do so?
		*/

		table := model.Table{
			CreatedBy:   params.CreatedBy,
			Attendee:    params.Attendee,
			CreatedAt:   time.Now(),
			Group:       params.Group,
			GroupSize:   params.GroupSize,
			Time:        params.Time,
			Transaction: params.Transaction,
			Blackout:    params.Blackout,
		}

		result, err := database.InsertDocument[model.Table](mqp, table)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to insert document"))
			panic("failed to insert document:\n" + err.Error())
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{"message": result})
	}
}

// RescheduleTable will attempt to update the table reservation date
func (controller *DataController) RescheduleTable() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// CancelTable will attempt to cancel a reservation without a charge
// being applied to the card on file for the provided table
func (controller *DataController) CancelTable() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// CancelTableWithCharge will attempt to cancel a reservation and charge
// the card on file for the provided table
func (controller *DataController) CancelTableWithCharge() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}
