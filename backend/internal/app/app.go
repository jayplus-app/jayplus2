package app

import (
	"backend/config"
	"backend/contracts/app"
	"backend/contracts/auth"
	"backend/contracts/booking"
	"backend/contracts/db"
	"backend/contracts/payment"
	"backend/contracts/sms"
	"fmt"
	"net/http"
)

type App struct {
	app.App
}

func NewApp(
	dbInstance db.DBInterface,
	authInstance auth.AuthInterface,
	bookingInstance booking.BookingInterface,
	paymentInstance payment.PaymentInterface,
	smsInstance sms.SMSInterface,
) (*App, error) {
	app := &App{
		app.App{
			DB:      dbInstance,
			Auth:    authInstance,
			Booking: bookingInstance,
			Payment: paymentInstance,
			SMS:     smsInstance,
		},
	}
	app.Router = app.SetupRouter()

	return app, nil
}

func (app *App) Run() error {
	fmt.Printf("Server running on port %s\n", config.Port)
	return http.ListenAndServe(fmt.Sprintf(":%s", config.Port), app.Router)
}
