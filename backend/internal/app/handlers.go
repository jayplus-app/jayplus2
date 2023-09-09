package app

import (
	"backend/contracts/common"
	"backend/utils"
	"net/http"
)

func (app *App) UICOnfig(w http.ResponseWriter, r *http.Request, db common.AppDBInterface) {
	w.Header().Set("Content-Type", "application/json")

	uiConfig := map[string]interface{}{
		"appConfig": map[string]interface{}{
			"maxFutureBookingDays": 5,
		},
		"cssConfig": map[string]string{
			"primaryColor":   "#FFC960",
			"secondaryColor": "#ced4da",
		},
	}

	utils.WriteJSON(w, http.StatusOK, uiConfig)
}
