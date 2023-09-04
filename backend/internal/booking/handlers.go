package booking

import (
	"backend/contracts/booking"
	"backend/models"
	"backend/utils"
	"net/http"
	"time"
)

// VehicleTypes handler returns a list of vehicle types.
func VehicleTypes(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
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

// ServiceTypes handler returns a list of service types.
func ServiceTypes(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	serviceTypes := booking.ServiceTypes{
		Name: "Service Types",
		Types: []*models.ServiceType{
			{
				ID:          "1",
				Name:        "Show Room",
				Icon:        "show_room_icon",
				Description: "A premium service to make your vehicle look as good as new.",
			},
			{
				ID:          "2",
				Name:        "Basic",
				Icon:        "basic_icon",
				Description: "Basic cleaning and maintenance, ideal for quick touch-ups.",
			},
			{
				ID:          "3",
				Name:        "Interior",
				Icon:        "interior_icon",
				Description: "Focused on cleaning and sanitizing the vehicle's interior.",
			},
			{
				ID:          "4",
				Name:        "Exterior",
				Icon:        "exterior_icon",
				Description: "Focused on exterior wash and wax, to make your vehicle shine.",
			},
		},
	}

	utils.WriteJSON(w, http.StatusOK, serviceTypes)
}

// Timeslots handler returns a list of time slots.
func TimeSlots(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	// Sample data for a single date, replace this with database retrieval logic
	timeSlots := []*models.TimeSlot{
		{
			ID:          "1",
			StartTime:   time.Date(2023, 1, 20, 9, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 10, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   false,
			IsPast:      false,
		},
		{
			ID:          "2",
			StartTime:   time.Date(2023, 1, 20, 10, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 11, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "3",
			StartTime:   time.Date(2023, 1, 20, 11, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 12, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "4",
			StartTime:   time.Date(2023, 1, 20, 12, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 13, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "5",
			StartTime:   time.Date(2023, 1, 20, 13, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 14, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "6",
			StartTime:   time.Date(2023, 1, 20, 14, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 15, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "7",
			StartTime:   time.Date(2023, 1, 20, 15, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 16, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "8",
			StartTime:   time.Date(2023, 1, 20, 16, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 17, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   true,
			IsPast:      false,
		},
		{
			ID:          "9",
			StartTime:   time.Date(2023, 1, 20, 17, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 18, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   false,
			IsPast:      false,
		},
		{
			ID:          "10",
			StartTime:   time.Date(2023, 1, 20, 18, 0, 0, 0, time.UTC),
			EndTime:     time.Date(2023, 1, 20, 19, 0, 0, 0, time.UTC),
			FreeMinutes: 270,
			Available:   false,
			IsPast:      false,
		},
	}

	timeSlotsResponse := booking.TimeSlots{
		Date:  "2023-01-20",
		Slots: timeSlots,
	}

	utils.WriteJSON(w, http.StatusOK, timeSlotsResponse)
}

// ServiceCost handler returns the cost of a service.
func ServiceCost(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	serviceCost := map[string]int{
		"cost": 100,
	}

	utils.WriteJSON(w, http.StatusOK, serviceCost)
}

// CreateBookings handler creates bookings.
func CreateBooking(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	bookingNumber := map[string]string{
		"booking_number": "123456",
	}

	utils.WriteJSON(w, http.StatusOK, bookingNumber)
}

// Booking handler returns a booking.
func Booking(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	booking := map[string]string{
		"Transaction Number": "13",
		"Bill Number":        "37",
		"Type of Service":    "Show Room",
		"Vehicle Type":       "Sedan",
		"Date":               "14 Mar 2023",
		"Time":               "15:00",
		"Service Cost":       "169.00 $",
		"Discount":           "Not Specified",
		"Total":              "169.00 $",
		"Deposit":            "30.00 $",
		"Remaining":          "139.00 $",
	}

	utils.WriteJSON(w, http.StatusOK, booking)
}

// CancelBooking handler cancels a booking.
func CancelBooking(w http.ResponseWriter, r *http.Request, db booking.BookingDBInterface) {
	message := map[string]string{
		"message": "Booking cancelled successfully",
	}

	utils.WriteJSON(w, http.StatusOK, message)
}
