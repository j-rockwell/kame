package validate

import (
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"regexp"
)

// Token parses an encoded string and compares it against
// the provided public key then returns the computed result
func Token(encoded string, pubkey string) (*jwt.Token, error) {
	return jwt.Parse(encoded, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("invalid token %v", token.Header["alg"])
		}
		return []byte(pubkey), nil
	})
}

// Password accepts a string and verifies the string is
// a valid password format
//
// If the provided string is invalid an error will be returned as
// a response
func Password(password string) error {
	if len(password) < 8 {
		return fmt.Errorf("password must be 8 characters or greater")
	}

	if len(password) > 32 {
		return fmt.Errorf("password must be 32 characters or less")
	}

	return nil
}

// Email accepts a string and verifies the string is
// a valid email format using regexp and string length comparisons
//
// If the provided string is invalid an error will be returned as
// a response
func Email(email string) error {
	re := regexp.MustCompile(`!/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))/`)

	if len(email) <= 3 {
		return fmt.Errorf("email must be greater than 3 characters")
	}

	if len(email) > 64 {
		return fmt.Errorf("email must be 64 characters or less")
	}

	if re.MatchString(email) {
		return fmt.Errorf("invalid email format")
	}

	return nil
}

// Name accepts a string and verifies the string is
// a valid name format using regexp and string length comparisons
//
// If the provided string is invalid an error will be returned as
// a response
func Name(name string) error {
	if len(name) <= 0 {
		return fmt.Errorf("name must be at least 1 character")
	}

	if len(name) > 32 {
		return fmt.Errorf("name must be 32 characters or less")
	}

	return nil
}
