package booking

import (
	"backend/contracts/auth"
	"backend/contracts/booking"
	"net/http"

	"github.com/gorilla/mux"
)

func BookingRoutes(r *mux.Router, auth auth.AuthInterface, db booking.BookingDBInterface) {
	bookingRouter := r.PathPrefix("/booking").Subrouter()

	bookingRouter.HandleFunc("/vehicle-types", func(w http.ResponseWriter, r *http.Request) {
		VehicleTypes(w, r, db)
	}).Methods("GET")
	bookingRouter.HandleFunc("/service-types", func(w http.ResponseWriter, r *http.Request) {
		ServiceTypes(w, r, db)
	}).Methods("GET")
	bookingRouter.HandleFunc("/timeslots", func(w http.ResponseWriter, r *http.Request) {
		TimeSlots(w, r, db)
	}).Methods("GET")
	bookingRouter.HandleFunc("/service-cost", func(w http.ResponseWriter, r *http.Request) {
		ServiceCost(w, r, db)
	}).Methods("GET")
	bookingRouter.HandleFunc("/create-booking", func(w http.ResponseWriter, r *http.Request) {
		CreateBooking(w, r, db)
	}).Methods("GET")

	adminOnlyRouter := bookingRouter.PathPrefix("/").Subrouter()
	adminOnlyRouter.Use(auth.AuthRequired)

	adminOnlyRouter.HandleFunc("/bookings", func(w http.ResponseWriter, r *http.Request) {
		Bookings(w, r, db)
	}).Methods("GET")
	adminOnlyRouter.HandleFunc("/booking/{id}", func(w http.ResponseWriter, r *http.Request) {
		Booking(w, r, db)
	}).Methods("GET")
	adminOnlyRouter.HandleFunc("/cancel-booking/{id}", func(w http.ResponseWriter, r *http.Request) {
		CancelBooking(w, r, db)
	}).Methods("GET")
}
