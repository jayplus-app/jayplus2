package db

import (
	"backend/models"
	"context"
	"time"
)

// GetUserByEmail retrieves a user by email.
func (db *DB) GetUserByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	quey := `SELECT 
				*
			FROM 
				users
			WHERE
				email = $1`

	var user models.User

	row := db.QueryRowContext(ctx, quey, email)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.PhoneNumber,
		&user.HashedPassword,
		&user.FirstName,
		&user.LastName,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserByID retrieves a user by ID.
func (db *DB) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	quey := `SELECT 
				*
			FROM
				users
			WHERE
				id = $1`

	var user models.User

	row := db.QueryRowContext(ctx, quey, id)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.PhoneNumber,
		&user.HashedPassword,
		&user.FirstName,
		&user.LastName,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetBusinessByBusinessName retrieves a business by business name.
func (db *DB) GetBusinessByBusinessName(businessName string) (*models.Business, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT * FROM businesses WHERE business_name = $1`

	var business models.Business

	row := db.QueryRowContext(ctx, query, businessName)

	err := row.Scan(
		&business.ID,
		&business.Name,
		&business.BusinessName,
		&business.Timezone,
		&business.CreatedAt,
		&business.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &business, nil
}

// IsUserInBusiness checks if a user is in a business.
func (db *DB) IsUserInBusiness(userID, businessID int) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := `SELECT EXISTS(SELECT 1 FROM business_users WHERE user_id = $1 AND business_id = $2)`

	var exists bool
	err := db.QueryRowContext(ctx, query, userID, businessID).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}
