package auth

import (
	"github.com/golang-jwt/jwt/v4"
	"time"
)

type Claims struct {
	AccountID string `json:"accountId"`
	jwt.RegisteredClaims
}

// GenerateToken generates a new json-webtoken using the provided account ID
// and signs it using the provided public key/ttl.
func GenerateToken(id string, pubkey string, ttl int) (string, error) {
	secret := []byte(pubkey)
	claims := Claims{
		id,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(ttl) * time.Minute)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	asStr, err := token.SignedString(secret)
	return asStr, err
}
