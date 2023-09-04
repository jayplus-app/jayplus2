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
				id,
				email,
				phone_number,
				password, 
				first_name,
				last_name,
				role,
				created_at,
				updated_at
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
		&user.Password,
		&user.FirstName,
		&user.LastName,
		&user.Role,
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
				id,
				email,
				phone_number,
				password, 
				first_name,
				last_name,
				role,
				created_at,
				updated_at
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
		&user.Password,
		&user.FirstName,
		&user.LastName,
		&user.Role,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
