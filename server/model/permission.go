package model

type Permission string

const (
	CreateTable      Permission = "create_table"      // Create
	ModifyTable      Permission = "modify_table"      // Modify or delete tables
	CreateBlackout   Permission = "create_blackout"   // Able to create new blackout dates
	ModifyBlackout   Permission = "modify_blackout"   // Able to modify existing blackout dates
	GrantRoles       Permission = "grant_roles"       // Able to grant entire roles to other accounts
	GrantPermissions Permission = "grant_permissions" // Able to grant specific permissions to other accounts
	ViewRoles        Permission = "view_roles"        // Able to see all permissions and users who have them assigned
	ViewTables       Permission = "view_tables"       // Able to see tables for other users
)

func GetAllPermissions() []Permission {
	return []Permission{
		CreateTable,
		ModifyTable,
		CreateBlackout,
		ModifyBlackout,
		GrantPermissions,
		GrantRoles,
		ViewRoles,
		ViewTables,
	}
}
