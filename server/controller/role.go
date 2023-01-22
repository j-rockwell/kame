package controller

import "github.com/gin-gonic/gin"

// GetRoles queries all roles in the Mongo Database
func (controller *DataController) GetRoles() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// GetRolesByAccount queries all roles assigned to the provided Account ID
func (controller *DataController) GetRolesByAccount() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// CreateRole creates a new role in the database and returns the
// role ID
func (controller *DataController) CreateRole() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// UpdateRole updates an existing role in the database
func (controller *DataController) UpdateRole() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// DeleteRole deletes an existing role from the database
func (controller *DataController) DeleteRole() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// GrantRole grants an account a new role
func (controller *DataController) GrantRole() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// RevokeRole revokes an existing role from an account
func (controller *DataController) RevokeRole() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// GrantRolePermission grants a permission for a provided role
func (controller *DataController) GrantRolePermission() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}

// RevokeRolePermission revokes a permission from a provided role
func (controller *DataController) RevokeRolePermission() gin.HandlerFunc {
	return func(ctx *gin.Context) {

	}
}
