package model

import "go.mongodb.org/mongo-driver/bson/primitive"

const ROLE_COLL_NAME string = "roles"

type Role struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	DisplayName string             `json:"display_name" bson:"display_name"`
	Permissions []Permission       `json:"permissions" bson:"permissions"`
}
