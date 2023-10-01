package app

import (
	"backend/contracts/db"
	"backend/utils"
	"net/http"
)

func (app *App) UICOnfig(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	w.Header().Set("Content-Type", "application/json")

	businessName := r.Header.Get("Business-Name")

	business, err := app.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	uiConfig, err := app.GetBusinessUIConfigByID(business.ID)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	utils.WriteJSON(w, http.StatusOK, uiConfig)
}

func (app *App) BookingConfig(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	w.Header().Set("Content-Type", "application/json")

	businessName := r.Header.Get("Business-Name")

	business, err := app.GetBusinessByBusinessName(businessName)
	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	uiConfig, err := app.GetBusinessBookingConfigByID(business.ID)

	if err != nil {
		utils.ErrorJSON(w, err, http.StatusBadRequest)
		return
	}

	utils.WriteJSON(w, http.StatusOK, uiConfig)
}
