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

// GetServiceDetail retrieves the cost of a service.
func (db *DB) GetServiceDetail(businessID, vehicleTypeID, serviceTypeID int) (*models.ServiceDetail, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT
				business_id,
				vehicle_type_id,
				service_type_id,
				price,
				duration_minutes,
				created_at,
				updated_at
			FROM
				service_costs
			WHERE
				business_id = $1 AND
				vehicle_type_id = $2 AND
				service_type_id = $3`

	row := db.QueryRowContext(ctx, query, businessID, vehicleTypeID, serviceTypeID)

	var serviceDetail models.ServiceDetail

	err := row.Scan(
		&serviceDetail.BusinessID,
		&serviceDetail.VehicleTypeID,
		&serviceDetail.ServiceTypeID,
		&serviceDetail.Price,
		&serviceDetail.DurationMinutes,
		&serviceDetail.CreatedAt,
		&serviceDetail.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &serviceDetail, nil
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

// CreateBooking creates a booking and returns the created booking.
func (db *DB) CreateBooking(booking *models.Booking) (*models.Booking, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `INSERT INTO bookings (
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
			) VALUES (
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10
			) RETURNING id`

	err := db.QueryRowContext(
		ctx,
		query,
		booking.BusinessID,
		booking.UserID,
		booking.VehicleTypeID,
		booking.ServiceTypeID,
		booking.Datetime,
		booking.Cost,
		booking.Discount,
		booking.Deposit,
		booking.BillNumber,
		booking.Status,
	).Scan(&booking.ID)
	if err != nil {
		return nil, err
	}

	return booking, nil
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

// GetBookingTimeslots retrieves all booking timeslots.
func (db *DB) GetBookingTimeslots(businessID int, serviceTypeID int, vehicleTypeID int, date time.Time) ([]*models.TimeSlot, error) {
	dbTimezone, err := time.LoadLocation("UTC")
	if err != nil {
		return nil, err
	}

	// TODO: Rename GetServiceDetail to GetServiceDetails
	serviceDetails, err := db.GetServiceDetail(businessID, vehicleTypeID, serviceTypeID)
	if err != nil {
		return nil, err
	}

	// Initialize primitives
	capacity := 3         // TODO: [THREAD:3] Read from config
	timeslotMinutes := 60 // TODO: [THREAD:3] Read from config
	timeslotManminutes := timeslotMinutes * capacity
	threshold := float32(50) / 100 // TODO: [THREAD:3] Read from config
	maxOverflow := int(float32(timeslotManminutes) * threshold)

	// Set up the reception start and end times
	receptionStart := date.Add(time.Hour * 9)                      // TODO: [THREAD:3] Read from config
	receptionEnd := date.Add(time.Hour * 17).Add(time.Minute * 30) // TODO: [THREAD:3] Read from config
	start := receptionStart
	end := start.Add(time.Duration(timeslotMinutes) * time.Minute)

	// Retrieve booked timeslots within the day
	bookings, err := db.GetBookingsByDate(businessID, date)
	if err != nil {
		return nil, err
	}

	// Generate timeslots
	timeslotCount := int(receptionEnd.Sub(receptionStart).Minutes()) / timeslotMinutes
	timeslots := make([]*models.TimeSlot, 0, timeslotCount)

	lastOverflow := 0

	for i := 0; i < timeslotCount; i++ {
		isPast := time.Now().In(dbTimezone).After(start)
		isLastTimeslot := receptionEnd.Before(end)

		sum := 0
		sumNext := 0
		for _, b := range bookings {
			if b.Datetime.Equal(start) {
				sum += b.EstimatedMinutes
			} else if b.Datetime.Equal(end) {
				sumNext += b.EstimatedMinutes
			}
		}

		nextOverflow := 0
		if calcNextOverflow := sumNext - timeslotManminutes; calcNextOverflow > 0 {
			nextOverflow = calcNextOverflow
		}

		allowedOverflow := 0
		if isLastTimeslot {
			allowedOverflow = maxOverflow - nextOverflow
		}

		maxCalc := timeslotManminutes + allowedOverflow - lastOverflow
		remained := maxCalc - sum
		available := !isPast && (remained-serviceDetails.DurationMinutes >= 0)

		timeslot := models.TimeSlot{
			StartTime:   start,
			EndTime:     end,
			FreeMinutes: remained,
			Available:   available,
			IsPast:      isPast,
		}

		timeslots = append(timeslots, &timeslot)

		start = end
		end = start.Add(time.Duration(timeslotMinutes) * time.Minute)
	}

	return timeslots, nil
}
