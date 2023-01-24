package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"server/config"
	"server/database"
	"server/routing"
	"server/util"
)

func main() {
	util.PrintTerminalLogo()

	conf := config.Prepare()
	gin.SetMode(conf.Gin.Mode)

	mongoClient, err := database.CreateMongoClient(conf.Mongo.URI)
	if err != nil {
		panic("failed to connect to mongo instance: " + err.Error())
	}

	corsConf := cors.DefaultConfig()
	corsConf.AllowOrigins = conf.Gin.Origins

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(gin.Logger())
	router.Use(cors.New(corsConf))

	// apply routes
	routeController := routing.RouteController{
		Mongo:        mongoClient,
		DatabaseName: conf.Mongo.DatabaseName,
	}

	routeController.ApplyAccounts(router)
	routeController.ApplyAuth(router)
	routeController.ApplyHealthCheck(router)
	routeController.ApplyRoles(router)

	err = router.Run(":" + conf.Gin.Port)
	if err != nil {
		panic("failed to start gin: " + err.Error())
	}
}
