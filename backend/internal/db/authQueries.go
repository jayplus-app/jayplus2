package db

import (
	"backend/models"
	"database/sql"
	"errors"
)

// GetUserByEmail retrieves a user by email.
func (db *DB) GetUserByEmail(email string) (*models.User, error) {
	query := `SELECT 
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

	row, err := ExecuteQuery(db.DB, query, email)
	if err != nil {
		return nil, err
	}

	var user models.User
	err = row.Scan(
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
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

// GetUserByID retrieves a user by ID.
func (db *DB) GetUserByID(id int) (*models.User, error) {
	query := `SELECT 
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

	row, err := ExecuteQuery(db.DB, query, id)
	if err != nil {
		return nil, err
	}

	var user models.User
	err = row.Scan(
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
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}