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
	Password       string
}

type CreateAccount struct {
	FirstName    string
	LastName     string
	EmailAddress string
	Password     string
}
