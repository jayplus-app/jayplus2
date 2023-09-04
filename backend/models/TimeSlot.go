package models

import "time"

type TimeSlot struct {
	ID          string    `json:"id"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
	FreeMinutes int       `json:"free_minutes"`
	Available   bool      `json:"available"`
	IsPast      bool      `json:"is_past"`
}
