package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

const ACCOUNT_COLL_NAME string = "account"

type Account struct {
	ID             primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	FirstName      string               `json:"first_name" bson:"first_name"`
	LastName       string               `json:"last_name" bson:"last_name"`
	Phone          string               `json:"phone" bson:"phone"`
	Password       string               `json:"password" bson:"password"`
	EmailAddress   string               `json:"email_address" bson:"email_address"`
	EmailConfirmed time.Time            `json:"email_confirmed" bson:"email_confirmed"`
	CreatedAt      time.Time            `json:"created_at" bson:"created_at"`
	Permissions    []Permission         `json:"permissions,omitempty" bson:"permissions,omitempty"`
	Roles          []primitive.ObjectID `json:"roles,omitempty" bson:"roles,omitempty"`
	Preferences    AccountPreferences   `json:"preferences,omitempty" bson:"preferences,omitempty"`
}

type AccountPreferences struct {
	EmailOptIn bool `json:"email_opt_in" bson:"email_opt_in"`
	TextOptIn  bool `json:"text_opt_in" bson:"text_opt_in"`
}

/// Request/Response types ///

type CreateAccountRequest struct {
	FirstName    string             `json:"first_name"`
	LastName     string             `json:"last_name"`
	EmailAddress string             `json:"email_address"`
	Phone        string             `json:"phone"`
	Password     string             `json:"password"`
	Preferences  AccountPreferences `json:"preferences,omitempty"`
}

type UpdateAccountRequest struct {
	FirstName      string               `json:"first_name"`
	LastName       string               `json:"last_name"`
	EmailAddress   string               `json:"email_address"`
	EmailConfirmed bool                 `json:"email_confirmed"`
	Phone          string               `json:"phone"`
	Password       string               `json:"password"`
	Preferences    AccountPreferences   `json:"preferences"`
	Permissions    []Permission         `json:"permissions"`
	Roles          []primitive.ObjectID `json:"roles"`
}

type CreateAccountResponse struct {
	ID           primitive.ObjectID `json:"id"`
	AccessToken  string             `json:"access_token"`
	RefreshToken string             `json:"refresh_token"`
}
