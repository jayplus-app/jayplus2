package models

import "time"

type Communication struct {
	ID        int64
	ChannelID int64
	UserID    int64
	From      string
	To        string
	Content   string
	CreatedAt time.Time
}
