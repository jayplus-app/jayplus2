package booking

import "backend/contracts/booking"

type Booking struct {
	booking.Booking
}

func NewBooking() *Booking {
	return &Booking{
		booking.Booking{
			Number: "123456",
		},
	}
}