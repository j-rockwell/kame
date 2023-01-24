package routing

import "go.mongodb.org/mongo-driver/mongo"

type RouteController struct {
	Mongo        *mongo.Client
	DatabaseName string
}
