package payment

import (
	"backend/contracts/db"
	"backend/utils"
	"net/http"
)

func PayBooking(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	payment := map[string]string{
		"booking_id": "1",
		"amount":     "100",
	}

	utils.WriteJSON(w, http.StatusOK, payment)
}

func GetInvoice(w http.ResponseWriter, r *http.Request, db db.DBInterface) {
	invoice := map[string]string{
		"transactionNumber": "1",
		"billNumber":        "1",
		"typeOfService":     "Show Room",
		"vehicleType":       "Sedan",
		"date":              "2023-03-14",
		"time":              "15:00",
		"serviceCost":       "169.00",
		"discount":          "Not Specified",
		"total":             "169.00",
		"deposit":           "30.00",
		"remaining":         "139.00",
	}

	utils.WriteJSON(w, http.StatusOK, invoice)
}
