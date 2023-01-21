package controller

import "go.mongodb.org/mongo-driver/mongo"

type DataController struct {
	Mongo          *mongo.Client
	DatabaseName   string
	CollectionName string
}
