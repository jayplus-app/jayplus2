package models

import "time"

type ServiceType struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

type ServiceType1 struct {
	ID          int64
	BusinessID  int64
	Name        string
	Icon        string
	Description string
	CreatedAt   time.Time
}
