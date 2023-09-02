package app

import (
	"backend/config"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type App struct {
	Router *mux.Router
}

func NewApp() (*App, error) {
	app := &App{}
	app.Router = app.SetupRouter()
	return app, nil
}

func (app *App) Run() error {
	fmt.Printf("Server running on port %s\n", config.Port)
	return http.ListenAndServe(fmt.Sprintf(":%s", config.Port), app.Router)
}