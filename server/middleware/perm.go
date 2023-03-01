package middleware

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/controller"
	"server/database"
	"server/model"
	"server/util"
)

type PermissionHandler struct {
	MongoClient  *mongo.Client
	DatabaseName string
}

// HasPermission returns true if the provided gin context
// has permission to perform the provided permission
func HasPermission(ctx *gin.Context, perm model.Permission) bool {
	attached := ctx.Keys["permissions"].([]model.Permission)

	for _, p := range attached {
		if p == perm {
			return true
		}
	}

	return false
}

// AttachPermissions intercepts a request, grabs the account id
// attached the authorized request and queries the permissions
// database.
//
// Once the permissions have been received they are attached to
// the request context and passed on to the next handler function
func (handler *PermissionHandler) AttachPermissions() gin.HandlerFunc {
	accmqp := database.MongoQueryParams{
		MongoClient:    handler.MongoClient,
		DatabaseName:   handler.DatabaseName,
		CollectionName: model.ACCOUNT_COLL_NAME,
	}

	rolemqp := database.MongoQueryParams{
		MongoClient:    handler.MongoClient,
		DatabaseName:   handler.DatabaseName,
		CollectionName: model.ROLE_COLL_NAME,
	}

	return func(ctx *gin.Context) {
		accountId := ctx.GetString("accountId")
		_, err := primitive.ObjectIDFromHex(accountId)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, controller.GenerateErrorResponse("bad auth header"))
			return
		}

		account, err := database.FindDocumentById[model.Account](accmqp, accountId)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, controller.GenerateErrorResponse("bad auth header"))
				return
			}

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, controller.GenerateErrorResponse("encountered an error while trying to attach perms"))
			return
		}

		var perms []model.Permission
		for _, perm := range account.Permissions {
			perms = append(perms, perm)
		}

		if len(account.Roles) > 0 {
			for _, id := range account.Roles {
				role, err := database.FindDocumentById[model.Role](rolemqp, id.Hex())
				if err != nil {
					continue
				}

				if len(role.Permissions) <= 0 {
					continue
				}

				for _, perm := range role.Permissions {
					if !util.ContainsPermission(perms, perm) {
						perms = append(perms, perm)
					}
				}
			}
		}

		ctx.Set("permissions", perms)
	}
}
