package util

import "server/model"

// ContainsPermission iterates over a slice of permissions and returns true
// if the slice contains the provided permission
func ContainsPermission(slice []model.Permission, perm model.Permission) bool {
	for _, p := range slice {
		if p == perm {
			return true
		}
	}

	return false
}
