package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"strconv"
)

// validate parses an encoded string and compares it against
// the provided public key then returns the computed result
func validate(encoded string, pubkey string) (*jwt.Token, error) {
	return jwt.Parse(encoded, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("invalid token %v", token.Header["alg"])
		}

		return []byte(pubkey), nil
	})
}

// Authorize will read the "Authorization" header from the request and
// attempt to authorize the token and attach an account ID to the request
// context.
func Authorize() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		const BearerSchema = "Bearer "

		authHeader := ctx.GetHeader("Authorization")
		if len(authHeader) < 7 {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "bad auth header length"})
			return
		}

		var tokenStr string
		var err error
		tokenStr = authHeader[len(BearerSchema):]

		// unquote tokens prefixed with a double-quote
		if string(tokenStr[0]) == `"` {
			tokenStr, err = strconv.Unquote(tokenStr)
		}

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid token (unquote)"})
			return
		}

		token, err := validate(tokenStr, "pubkey") // TODO: Add pubkey from config
		if err != nil || !token.Valid {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid token (validation)"})
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		id := claims["accountId"].(string)

		ctx.Set("accountId", id)
		ctx.Next()
	}
}