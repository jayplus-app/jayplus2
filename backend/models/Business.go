package models

import "time"

type Business struct {
	ID           int
	Name         string
	BusinessName string
	Timezone     string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
