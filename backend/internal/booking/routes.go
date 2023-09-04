package booking

import (
	"backend/contracts/booking"
	"net/http"

	"github.com/gorilla/mux"
)

func BookingRoutes(r *mux.Router, booking booking.BookingInterface, db booking.BookingDBInterface) {
	bookingRouter := r.PathPrefix("/booking").Subrouter()

	bookingRouter.HandleFunc("/vehicle-types", func(w http.ResponseWriter, r *http.Request) {
		booking.VehicleTypes(w, r, db)
	}).Methods("GET")
}
