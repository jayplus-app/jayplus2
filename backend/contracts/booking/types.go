package booking

import "backend/models"

type Booking struct {
	Number string `json:"number"`
}

type VehicleTypes struct {
	Name  string                `json:"name"`
	Types []*models.VehicleType `json:"types"`
}

type ServiceTypes struct {
	Name  string                `json:"name"`
	Types []*models.ServiceType `json:"types"`
}
