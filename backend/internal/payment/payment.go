package payment

import "backend/contracts/payment"

type Payment struct {
	payment.Payment
}

func NewPayment() *Payment {
	return &Payment{
		payment.Payment{
			ID:          1,
			Amount:      100.00,
			Description: "Test Payment",
		},
	}
}
