package app

import (
	"backend/contracts/common"
	"net/http"
)

type AppInterface interface {
	UICOnfig(w http.ResponseWriter, r *http.Request, db common.AppDBInterface)
}
