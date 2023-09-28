package db

import (
	"backend/models"
)

type DBInterface interface {
	SetupDB() error

	// App
	GetBusinessUIConfigByID(business_id int) (*models.UIConfig, error)
	GetBusinessBookingConfigByID(business_id int) (*models.BookingConfig, error)

	// Common
	GetBusinessByBusinessName(businessName string) (*models.Business, error)

	// Auth
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	IsUserInBusiness(userID, businessID int) (bool, error)

	// Booking
	GetVehicleTypes() ([]*models.VehicleType, error)

	// Payment
	RecordPayment(payment *models.Payment) error

	// SMS
	RecordSMS(sms *models.SMS) error
}
