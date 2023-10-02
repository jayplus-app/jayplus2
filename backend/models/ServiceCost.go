package models

import "time"

type ServiceCost struct {
	BusinessID      int       `json:"businessID"`
	VehicleTypeID   int       `json:"vehicleTypeID"`
	ServiceTypeID   int       `json:"serviceTypeID"`
	Price           int       `json:"price"` // Price in cents
	DurationMinutes int       `json:"durationMinutes"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}
