package controller

import (
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/mongo"
)

type DataController struct {
	Mongo          *mongo.Client
	Redis          *redis.Client
	DatabaseName   string
	CollectionName string
}

// ErrorWrapper is a simple map decorator
// for Gin error responses (see: GenerateErrorResponse)
type ErrorWrapper map[string]any

// GenerateErrorResponse will create a map with a string
// as the key for easy error handling with responses
func GenerateErrorResponse(reason string) ErrorWrapper {
	return ErrorWrapper{
		"message": reason,
	}
}
