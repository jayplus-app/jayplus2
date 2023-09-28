package models

import "time"

type User struct {
	ID             int       `json:"id"`
	Email          string    `json:"email"`
	PhoneNumber    string    `json:"phone_number"`
	HashedPassword string    `json:"hashed_password"`
	FirstName      string    `json:"first_name"`
	LastName       string    `json:"last_name"`
	CreatedAt      time.Time `json:"-"`
	UpdatedAt      time.Time `json:"-"`
}
