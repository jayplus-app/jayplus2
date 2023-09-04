package db

import (
	"backend/contracts/auth"
	"backend/contracts/booking"
	"backend/contracts/common"
	"backend/contracts/payment"
	"backend/contracts/sms"
)

type DBInterface interface {
	SetupDB() error
	common.AppDBInterface
	auth.AuthDBInterface
	booking.BookingDBInterface
	payment.PaymentDBInterface
	sms.SMSDBInterface
}
