package app

import (
	"backend/contracts/app"
	"backend/contracts/common"
	"net/http"

	"github.com/gorilla/mux"
)

func AppRoutes(r *mux.Router, app app.AppInterface, db common.AppDBInterface) {
	appRouter := r.PathPrefix("/app").Subrouter()

	appRouter.HandleFunc("/ui-config", func(w http.ResponseWriter, r *http.Request) {
		app.UICOnfig(w, r, db)
	}).Methods("GET")
}
