package models

type Contact struct {
	ID              int
	ContactableType string
	ContactableID   int
	Address         string
	Phone           string
	Email           string
}
