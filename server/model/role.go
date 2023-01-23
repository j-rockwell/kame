package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Role struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	Name        string             `json:"name" bson:"name"`
	DisplayName string             `json:"display_name" bson:"display_name"`
	Permissions []Permission       `json:"permissions" bson:"permissions"`
}
