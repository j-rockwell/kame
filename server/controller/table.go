package controller

import "github.com/gin-gonic/gin"

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
	return func(ctx *gin.Context) {

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