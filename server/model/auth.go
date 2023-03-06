package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type AuthWithStandardCredentialsRequest struct {
	Email    string `json:"email_address"`
	Password string `json:"password"`
}

type AuthWithTokenResponse struct {
	ID           primitive.ObjectID `json:"id"`
	EmailAddress string             `json:"email_address"`
	FirstName    string             `json:"first_name"`
	LastName     string             `json:"last_name"`
}

type AuthSuccessResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type RefreshTokenResponse struct {
	AccessToken string `json:"access_token"`
}
