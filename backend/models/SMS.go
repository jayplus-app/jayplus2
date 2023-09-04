package models

type SMS struct {
	ID       int64  `json:"id"`
	Content  string `json:"content"`
	ToNumber string `json:"to_number"`
}
