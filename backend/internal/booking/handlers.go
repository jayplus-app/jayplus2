package booking

import (
	"backend/contracts/booking"
	"backend/contracts/db"
	"backend/models"
	"backend/utils"
	"errors"
	"net/http"
	"time"
)

// VehicleTypes handler returns a list of vehicle types.
func VehicleTypes(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	businessName := r.Header.Get("Business-Name")

	business, err := db.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, errors.New("invalid business"), http.StatusBadRequest)
		return
	}

	vehicleTypes, err := db.GetVehicleTypes(business.ID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	utils.WriteJSON(w, http.StatusOK, vehicleTypes)
}

// ServiceTypes handler returns a list of service types.
func ServiceTypes(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	businessName := r.Header.Get("Business-Name")

	business, err := db.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, errors.New("invalid business"), http.StatusBadRequest)
		return
	}

	serviceTypes, err := db.GetServiceTypes(business.ID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	utils.WriteJSON(w, http.StatusOK, serviceTypes)
}

// Timeslots handler returns a list of time slots.
func TimeSlots(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
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
func ServiceCost(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	serviceCost := map[string]int{
		"cost": 100,
	}

	utils.WriteJSON(w, http.StatusOK, serviceCost)
}

// CreateBookings handler creates bookings.
func CreateBooking(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	bookingNumber := map[string]string{
		"booking_number": "123456",
	}

	utils.WriteJSON(w, http.StatusOK, bookingNumber)
}

// Bookings handler returns a list of bookings.
func Bookings(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	bookings := []*models.Booking{
		{
			ID:                "1",
			TransactionNumber: "13",
			BillNumber:        "37",
			TypeOfService:     "Show Room",
			VehicleType:       "Sedan",
			Date:              "14 Mar 2023",
			Time:              "15:00",
			ServiceCost:       "169.00 $",
			Discount:          "Not Specified",
			Total:             "169.00 $",
			Deposit:           "30.00 $",
			Remaining:         "139.00 $",
		},
		{
			ID:                "2",
			TransactionNumber: "14",
			BillNumber:        "38",
			TypeOfService:     "Show Room",
			VehicleType:       "Sedan",
			Date:              "14 Mar 2023",
			Time:              "15:00",
			ServiceCost:       "169.00 $",
			Discount:          "Not Specified",
			Total:             "169.00 $",
			Deposit:           "30.00 $",
			Remaining:         "139.00 $",
		},
		{
			ID:                "3",
			TransactionNumber: "15",
			BillNumber:        "39",
			TypeOfService:     "Show Room",
			VehicleType:       "Sedan",
			Date:              "14 Mar 2023",
			Time:              "15:00",
			ServiceCost:       "169.00 $",
			Discount:          "Not Specified",
			Total:             "169.00 $",
			Deposit:           "30.00 $",
			Remaining:         "139.00 $",
		},
	}

	bookingsResponse := booking.Bookings{
		Date:     "2023-01-20",
		Bookings: bookings,
	}

	utils.WriteJSON(w, http.StatusOK, bookingsResponse)
}

// Booking handler returns a booking.
func Booking(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	booking := models.Booking{
		ID:                "1",
		TransactionNumber: "13",
		BillNumber:        "37",
		TypeOfService:     "Show Room",
		VehicleType:       "Sedan",
		Date:              "14 Mar 2023",
		Time:              "15:00",
		ServiceCost:       "169.00 $",
		Discount:          "Not Specified",
		Total:             "169.00 $",
		Deposit:           "30.00 $",
		Remaining:         "139.00 $",
	}

	utils.WriteJSON(w, http.StatusOK, booking)
}

// CancelBooking handler cancels a booking.
func CancelBooking(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	message := map[string]string{
		"message": "Booking cancelled successfully",
	}

	utils.WriteJSON(w, http.StatusOK, message)
}
