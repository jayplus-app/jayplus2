package models

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
