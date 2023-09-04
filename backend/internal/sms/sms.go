package sms

import (
	"backend/contracts/sms"
	"fmt"
)

type SMS struct {
	sms.SMS
}

func NewSMS() *SMS {
	return &SMS{
		sms.SMS{
			ID:       1,
			Content:  "Test SMS",
			ToNumber: "1234567890",
		},
	}
}

func (s *SMS) SendSMS() {
	fmt.Println("SendSMS")
}
