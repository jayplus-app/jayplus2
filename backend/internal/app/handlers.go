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
			"primaryColorLight":       "#FFC960",
			"primaryColorDark":        "#ffaf14",
			"secondaryColorLight":     "#e9edf0",
			"secondaryColorDark":      "#ced4da",
			"secondaryColorDarker":    "#b1bbc4",
			"complementaryColorLight": "#eaf0f0",
			"complementaryColorDark":  "#45645b",
			"disableColor":            "#f3f3f3",
		},
	}

	utils.WriteJSON(w, http.StatusOK, uiConfig)
}
