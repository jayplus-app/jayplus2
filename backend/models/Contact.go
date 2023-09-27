package models

type Contact struct {
	ID              int64
	ContactableType string
	ContactableID   int64
	Address         string
	Phone           string
	Email           string
}
