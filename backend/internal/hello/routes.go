package hello

import (
	"backend/utils"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func HelloRoutes(r *mux.Router) {
	helloRouter := r.PathPrefix("/hello").Subrouter()
	helloRouter.HandleFunc("", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

	    message := SayHello()
	    utils.WriteJSON(w, http.StatusOK, fmt.Sprintf("%s", message))
	}).Methods("GET")
}