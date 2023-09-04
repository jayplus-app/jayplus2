package sms

import "backend/models"

type SMSInterface interface {
	// Functions
	SendSMS()
}

type SMSDBInterface interface {
	RecordSMS(sms *models.SMS) error
}
