package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Role struct {
	ID          primitive.ObjectID
	Name        string
	DisplayName string
	Permissions []Permission
}
