package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"reflect"
	"server/database"
	"server/model"
	"strconv"
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
	mqp := database.MongoQueryParams{
		MongoClient:    controller.Mongo,
		DatabaseName:   controller.DatabaseName,
		CollectionName: controller.CollectionName,
	}

	return func(ctx *gin.Context) {
		dayStr, dayPresent := ctx.GetQuery("day")
		monthStr, monthPresent := ctx.GetQuery("month")
		yearStr, yearPresent := ctx.GetQuery("year")

		if !dayPresent || !monthPresent || !yearPresent {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("day, month and year must be present to perform query"))
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

		filter := bson.M{}
		filter["table_time.day"] = day
		filter["table_time.month"] = month
		filter["table_time.year"] = year

		result, err := database.FindManyDocumentsByFilter[model.Table](mqp, filter)
		if err != nil && err != mongo.ErrNoDocuments {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, GenerateErrorResponse("failed to perform query"))
			panic("failed to perform query on tables:\n" + err.Error())
			return
		}

		var available []model.TableGroup

		if err == mongo.ErrNoDocuments {
			available = append(available, model.A, model.B)
		} else {
			// flags for if table group a or b is found in the returned documents
			// we can have this be a little unoptimized since there should only ever be 2 docs max
			a := false
			b := false
			for _, doc := range result {
				if doc.Group == model.A {
					a = true
				}

				if doc.Group == model.B {
					b = true
				}
			}

			if !a {
				available = append(available, model.A)
			}

			if !b {
				available = append(available, model.B)
			}
		}

		res := model.GetTablesOnDateResponse{
			Available: available,
		}

		ctx.JSON(http.StatusOK, res)
	}
}

// GetMenusOnDate queries available menus on a specific date/time
func (controller *DataController) GetMenusOnDate() gin.HandlerFunc {
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

		var group model.TableGroup
		if groupStr == "A" {
			group = model.A
		} else if groupStr == "B" {
			group = model.B
		} else {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, GenerateErrorResponse("group value must be 'A' or 'B'"))
			return
		}

		// TODO:
		// 	- check for blackout days
		// 	- check for menu blackouts
		// 	- return available menus
		// 	- remove debug logging, only here to allow passing build
		fmt.Println("day: " + string(rune(day)) + ", month: " + string(rune(month)) + ", year: " + string(rune(year)) + ", group: " + string(group))
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
