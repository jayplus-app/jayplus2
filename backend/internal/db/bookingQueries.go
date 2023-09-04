package db

import (
	"backend/models"
	"context"
	"time"
)

// GetVehicleTypes retrieves all vehicle types.
func (db *DB) GetVehicleTypes() ([]*models.VehicleType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				name,
				description,
			FROM
				vehicle_types`

	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var vehicleTypes []*models.VehicleType

	for rows.Next() {
		var vehicleType models.VehicleType

		err := rows.Scan(
			&vehicleType.ID,
			&vehicleType.Name,
			&vehicleType.Description,
		)
		if err != nil {
			return nil, err
		}

		vehicleTypes = append(vehicleTypes, &vehicleType)
	}

	return vehicleTypes, nil
}