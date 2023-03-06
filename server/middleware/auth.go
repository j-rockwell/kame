package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"server/config"
	"server/validate"
	"strconv"
)

// Authorize will read the "Authorization" header from the request and
// attempt to authorize the token and attach an account ID to the request
// context.
func Authorize() gin.HandlerFunc {
	conf := config.Prepare()

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

		token, err := validate.Token(tokenStr, conf.Auth.AccessTokenPubkey)
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
