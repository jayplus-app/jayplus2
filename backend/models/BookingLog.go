package models

type BookingLog struct {
	ID        int64
	BookingID int64
	UserID    int64
	State     string
	Details   string
}
