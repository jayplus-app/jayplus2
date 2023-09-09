package payment

import (
	"backend/contracts/payment"
	"backend/utils"
	"net/http"
)

func PayBooking(w http.ResponseWriter, r *http.Request, db payment.PaymentDBInterface) {
	payment := map[string]string{
		"booking_id": "1",
		"amount":     "100",
	}

	utils.WriteJSON(w, http.StatusOK, payment)
}

func GetInvoice(w http.ResponseWriter, r *http.Request, db payment.PaymentDBInterface) {
	invoice := map[string]string{
		"bookingID":   "13",
		"serviceType": "Show Room",
		"vehicleType": "Sedan",
		"date":        "2023-03-14",
		"time":        "15:00",
		"serviceCost": "169.00",
		"discount":    "Not Specified",
		"total":       "169.00",
		"deposit":     "30.00",
		"remaining":   "139.00",
	}

	utils.WriteJSON(w, http.StatusOK, invoice)
}
