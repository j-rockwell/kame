package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Account struct {
	ID             primitive.ObjectID
	FirstName      string
	LastName       string
	EmailAddress   string
	EmailConfirmed time.Time
	Phone          string
	Password       string
	Permissions    []Permission
	Preferences    AccountPreferences
}

type AccountPreferences struct {
	EmailOptIn bool
	TextOptIn  bool
}

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
