package booking

import (
	"backend/models"
	"net/http"
)

type BookingInterface interface {
	// Handlers
	VehicleTypes(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
}

type BookingDBInterface interface {
	GetVehicleTypes() ([]*models.VehicleType, error)
}
