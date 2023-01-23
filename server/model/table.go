package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Table struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	CreatedBy   primitive.ObjectID `json:"created_by" bson:"created_by"`
	Attendee    primitive.ObjectID `json:"attendee" bson:"attendee"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	Group       TableGroup         `json:"group" bson:"group"`
	GroupSize   uint8              `json:"group_size" bson:"group_size"`
	Transaction Transaction        `json:"transaction" bson:"transaction"`
	Blackout    bool               `json:"blackout" bson:"blackout"`
}

type TableGroup string

const (
	A TableGroup = "A"
	B TableGroup = "B"
)
