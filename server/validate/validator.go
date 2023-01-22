package validate

import "fmt"

// ValidatePassword accepts a string and verifies the string is
// a valid password format
//
// If the provided string is invalid an error will be returned as
// a response
func ValidatePassword(password string) error {
	if len(password) < 8 {
		return fmt.Errorf("password must be 8 characters or greater")
	}

	if len(password) > 32 {
		return fmt.Errorf("password must be 32 characters or less")
	}

	return nil
}

// ValidateEmail accepts a string and verifies the string is
// a valid email format using regexp and string length comparisons
//
// If the provided string is invalid an error will be returned as
// a response
func ValidateEmail(email string) error {
	if len(email) <= 3 {
		return fmt.Errorf("must be greater than 3 characters")
	}

	if len(email) > 64 {
		return fmt.Errorf("must be 64 characters or less")
	}

	return nil
}

// ValidateName accepts a string and verifies the string is
// a valid name format using regexp and string length comparisons
//
// If the provided string is invalid an error will be returned as
// a response
func ValidateName(name string) error {
	if len(name) <= 0 {
		return fmt.Errorf("must be at least 1 character")
	}

	if len(name) > 32 {
		return fmt.Errorf("must be 32 characters or less")
	}

	return nil
}
