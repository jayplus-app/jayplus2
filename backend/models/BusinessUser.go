package models

import "time"

type BusinessUser struct {
	BusinessID int
	UserID     int
	RoleID     int
	FirstName  string
	LastName   string
	CreatedAt  time.Time
}
