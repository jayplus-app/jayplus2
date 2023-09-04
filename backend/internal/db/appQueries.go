package db

import (
	"backend/models"
	"context"
	"time"
)

// GetUIConfig retrieves the UI config.
func (db *DB) GetUIConfig() (*models.UIConfig, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				name,
				description,
			FROM
				ui_config`

	var uiConfig models.UIConfig

	err := db.QueryRowContext(ctx, query).Scan(
		&uiConfig.ID,
		&uiConfig.Name,
		&uiConfig.Description,
	)
	if err != nil {
		return nil, err
	}

	return &uiConfig, nil
}
