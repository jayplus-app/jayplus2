package booking

import (
	"backend/contracts/auth"
	"backend/contracts/booking"
	"backend/contracts/db"
	"backend/models"
	"backend/utils"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
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
	// post request body
	type RequestBody struct {
		ServiceTypeID string `json:"serviceTypeID"`
		VehicleTypeID string `json:"vehicleTypeID"`
	}

	var requestBody RequestBody
	err := utils.ReadJSON(w, r, &requestBody)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	businessName := r.Header.Get("Business-Name")
	business, err := db.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	vehicleTypeID, err := strconv.Atoi(requestBody.VehicleTypeID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	serviceTypeID, err := strconv.Atoi(requestBody.ServiceTypeID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	serviceCost, err := db.GetServiceCost(business.ID, vehicleTypeID, serviceTypeID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
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

type BookingsResponse struct {
	ID          int       `json:"id"`
	VehicleType string    `json:"vehicleType"`
	ServiceType string    `json:"serviceType"`
	Datetime    time.Time `json:"datetime"`
	Status      string    `json:"status"`
}

// Bookings handler returns a list of bookings.
func Bookings(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	dateInput := r.URL.Query().Get("date")
	if dateInput == "" {
		utils.ErrorJSON(w, errors.New("invalid date"), http.StatusBadRequest)
		return
	}

	businessName := r.Header.Get("Business-Name")
	business, err := db.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	date, err := time.Parse("2006-01-02", dateInput)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	var bookingsResponse []BookingsResponse

	bookings, err := db.GetBookingsByDate(business.ID, date)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	for _, booking := range bookings {
		vehicleType, err := db.GetVehicleTypeByID(booking.VehicleTypeID)
		if err != nil {
			utils.ErrorJSON(w, err, http.StatusBadRequest)
			return
		}

		serviceType, err := db.GetServiceTypeByID(booking.ServiceTypeID)
		if err != nil {
			utils.ErrorJSON(w, err, http.StatusBadRequest)
			return
		}

		bookingResponse := BookingsResponse{
			ID:          booking.ID,
			VehicleType: vehicleType.Name,
			ServiceType: serviceType.Name,
			Datetime:    booking.Datetime,
			Status:      booking.Status,
		}

		bookingsResponse = append(bookingsResponse, bookingResponse)
	}

	utils.WriteJSON(w, http.StatusOK, bookingsResponse)
}

type BookingResponse struct {
	ID          int       `json:"id"`
	UserID      int       `json:"userID"`
	VehicleType string    `json:"vehicleType"`
	ServiceType string    `json:"serviceType"`
	Datetime    time.Time `json:"datetime"`
	Cost        int       `json:"cost"`
	Discount    int       `json:"discount"`
	Deposit     int       `json:"deposit"`
	BillNumber  int       `json:"billNumber"`
	Status      string    `json:"status"`
}

// Booking handler returns a booking.
func Booking(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	vars := mux.Vars(r)

	bookingID, err := strconv.Atoi(vars["id"])
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	booking, err := db.GetBookingByID(bookingID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	vehicleType, err := db.GetVehicleTypeByID(booking.VehicleTypeID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	serviceType, err := db.GetServiceTypeByID(booking.ServiceTypeID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	bookingResponse := BookingResponse{
		ID:          booking.ID,
		UserID:      booking.UserID,
		VehicleType: vehicleType.Name,
		ServiceType: serviceType.Name,
		Datetime:    booking.Datetime,
		Cost:        booking.Cost,
		Discount:    booking.Discount,
		Deposit:     booking.Deposit,
		BillNumber:  booking.BillNumber,
		Status:      booking.Status,
	}

	utils.WriteJSON(w, http.StatusOK, bookingResponse)
}

type CancelBookingResponse struct {
	Message string `json:"message"`
}

// CancelBooking handler cancels a booking.
func CancelBooking(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	bookingID, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	booking, err := db.GetBookingByID(bookingID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	if booking.Status == "cancelled" {
		utils.ErrorJSON(w, errors.New("booking already cancelled"), http.StatusBadRequest)
		return
	}

	claims, ok := r.Context().Value("claims").((*auth.JWTClaims))
	if !ok {
		utils.ErrorJSON(w, errors.New("failed to retrieve claims"), http.StatusBadRequest)
		return
	}

	userID, err := strconv.Atoi(claims.Subject)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	businessID := claims.BusinessID

	role, err := db.GetRoleByBusinessIDAndUserID(businessID, userID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	err = db.UpdateBookingStatus(bookingID, "cancelled")
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	bookingLog := models.BookingLog{
		BookingID: bookingID,
		UserID:    userID,
		State:     "cancelled",
		Details:   "Booking cancelled by " + role.Name + " with UserID " + strconv.Itoa(userID),
	}

	err = db.CreateBookingLog(&bookingLog)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	cancelBookingResponse := CancelBookingResponse{
		Message: "Booking cancelled successfully",
	}

	utils.WriteJSON(w, http.StatusOK, cancelBookingResponse)
}
