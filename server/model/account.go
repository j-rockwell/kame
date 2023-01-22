package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Account struct {
	ID             primitive.ObjectID
	FirstName      string
	LastName       string
	Phone          string
	Password       string
	EmailAddress   string
	EmailConfirmed time.Time
	Permissions    []Permission
	Preferences    AccountPreferences
}

type AccountPreferences struct {
	EmailOptIn bool
	TextOptIn  bool
}

/// Request/Response types ///

type CreateAccountRequest struct {
	FirstName    string
	LastName     string
	EmailAddress string
	Password     string
}

type CreateAccountResponse struct {
	ID          primitive.ObjectID
	AccessToken string
}
