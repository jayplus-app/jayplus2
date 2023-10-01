package db

import (
	"backend/models"
	"time"
)

type DBInterface interface {
	SetupDB() error

	First(table string, criteria string, args []interface{}, orderBy string) ([]byte, error)
	All(table string, criteria string, args []interface{}, orderBy string, limit int, page int) ([][]byte, error)
	Insert(table string, data interface{}) error
	Update(table string, criteria string, args []interface{}, data interface{}) error
	Delete(table string, criteria string, args []interface{}) error

	// Common
	GetBusinessByBusinessName(businessName string) (*models.Business, error)

	// Auth
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	IsUserInBusiness(userID, businessID int) (bool, error)

	// Booking
	GetVehicleTypes(businessID int) ([]*models.VehicleType, error)
	GetVehicleTypeByID(vehicleTypeID int) (*models.VehicleType, error)
	GetServiceTypes(businessID int) ([]*models.ServiceType, error)
	GetServiceTypeByID(serviceTypeID int) (*models.ServiceType, error)
	GetServiceCost(businessID, vehicleTypeID, serviceTypeID int) (*models.ServiceCost, error)
	GetBookingsByDate(businessID int, date time.Time) ([]*models.Booking, error)
	GetBookingByID(bookingID int) (*models.Booking, error)

	// Payment
	RecordPayment(payment *models.Payment) error

	// SMS
	RecordSMS(sms *models.SMS) error
}
