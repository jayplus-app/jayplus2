package booking

import (
	"backend/contracts/booking"
	"backend/utils"
	"fmt"
	"net/http"
)

func (b *Booking) VehicleTypes(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	fmt.Println("VehicleTypes")
	utils.WriteJSON(w, http.StatusOK, "VehicleTypes")
}