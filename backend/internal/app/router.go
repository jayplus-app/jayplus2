package app

import (
	"backend/internal/auth"
	"backend/internal/booking"
	"backend/internal/hello"

	"github.com/gorilla/mux"
)

func (app *App) SetupRouter() *mux.Router {
	r := mux.NewRouter()
	hello.HelloRoutes(r)
	// Implement AppRoutes here
	AppRoutes(r, app, app.DB)
	auth.AuthRoutes(r, app.Auth, app.DB)
	booking.BookingRoutes(r, app.Booking, app.DB)
	return r
}
