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

	mongoClient, err := database.CreateMongoClient(conf.Mongo.URI, conf.Mongo.DatabaseName)
	if err != nil {
		panic("failed to connect to mongo instance: " + err.Error())
	}

	redisClient, err := database.CreateRedisClient(conf.Redis.Address, conf.Redis.Password, 1)
	if err != nil {
		panic("failed to connect to redis instance: " + err.Error())
	}

	corsConf := cors.DefaultConfig()
	corsConf.AllowCredentials = true
	corsConf.AddAllowHeaders("Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization")
	corsConf.AddAllowMethods("GET", "POST", "PUT", "DELETE")

	// simplify debugging localhost
	if conf.Gin.Mode == gin.DebugMode {
		corsConf.AllowAllOrigins = true
	} else {
		corsConf.AllowOrigins = conf.Gin.Origins
	}

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(gin.Logger())
	router.Use(cors.New(corsConf))

	// apply routes
	routeController := routing.RouteController{
		Mongo:        mongoClient,
		Redis:        redisClient,
		DatabaseName: conf.Mongo.DatabaseName,
	}

	routeController.ApplyAccounts(router)
	routeController.ApplyAuth(router)
	routeController.ApplyHealthCheck(router)
	routeController.ApplyRoles(router)
	routeController.ApplyTable(router)

	err = router.Run(":" + conf.Gin.Port)
	if err != nil {
		panic("failed to start gin: " + err.Error())
	}
}
