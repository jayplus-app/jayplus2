package app

import (
	"backend/contracts/common"
	"backend/utils"
	"net/http"
)

func (app *App) UICOnfig(w http.ResponseWriter, r *http.Request, db common.AppDBInterface) {
	w.Header().Set("Content-Type", "application/json")

	uiConfig := map[string]string{
		"maxFutureBookingDays": "5",
	}

	utils.WriteJSON(w, http.StatusOK, uiConfig)
}
