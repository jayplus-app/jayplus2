package payment

import (
	"backend/contracts/payment"
	"net/http"

	"github.com/gorilla/mux"
)

func PaymentRoutes(r *mux.Router, db payment.PaymentDBInterface) {
	paymentRouter := r.PathPrefix("/payment").Subrouter()

	paymentRouter.HandleFunc("/pay-booking", func(w http.ResponseWriter, r *http.Request) {
		PayBooking(w, r, db)
	}).Methods("GET")
	paymentRouter.HandleFunc("/invoice", func(w http.ResponseWriter, r *http.Request) {
		GetInvoice(w, r, db)
	}).Methods("GET")
}
