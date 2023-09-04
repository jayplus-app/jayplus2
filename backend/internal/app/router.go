package app

import (
	"backend/internal/auth"
	"backend/internal/booking"
	"backend/internal/hello"
	"backend/internal/payment"

	"github.com/gorilla/mux"
)

func (app *App) SetupRouter() *mux.Router {
	r := mux.NewRouter()
	hello.HelloRoutes(r)
	AppRoutes(r, app, app.DB)
	auth.AuthRoutes(r, app.Auth, app.DB)
	booking.BookingRoutes(r, app.Booking, app.DB)
	payment.PaymentRoutes(r, app.Payment, app.DB)
	return r
}
