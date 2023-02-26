package model

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"strings"
	"time"
)

const TABLE_COLL_NAME string = "tables"

type Table struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	CreatedBy   primitive.ObjectID `json:"created_by" bson:"created_by"`
	Attendee    primitive.ObjectID `json:"attendee" bson:"attendee"`
	Menu        primitive.ObjectID `json:"menu" bson:"menu"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	Group       TableGroup         `json:"group" bson:"group"`
	GroupSize   uint8              `json:"group_size" bson:"group_size"`
	Time        TableTime          `json:"table_time" bson:"table_time"`
	Transaction Transaction        `json:"transaction" bson:"transaction"`
	Blackout    bool               `json:"blackout" bson:"blackout"`
}

type TableGroup string

const (
	A TableGroup = "A"
	B TableGroup = "B"
)

type GetTablesOnDateResponse struct {
	Available []TableGroup `json:"available,omitempty"`
}

type CreateTableRequest struct {
	CreatedBy   primitive.ObjectID `json:"created_by" bson:"created_by"`
	Attendee    primitive.ObjectID `json:"attendee" bson:"attendee"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	Menu        primitive.ObjectID `json:"menu" bson:"menu"`
	Group       TableGroup         `json:"group" bson:"group"`
	GroupSize   uint8              `json:"group_size" bson:"group_size"`
	Time        TableTime          `json:"table_time" bson:"table_time"`
	Transaction Transaction        `json:"transaction" bson:"transaction"`
	Blackout    bool               `json:"blackout,omitempty" bson:"blackout,omitempty"`
}

type RescheduleTableRequest struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Menu      primitive.ObjectID `json:"menu" bson:"menu"`
	Group     TableGroup         `json:"group" bson:"group"`
	GroupSize uint8              `json:"group_size" bson:"group_size"`
	Time      TableTime          `json:"table_time" bson:"table_time"`
}

type CreateTableResponse struct {
	ID primitive.ObjectID `json:"table_id"`
}

type RescheduleTableResponse struct {
	ID primitive.ObjectID `json:"table_id"`
}

// GetTableGroupFromString is a helper func to easily convert
// strings to table groups
func GetTableGroupFromString(s string) (TableGroup, error) {
	if strings.ToLower(s) == "a" {
		return A, nil
	}

	if strings.ToLower(s) == "b" {
		return B, nil
	}

	return "", fmt.Errorf("invalid table group value")
}
