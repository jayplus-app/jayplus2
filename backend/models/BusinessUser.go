package models

import "time"

type BusinessUser struct {
	BusinessID int64
	UserID     int64
	RoleID     int64
	FirstName  string
	LastName   string
	CreatedAt  time.Time
}
