package auth

import "golang.org/x/crypto/bcrypt"

// GetHash accepts a string and generates a new hashed value
// using the bcrypt algorithm
func GetHash(v string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(v), 8)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}

// IsMatchedHash accepts an unencrypted string and an encrypted string
// to see if the hashed values are a match
func IsMatchedHash(v string, compared string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(compared), []byte(v))
	return err != nil
}
