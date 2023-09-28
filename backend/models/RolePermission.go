package models

import "time"

type RolePermission struct {
	RoleID       int
	PermissionID int
	CreatedAt    time.Time
}
