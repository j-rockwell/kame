package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"server/database"
	"server/routing"
)

func main() {
	mongoClient, err := database.CreateMongoClient("mongodb://mongodb:27017/?authSource=admin")
	if err != nil {
		panic("failed to connect to mongo instance: " + err.Error())
	}

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
	routeController := routing.RouteController{
		Mongo: mongoClient,
	}

	routeController.ApplyAccounts(router)
	routeController.ApplyAuth(router)
	routeController.ApplyHealthCheck(router)
	routeController.ApplyRoles(router)

	err = router.Run(":8080")
	if err != nil {
		panic("failed to start gin: " + err.Error())
	}
}
