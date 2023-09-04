package payment

import "net/http"

type PaymentInterface interface {
	PaymentMethods(w http.ResponseWriter, r *http.Request, db PaymentDBInterface)
}

type PaymentDBInterface interface {
}
