package app

import (
	"backend/config"
	"backend/contracts/auth"
	"backend/contracts/booking"
	"backend/contracts/db"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type App struct {
	DB     		db.DBInterface
	Router 		*mux.Router
	Auth   		auth.AuthInterface
	Booking 	booking.BookingInterface
}

func NewApp(dbInstance db.DBInterface, authInstance auth.AuthInterface, bookingInstance booking.BookingInterface) (*App, error) {
	app := &App{
		DB:   dbInstance,
		Auth: authInstance,
		Booking: bookingInstance,
	}
	app.Router = app.SetupRouter()

	return app, nil
}

func (app *App) Run() error {
	fmt.Printf("Server running on port %s\n", config.Port)
	return http.ListenAndServe(fmt.Sprintf(":%s", config.Port), app.Router)
}