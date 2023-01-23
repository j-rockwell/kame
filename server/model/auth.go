package model

type AuthWithStandardCredentialsRequest struct {
	Email    string `json:"email_address"`
	Password string `json:"password"`
}

type AuthSuccessResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type RefreshTokenResponse struct {
	AccessToken string `json:"access_token"`
}
