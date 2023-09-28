package models

import "time"

type Booking struct {
	ID                string `json:"id"`
	TransactionNumber string `json:"transactionNumber"`
	BillNumber        string `json:"billNumber"`
	TypeOfService     string `json:"typeOfService"`
	VehicleType       string `json:"vehicleType"`
	Date              string `json:"date"`
	Time              string `json:"time"`
	ServiceCost       string `json:"serviceCost"`
	Discount          string `json:"discount"`
	Total             string `json:"total"`
	Deposit           string `json:"deposit"`
	Remaining         string `json:"remaining"`
}

type Booking1 struct {
	ID            int       `json:"id"`
	BusinessID    int       `json:"businessId"`
	UserID        int       `json:"userId"`
	VehicleTypeID int       `json:"vehicleTypeId"`
	ServiceTypeID int       `json:"serviceTypeId"`
	Datetime      time.Time `json:"datetime"`
	Cost          int       `json:"cost"`
	Discount      int       `json:"discount"`
	Deposit       int       `json:"deposit"`
	BillNumber    int       `json:"billNumber"`
	Status        string    `json:"status"`
}
