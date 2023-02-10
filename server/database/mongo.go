package database

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type MongoQueryParams struct {
	MongoClient    *mongo.Client
	DatabaseName   string
	CollectionName string
}

// CreateMongoClient takes a mongo connection uri as the only param
// and attempts to establish a connection to the mongo database.
func CreateMongoClient(uri string, db string) (*mongo.Client, error) {
	return mongo.Connect(context.Background(), options.Client().ApplyURI(uri+db+"?authSource=admin"))
}

// GetMongoContext gets boilerplate context/cancel impl
func GetMongoContext() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 5*time.Second)
}

// FindDocumentById queries a single document matching the provided ID
// within the bounds of the Mongo Query Params
func FindDocumentById[K any](
	params MongoQueryParams,
	id string,
) (K, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	var document K
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return document, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": objectId}).Decode(&document)
	return document, err
}

// FindDocumentByKeyValue queries a single document matching the provided
// key/value pair within the bounds of the Mongo Query Params
func FindDocumentByKeyValue[K any, V any](
	params MongoQueryParams,
	k string,
	v K,
) (V, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	var document V
	err := collection.FindOne(ctx, bson.M{k: v}).Decode(&document)
	return document, err
}

// FindDocumentByFilter queries a single document matching the provided
// BSON filter within the bounds of the Mongo Query Params
func FindDocumentByFilter[K any](
	params MongoQueryParams,
	filter bson.M,
) (K, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	var document K
	err := collection.FindOne(ctx, filter).Decode(&document)
	return document, err
}

// FindManyDocumentsByKeyValue queries multiple documents matching the provided
// key/value pair within the bounds of the Mongo Query Params
func FindManyDocumentsByKeyValue[K any, V any](
	params MongoQueryParams,
	k string,
	v K,
) ([]V, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	var documents []V
	cursor, err := collection.Find(ctx, bson.M{k: v})
	err = cursor.All(ctx, &documents)
	return documents, err
}

// FindManyDocumentsByFilter queries multiple documents matching the provided
// filter with additional Mongo find options within the bounds of the Mongo Query Params
func FindManyDocumentsByFilter[K any](
	params MongoQueryParams,
	filter interface{},
) ([]K, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	var documents []K
	cursor, err := collection.Find(ctx, filter)
	err = cursor.All(ctx, &documents)
	return documents, err
}

// FindManyDocumentsByFilterWithOpts queries multiple documents matching the provided
// filter with additional Mongo find options within the bounds of the Mongo Query Params
func FindManyDocumentsByFilterWithOpts[K any](
	params MongoQueryParams,
	filter interface{},
	opts *options.FindOptions,
) ([]K, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	var documents []K
	cursor, err := collection.Find(ctx, filter, opts)
	err = cursor.All(ctx, &documents)
	return documents, err
}

// InsertDocument inserts a single document in to the Mongo Database within the
// Mongo Query Params
func InsertDocument[K any](
	params MongoQueryParams,
	document K,
) (string, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	result, err := collection.InsertOne(ctx, document)
	id := result.InsertedID.(primitive.ObjectID).Hex()
	return id, err
}

// UpdateDocument updates a single document in the Mongo Database within the
// Mongo Query Params
func UpdateDocument[K any](
	params MongoQueryParams,
	documentId string,
	document K,
) (*mongo.UpdateResult, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	result, err := collection.UpdateOne(ctx, bson.M{"_id": documentId}, bson.M{"$set": document})
	return result, err
}

// DeleteDocument deletes a single document in the Mongo Database within the
// Mongo Query Params
func DeleteDocument[K any](
	params MongoQueryParams,
	document K,
) (*mongo.DeleteResult, error) {
	ctx, cancel := GetMongoContext()
	collection := params.MongoClient.Database(params.DatabaseName).Collection(params.CollectionName)
	defer cancel()

	result, err := collection.DeleteOne(ctx, document)
	return result, err
}
