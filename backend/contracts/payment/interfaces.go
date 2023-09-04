package payment

import (
	"backend/models"
	"net/http"
)

type PaymentInterface interface {
	PayBooking(w http.ResponseWriter, r *http.Request, db PaymentDBInterface)
}

type PaymentDBInterface interface {
	RecordPayment(payment *models.Payment) error
}
