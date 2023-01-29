package validate

import (
	"fmt"
	"regexp"
)

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
		return fmt.Errorf("must be greater than 3 characters")
	}

	if len(email) > 64 {
		return fmt.Errorf("must be 64 characters or less")
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
		return fmt.Errorf("must be at least 1 character")
	}

	if len(name) > 32 {
		return fmt.Errorf("must be 32 characters or less")
	}

	return nil
}
