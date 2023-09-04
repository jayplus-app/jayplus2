package payment

import (
	"backend/contracts/payment"
	"backend/utils"
	"fmt"
	"net/http"
)

func (p *Payment) PaymentMethods(w http.ResponseWriter, r *http.Request, db payment.PaymentDBInterface) {
	fmt.Println("PaymentMethods")
	utils.WriteJSON(w, http.StatusOK, "PaymentMethods")
}
