package app

import (
	"backend/internal/hello"

	"github.com/gorilla/mux"
)



func (app *App) SetupRouter() *mux.Router {
	r := mux.NewRouter()
	hello.HelloRoutes(r)
	return r
}