package app

import (
	"backend/internal/auth"
	"backend/internal/hello"

	"github.com/gorilla/mux"
)

func (app *App) SetupRouter() *mux.Router {
	r := mux.NewRouter()
	hello.HelloRoutes(r)
	auth.AuthRoutes(r, app.Auth, app.DB)
	return r
}
