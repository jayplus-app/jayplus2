package models

import "time"

type ServiceType struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

type ServiceType1 struct {
	ID          int       `json:"id"`
	BusinessID  int       `json:"businessId"`
	Name        string    `json:"name"`
	Icon        string    `json:"icon"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
}
