package models

import "time"

type BusinessConfig struct {
	ID         int64
	BusinessID int64
	Key        string
	Value      string
	CreatedAt  time.Time
	UpdatedAt  time.Time
}
