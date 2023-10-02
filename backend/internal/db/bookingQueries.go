package db

import (
	"backend/models"
	"context"
	"time"
)

// GetVehicleTypes retrieves all vehicle types.
func (db *DB) GetVehicleTypes(businessID int) ([]*models.VehicleType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				business_id,
				name,
				icon,
				description,
				position,
				created_at
			FROM
				vehicle_types
			WHERE
				business_id = $1
			ORDER BY
				position`

	rows, err := db.QueryContext(ctx, query, businessID)
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

// GetVehicleTypeByID retrieves a vehicle type by ID.
func (db *DB) GetVehicleTypeByID(vehicleTypeID int) (*models.VehicleType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				business_id,
				name,
				icon,
				description,
				position,
				created_at
			FROM
				vehicle_types
			WHERE
				id = $1`

	row := db.QueryRowContext(ctx, query, vehicleTypeID)

	var vehicleType models.VehicleType

	err := row.Scan(
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

	return &vehicleType, nil
}

// GetServiceTypes retrieves all service types.
func (db *DB) GetServiceTypes(businessID int) ([]*models.ServiceType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				business_id,
				name,
				icon,
				description,
				position,
				created_at
			FROM
				service_types
			WHERE
				business_id = $1
			ORDER BY
				position`

	rows, err := db.QueryContext(ctx, query, businessID)
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

// GetServiceTypeByID retrieves a service type by ID.
func (db *DB) GetServiceTypeByID(serviceTypeID int) (*models.ServiceType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				business_id,
				name,
				icon,
				description,
				position,
				created_at
			FROM
				service_types
			WHERE
				id = $1`

	row := db.QueryRowContext(ctx, query, serviceTypeID)

	var serviceType models.ServiceType

	err := row.Scan(
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

	return &serviceType, nil
}

// GetServiceCost retrieves the cost of a service.
func (db *DB) GetServiceCost(businessID, vehicleTypeID, serviceTypeID int) (*models.ServiceCost, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				business_id,
				vehicle_type_id,
				service_type_id,
				price,
				created_at,
				updated_at
			FROM
				service_costs
			WHERE
				business_id = $1 AND
				vehicle_type_id = $2 AND
				service_type_id = $3`

	row := db.QueryRowContext(ctx, query, businessID, vehicleTypeID, serviceTypeID)

	var serviceCost models.ServiceCost

	err := row.Scan(
		&serviceCost.BusinessID,
		&serviceCost.VehicleTypeID,
		&serviceCost.ServiceTypeID,
		&serviceCost.Price,
		&serviceCost.CreatedAt,
		&serviceCost.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &serviceCost, nil
}

// GetBookings retrieves all bookings.
func (db *DB) GetBookingsByDate(businessID int, date time.Time) ([]*models.Booking, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				business_id,
				user_id,
				vehicle_type_id,
				service_type_id,
				datetime,
				cost,
				discount,
				deposit,
				bill_number,
				status
			FROM
				bookings
			WHERE
				business_id = $1 AND
				datetime::date = $2::date`

	rows, err := db.QueryContext(ctx, query, businessID, date)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bookings []*models.Booking

	for rows.Next() {
		var booking models.Booking

		err := rows.Scan(
			&booking.ID,
			&booking.BusinessID,
			&booking.UserID,
			&booking.VehicleTypeID,
			&booking.ServiceTypeID,
			&booking.Datetime,
			&booking.Cost,
			&booking.Discount,
			&booking.Deposit,
			&booking.BillNumber,
			&booking.Status,
		)
		if err != nil {
			return nil, err
		}

		bookings = append(bookings, &booking)
	}

	return bookings, nil
}

// GetBookingByID retrieves a booking by ID.
func (db *DB) GetBookingByID(bookingID int) (*models.Booking, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				id,
				business_id,
				user_id,
				vehicle_type_id,
				service_type_id,
				datetime,
				cost,
				discount,
				deposit,
				bill_number,
				status
			FROM
				bookings
			WHERE
				id = $1`

	row := db.QueryRowContext(ctx, query, bookingID)

	var booking models.Booking

	err := row.Scan(
		&booking.ID,
		&booking.BusinessID,
		&booking.UserID,
		&booking.VehicleTypeID,
		&booking.ServiceTypeID,
		&booking.Datetime,
		&booking.Cost,
		&booking.Discount,
		&booking.Deposit,
		&booking.BillNumber,
		&booking.Status,
	)
	if err != nil {
		return nil, err
	}

	return &booking, nil
}

// CancelBooking cancels a booking.
func (db *DB) UpdateBookingStatus(bookingID int, status string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `UPDATE
				bookings
			SET
				status = $1
			WHERE
				id = $2`

	_, err := db.ExecContext(ctx, query, status, bookingID)
	if err != nil {
		return err
	}

	return nil
}

// CreateBookingLog creates a booking log.
func (db *DB) CreateBookingLog(bookingLog *models.BookingLog) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `INSERT INTO booking_logs (
				booking_id,
				user_id,
				state,
				details
			) VALUES (
				$1,
				$2,
				$3,
				$4
			) RETURNING id`

	err := db.QueryRowContext(
		ctx,
		query,
		bookingLog.BookingID,
		bookingLog.UserID,
		bookingLog.State,
		bookingLog.Details,
	).Scan(&bookingLog.ID)
	if err != nil {
		return err
	}

	return nil
}
