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
	ID            int
	BusinessID    int
	UserID        int
	VehicleTypeID int
	ServiceTypeID int
	Datetime      time.Time
	Cost          int
	Discount      int
	Deposit       int
	BillNumber    int
	Status        string
}
