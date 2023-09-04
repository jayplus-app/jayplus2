package app

import (
	"backend/contracts/auth"
	"backend/contracts/booking"
	"backend/contracts/db"
	"backend/contracts/payment"
	"backend/contracts/sms"

	"github.com/gorilla/mux"
)

type App struct {
	DB      db.DBInterface
	Router  *mux.Router
	Auth    auth.AuthInterface
	Booking booking.BookingInterface
	Payment payment.PaymentInterface
	SMS     sms.SMSInterface
}
