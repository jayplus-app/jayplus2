package db

import (
	"backend/contracts/auth"
	"backend/contracts/booking"
)

type DBInterface interface {
	SetupDB() error
	auth.AuthDBInterface
	booking.BookingDBInterface
}