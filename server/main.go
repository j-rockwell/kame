package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"server/routing"
)

func main() {
	corsConf := cors.DefaultConfig()
	corsConf.AllowOrigins = []string{
		"http://sushikame.com",
		"https://sushikame.com",
		"https://booking.sushikame.com",
	}

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(gin.Logger())
	router.Use(cors.New(corsConf))

	// apply routes
	routing.ApplyHealthCheck(router)
}
