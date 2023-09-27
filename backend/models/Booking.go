package models

import "time"

type Booking struct {
	ID                string
	TransactionNumber string
	BillNumber        string
	TypeOfService     string
	VehicleType       string
	Date              string
	Time              string
	ServiceCost       string
	Discount          string
	Total             string
	Deposit           string
	Remaining         string
}

type Booking1 struct {
	ID            int64
	BusinessID    int64
	UserID        int64
	VehicleTypeID int64
	ServiceTypeID int64
	Datetime      time.Time
	Cost          int
	Discount      int
	Deposit       int
	BillNumber    int64
	Status        string
}
