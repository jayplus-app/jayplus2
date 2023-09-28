package models

import "time"

type VehicleType struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

type VehicleType1 struct {
	ID          int
	BusinessID  int
	Name        string
	Icon        string
	Description string
	CreatedAt   time.Time
}
