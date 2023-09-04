package auth

import (
	"backend/utils"
	"net/http"
)

func (a *Auth) AuthRequired(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _, err := a.getHeaderFromTokenAndVerify(w, r)
		if err != nil {
			utils.ErrorJSON(w, err, http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
