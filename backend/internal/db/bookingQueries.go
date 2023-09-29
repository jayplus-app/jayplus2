package db

import (
	"backend/models"
	"context"
	"time"
)

// GetVehicleTypes retrieves all vehicle types.
func (db *DB) GetVehicleTypes(business_id int) ([]*models.VehicleType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				*
			FROM
				vehicle_types
			WHERE
				business_id = $1
			ORDER BY
				position`

	rows, err := db.QueryContext(ctx, query, business_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var vehicleTypes []*models.VehicleType

	for rows.Next() {
		var vehicleType models.VehicleType

		err := rows.Scan(
			&vehicleType.ID,
			&vehicleType.BusinessID,
			&vehicleType.Name,
			&vehicleType.Icon,
			&vehicleType.Description,
			&vehicleType.Position,
			&vehicleType.CreatedAt,
		)
		if err != nil {
			return nil, err
		}

		vehicleTypes = append(vehicleTypes, &vehicleType)
	}

	return vehicleTypes, nil
}

// GetServiceTypes retrieves all service types.
func (db *DB) GetServiceTypes(business_id int) ([]*models.ServiceType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				*
			FROM
				service_types
			WHERE
				business_id = $1
			ORDER BY
				position`

	rows, err := db.QueryContext(ctx, query, business_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var serviceTypes []*models.ServiceType

	for rows.Next() {
		var serviceType models.ServiceType

		err := rows.Scan(
			&serviceType.ID,
			&serviceType.BusinessID,
			&serviceType.Name,
			&serviceType.Icon,
			&serviceType.Description,
			&serviceType.Position,
			&serviceType.CreatedAt,
		)
		if err != nil {
			return nil, err
		}

		serviceTypes = append(serviceTypes, &serviceType)
	}

	return serviceTypes, nil
}
