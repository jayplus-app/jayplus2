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
