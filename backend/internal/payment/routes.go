package payment

import (
	"backend/contracts/payment"
	"net/http"

	"github.com/gorilla/mux"
)

func PaymentRoutes(r *mux.Router, db payment.PaymentDBInterface) {
	paymentRouter := r.PathPrefix("/payment").Subrouter()

	paymentRouter.HandleFunc("/methods", func(w http.ResponseWriter, r *http.Request) {
		PaymentMethods(w, r, db)
	}).Methods("GET")
}
