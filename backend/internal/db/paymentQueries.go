package db

import (
	"backend/models"
	"context"
	"time"
)

// RecordPayment records a payment.
func (db *DB) RecordPayment(payment *models.Payment) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `INSERT INTO payments (
				amount,
				description
			) VALUES (
				$1,
				$2
			) RETURNING id`

	err := db.QueryRowContext(
		ctx,
		query,
		payment.Amount,
		payment.Description,
	).Scan(&payment.ID)
	if err != nil {
		return err
	}

	return nil
}
