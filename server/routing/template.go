package routing

import (
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/mongo"
)

type RouteController struct {
	Mongo        *mongo.Client
	Redis        *redis.Client
	DatabaseName string
}
