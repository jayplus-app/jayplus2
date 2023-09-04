package booking

import (
	"backend/contracts/booking"
	"backend/models"
	"backend/utils"
	"net/http"
)

func (b *Booking) VehicleTypes(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	vehicleTypes := booking.VehicleTypes{
		Name: "Vehicle Types",
		Types: []*models.VehicleType{
			{
				ID:          "1",
				Name:        "Sedan",
				Icon:        "sedan_icon",
				Description: "A small to medium-sized vehicle with comfortable seating for 4-5 passengers.",
			},
			{
				ID:          "2",
				Name:        "SUV",
				Icon:        "suv_icon",
				Description: "A medium to large-sized vehicle suitable for families, with optional all-wheel drive.",
			},
			{
				ID:          "3",
				Name:        "Large SUV / Truck",
				Icon:        "large_suv_truck_icon",
				Description: "A large vehicle with ample cargo space, often used for towing or off-road activities.",
			},
			{
				ID:          "4",
				Name:        "Motorcycle",
				Icon:        "motorcycle_icon",
				Description: "A two-wheeler suitable for individual riders or a couple, fuel-efficient and quick.",
			},
		},
	}

	utils.WriteJSON(w, http.StatusOK, vehicleTypes)
}
