package booking

import (
	"backend/contracts/booking"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func BookingRoutes(r *mux.Router, booking booking.BookingInterface, db booking.BookingDBInterface) {
	if booking == nil || db == nil {
		if booking == nil {
			log.Fatal("booking.BookingInterface is nil")
		}
		if db == nil {
			log.Fatal("booking.BookingDBInterface is nil")
		}
		return
	}

	bookingRouter := r.PathPrefix("/booking").Subrouter()

	bookingRouter.HandleFunc("/vehicle-types", func(w http.ResponseWriter, r *http.Request) {
		booking.VehicleTypes(w, r, db)
	}).Methods("GET")
}
