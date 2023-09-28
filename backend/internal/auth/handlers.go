package auth

import (
	"backend/contracts/auth"
	"backend/utils"
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
)

func (a *Auth) Login(w http.ResponseWriter, r *http.Request, db auth.AuthDBInterface) {
	var reqPayload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := utils.ReadJSON(w, r, &reqPayload)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	user, err := db.GetUserByEmail(reqPayload.Email)
	if err != nil {
		utils.ErrorJSON(w, errors.New("invalid login credentials"), http.StatusBadRequest)
		return
	}

	valid, err := passwordMatches(user, reqPayload.Password)
	if err != nil || !valid {
		utils.ErrorJSON(w, errors.New("invalid login credentials"), http.StatusBadRequest)
		return
	}

	businessName := r.Header.Get("Business-Name")

	business, err := db.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, errors.New("invalid business"), http.StatusBadRequest)
		return
	}

	isUserInBusiness, err := db.IsUserInBusiness(user.ID, business.ID)
	if err != nil || !isUserInBusiness {
		utils.ErrorJSON(w, errors.New("user not associated with the business"), http.StatusBadRequest)
		return
	}

	// create JWT user
	u := auth.AuthUser{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}

	// generate JWT tokens
	tokenPair, err := a.generateSignedTokenPair(&u)
	if err != nil {
		log.Fatalf("Error generating token pair: %v", err)
	}

	// set refresh cookie
	refreshCookie := a.getRefreshCookie(tokenPair.RefreshToken)
	http.SetCookie(w, refreshCookie)

	utils.WriteJSON(w, http.StatusAccepted, tokenPair)
}

func (a *Auth) RefreshToken(w http.ResponseWriter, r *http.Request, db auth.AuthDBInterface) {
	for _, cookie := range r.Cookies() {
		if cookie.Name == a.CookieName {
			claims := &auth.JWTClaims{}
			refreshToken := cookie.Value

			_, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (any, error) {
				return []byte(a.Secret), nil
			})
			if err != nil {
				utils.ErrorJSON(w, errors.New("unauthorized"), http.StatusUnauthorized)
				return
			}

			userID, err := strconv.Atoi(claims.Subject)
			if err != nil {
				utils.ErrorJSON(w, errors.New("unknown User"), http.StatusUnauthorized)
				return
			}

			user, err := db.GetUserByID(userID)
			if err != nil {
				utils.ErrorJSON(w, errors.New("unknown User"), http.StatusUnauthorized)
				return
			}

			u := auth.AuthUser{
				ID:        user.ID,
				FirstName: user.FirstName,
				LastName:  user.LastName,
			}

			businessName := r.Header.Get("Business-Name")

			business, err := db.GetBusinessByBusinessName(businessName)
			if err != nil {
				utils.ErrorJSON(w, errors.New("invalid business"), http.StatusBadRequest)
				return
			}

			isUserInBusiness, err := db.IsUserInBusiness(user.ID, business.ID)
			if err != nil || !isUserInBusiness {
				utils.ErrorJSON(w, errors.New("user not associated with the business"), http.StatusBadRequest)
				return
			}

			tokenPair, err := a.generateSignedTokenPair(&u)
			if err != nil {
				utils.ErrorJSON(w, errors.New("error generating token pair"), http.StatusInternalServerError)
				return
			}

			http.SetCookie(w, a.getRefreshCookie(tokenPair.RefreshToken))

			utils.WriteJSON(w, http.StatusOK, tokenPair)
		}
	}
}

func (a *Auth) Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, a.getExpiredRefreshCookie())
	w.WriteHeader(http.StatusAccepted)
	utils.WriteJSON(w, http.StatusOK, "Logged out")
}
