package payment

import (
	"backend/contracts/payment"
	"net/http"

	"github.com/gorilla/mux"
)

func PaymentRoutes(r *mux.Router, payment payment.PaymentInterface, db payment.PaymentDBInterface) {
	paymentRouter := r.PathPrefix("/payment").Subrouter()

	paymentRouter.HandleFunc("/methods", func(w http.ResponseWriter, r *http.Request) {
		payment.PaymentMethods(w, r, db)
	}).Methods("GET")
}
