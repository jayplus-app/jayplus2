package auth

import (
	"net/http"

	authContracts "backend/contracts/auth"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router, auth authContracts.AuthInterface, db authContracts.AuthDBInterface) {
	authRouter := r.PathPrefix("/auth").Subrouter()

	authRouter.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		auth.Login(w, r, db)
	}).Methods("POST")
	authRouter.HandleFunc("/refresh", func(w http.ResponseWriter, r *http.Request) {
		auth.RefreshToken(w, r, db)
	}).Methods("GET")
	authRouter.HandleFunc("/logout", func(w http.ResponseWriter, r *http.Request) {
		auth.Logout(w, r)
	}).Methods("GET")
}