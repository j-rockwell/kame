package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Account struct {
	ID             primitive.ObjectID `json:"id" bson:"_id"`
	FirstName      string             `json:"first_name" bson:"first_name"`
	LastName       string             `json:"last_name" bson:"last_name"`
	Phone          string             `json:"phone" bson:"phone"`
	Password       string             `json:"password" bson:"password"`
	EmailAddress   string             `json:"email_address" bson:"email_address"`
	EmailConfirmed time.Time          `json:"email_confirmed" bson:"email_confirmed"`
	Permissions    []Permission       `json:"permissions" bson:"permissions"`
	Preferences    AccountPreferences `json:"preferences" bson:"preferences"`
}

type AccountPreferences struct {
	EmailOptIn bool `json:"email_opt_in" bson:"email_opt_in"`
	TextOptIn  bool `json:"text_opt_in" bson:"text_opt_in"`
}

/// Request/Response types ///

type CreateAccountRequest struct {
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	EmailAddress string `json:"email_address"`
	Password     string `json:"password"`
}

type CreateAccountResponse struct {
	ID          primitive.ObjectID `json:"id"`
	AccessToken string             `json:"access_token"`
}
