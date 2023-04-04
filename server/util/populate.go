package util

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"server/auth"
	"server/database"
	"server/model"
	"time"
)

// PopulateData accepts a mongo client and populates a dev database with test data
func PopulateData(client *mongo.Client, db string) {
	accmqp := database.MongoQueryParams{
		MongoClient:    client,
		DatabaseName:   db,
		CollectionName: model.ACCOUNT_COLL_NAME,
	}

	menumqp := database.MongoQueryParams{
		MongoClient:    client,
		DatabaseName:   db,
		CollectionName: model.MENU_COLL_NAME,
	}

	if db == "prod" || db == "production" {
		panic("failsafe to prevent prod database wipe triggered when attempting to populate data")
	}

	// populate account data
	_, err := database.FindDocumentByKeyValue[string, model.Account](accmqp, "email_address", "admin@sushikame.com")
	if err == nil {
		fmt.Println("test account entry already exists. skipping.")
	}

	if err != nil {
		if err != mongo.ErrNoDocuments {
			panic("failed to populate test data: " + err.Error())
		}

		fmt.Println("generating test data for accounts")
		hash, err := auth.GetHash("admin4000")
		if err != nil {
			panic("failed to insert test data: " + err.Error())
		}

		_, insertErr := database.InsertDocument[model.Account](accmqp, model.Account{
			FirstName:      "John",
			LastName:       "Smith",
			Phone:          "7021234567",
			Password:       hash,
			EmailAddress:   "admin@sushikame.com",
			EmailConfirmed: time.Now(),
			CreatedAt:      time.Now(),
			Permissions:    model.GetAllPermissions(),
			Preferences:    model.AccountPreferences{EmailOptIn: true, TextOptIn: true},
		})

		if insertErr != nil {
			panic("failed to insert test data: " + insertErr.Error())
		}
	}

	fmt.Println("Account: [OK]")

	// populate test menu entries
	_, err = database.FindDocumentByKeyValue[string, model.Menu](menumqp, "name", "Signature")
	if err == nil {
		fmt.Println("test menu entries already exists. skipping.")
	}

	if err != nil {
		if err != mongo.ErrNoDocuments {
			panic("failed to populate test data: " + err.Error())
		}

		fmt.Println("generating test data for menus")
		_, insertErr := database.InsertDocument[model.Menu](menumqp, model.Menu{
			Name:        "Signature",
			Price:       350.0,
			Active:      true,
			CreatedBy:   primitive.NewObjectID(),
			CreatedAt:   time.Now(),
			LastUpdated: time.Now(),
		})

		_, insertErr = database.InsertDocument[model.Menu](menumqp, model.Menu{
			Name:        "Premium",
			Price:       500.0,
			Active:      true,
			CreatedBy:   primitive.NewObjectID(),
			CreatedAt:   time.Now(),
			LastUpdated: time.Now(),
		})

		if insertErr != nil {
			panic("failed to insert test data: " + insertErr.Error())
		}
	}

	fmt.Println("Menu: [OK]")
}
