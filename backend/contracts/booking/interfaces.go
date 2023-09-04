package booking

import (
	"backend/models"
	"net/http"
)

type BookingInterface interface {
	// Handlers
	VehicleTypes(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	ServiceTypes(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	TimeSlots(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	ServiceCost(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	CreateBooking(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	Bookings(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	Booking(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
	CancelBooking(w http.ResponseWriter, r *http.Request, db BookingDBInterface)
}

type BookingDBInterface interface {
	GetVehicleTypes() ([]*models.VehicleType, error)
}
