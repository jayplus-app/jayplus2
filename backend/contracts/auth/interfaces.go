package auth

import (
	"backend/models"
	"net/http"
)

type AuthInterface interface {
	// Handlers
	Login(w http.ResponseWriter, r *http.Request, db AuthDBInterface)
	RefreshToken(w http.ResponseWriter, r *http.Request, db AuthDBInterface)
	Logout(w http.ResponseWriter, r *http.Request)

	// Middleware
	AuthRequired(next http.Handler) http.Handler
}

type AuthDBInterface interface {
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
}