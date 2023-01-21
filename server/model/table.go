package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Table struct {
	ID          primitive.ObjectID
	CreatedBy   primitive.ObjectID
	Attendee    primitive.ObjectID
	CreatedAt   time.Time
	Group       TableGroup
	GroupSize   uint8
	Transaction Transaction
	Blackout    bool
}

type TableGroup string

const (
	A TableGroup = "A"
	B TableGroup = "B"
)
