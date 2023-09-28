package models

type BookingLog struct {
	ID        int
	BookingID int
	UserID    int
	State     string
	Details   string
}
