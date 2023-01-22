package model

type Permission string

const (
	CREATE_TABLE      Permission = "create_table"      // Create
	MODIFY_TABLE      Permission = "modify_table"      // Modify or delete tables
	CREATE_BLACKOUT   Permission = "create_blackout"   // Able to create new blackout dates
	MODIFY_BLACKOUT   Permission = "modify_blackout"   // Able to modify existing blackout dates
	GRANT_ROLES       Permission = "grant_roles"       // Able to grant entire roles to other accounts
	GRANT_PERMISSIONS Permission = "grant_permissions" // Able to grant specific permissions to other accounts
	VIEW_ROLES        Permission = "view_roles"        // Able to see all permissions and users who have them assigned
)

func GetAllPermissions() []Permission {
	return []Permission{
		CREATE_TABLE,
		MODIFY_TABLE,
		CREATE_BLACKOUT,
		MODIFY_BLACKOUT,
		GRANT_PERMISSIONS,
		GRANT_ROLES,
		VIEW_ROLES,
	}
}
