package database

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"time"
)

type RedisQueryParams struct {
	RedisClient *redis.Client
}

// CreateRedisClient establishes a connection to the provided redis client
// credentials and attempts to ping the server.
//
// If successful a redis client pointer will be returned
func CreateRedisClient(
	addr string,
	pwd string,
	db int,
) (*redis.Client, error) {
	rdb := redis.NewClient(&redis.Options{Addr: addr, Password: pwd, DB: db})
	pong := rdb.Ping(context.Background())

	if pong.Err() != nil {
		return nil, pong.Err()
	}

	return rdb, nil
}

// GetRedisContext generates new context used for Redis queries
func GetRedisContext() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 3*time.Second)
}

// SetCacheValue sets a key/value within the provided Redis Query Params
// with the provided TTL in seconds
func SetCacheValue[K any](
	params RedisQueryParams,
	key string,
	value K,
	ttl int,
) (string, error) {
	if params.RedisClient == nil {
		return "", fmt.Errorf("redis client is nil")
	}

	ctx, cancel := GetRedisContext()
	defer cancel()

	result := params.RedisClient.Set(ctx, key, value, time.Duration(ttl)*time.Second)
	if result.Err() != nil {
		return "", result.Err()
	}

	return result.Result()
}

// GetCacheValue returns a value at the provided key within the bounds
// of the provided Redis Query Params
func GetCacheValue(params RedisQueryParams, key string) (string, error) {
	if params.RedisClient == nil {
		return "", fmt.Errorf("redis client is nil")
	}

	ctx, cancel := GetRedisContext()
	defer cancel()

	result := params.RedisClient.Get(ctx, key)
	if result.Err() != nil {
		return "", result.Err()
	}

	return result.Result()
}

// DeleteCacheValue returns an int64 of the amount of deleted rows matching
// the provided key value within the bounds of the Redis Query Params
func DeleteCacheValue(params RedisQueryParams, key string) (int64, error) {
	if params.RedisClient == nil {
		return -1, fmt.Errorf("redis client is nil")
	}

	ctx, cancel := GetRedisContext()
	defer cancel()

	result := params.RedisClient.Del(ctx, key)
	if result.Err() != nil {
		return -1, result.Err()
	}

	return result.Result()
}
