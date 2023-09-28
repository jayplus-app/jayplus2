package models

import "time"

type BusinessConfig struct {
	ID         int
	BusinessID int
	Key        string
	Value      string
	CreatedAt  time.Time
	UpdatedAt  time.Time
}
