package models

import "time"

type Business struct {
	ID           int64
	Name         string
	BusinessName string
	Timezone     string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
