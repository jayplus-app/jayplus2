package app

import (
	"backend/contracts/common"
	"backend/utils"
	"net/http"
)

func (app *App) UICOnfig(w http.ResponseWriter, r *http.Request, db common.AppDBInterface) {
	w.Header().Set("Content-Type", "application/json")
	utils.WriteJSON(w, http.StatusOK, "UICOnfig")
}
