package db

import (
	"backend/contracts/auth"
	"backend/contracts/booking"
	"backend/contracts/common"
)

type DBInterface interface {
	SetupDB() error
	common.AppDBInterface
	auth.AuthDBInterface
	booking.BookingDBInterface
}
