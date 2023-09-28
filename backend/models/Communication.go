package models

import "time"

type Communication struct {
	ID        int
	ChannelID int
	UserID    int
	From      string
	To        string
	Content   string
	CreatedAt time.Time
}
