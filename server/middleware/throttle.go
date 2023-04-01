package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"net/http"
	"server/controller"
	"server/database"
	"strconv"
	"strings"
	"time"
)

type ThrottleHandler struct {
	RedisClient *redis.Client
	Key         string
	LimitCount  int64
	TTL         int64
	Debug       bool
}

// getKey generates a unique key using (k)
// as the database key and (v) as the unique
// value. This value is then stored as a key
// in the Redis store
func getKey(k string, v string) string {
	repl := strings.NewReplacer(
		".", "",
		":", "-",
	)

	sanitize := repl.Replace(v)
	return "/" + k + "/" + sanitize + "/"
}

// incrCacheValue increments the cached value
// for the provided key. This function will then
// set the expiry time for the key to match the
// provided TTL
func incrCacheValue(client *redis.Client, k string, ttl int64) (int64, error) {
	pipe := client.Pipeline()
	ctx, cancel := database.GetRedisContext()
	defer cancel()

	hits := client.Get(ctx, k)
	if hits.Err() != nil {
		if hits.Err() != redis.Nil {
			return -1, hits.Err()
		}

		pipe.Set(ctx, k, 0, time.Duration(0))
	}

	pipe.Incr(ctx, k)
	pipe.Expire(ctx, k, time.Duration(int64(time.Second)*ttl))

	_, err := pipe.Exec(ctx)
	if err != nil {
		return -1, err
	}

	count := client.Get(ctx, k)
	if count.Err() != nil {
		return -1, count.Err()
	}

	return count.Int64()
}

// Limit performs rate-limit functions before
// a handler is called.
func (handler *ThrottleHandler) Limit() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ip := ctx.ClientIP()
		key := getKey(handler.Key, ip)
		count, err := incrCacheValue(handler.RedisClient, key, handler.TTL)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, controller.GenerateErrorResponse("failed to apply rate-limit: "+err.Error()))
			return
		}

		if count > handler.LimitCount {
			ctx.AbortWithStatus(http.StatusTooManyRequests)
			return
		}

		if handler.Debug {
			fmt.Println(key + ": " + strconv.FormatInt(count, 10))
		}

		ctx.Next()
	}
}
