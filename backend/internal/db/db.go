package db

import (
	"backend/config"
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

const (
	dbConnectTimeout = 3
)

type DB struct {
	*sql.DB
}

func (db *DB) SetupDB() error {
	pgConString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.DBHost,
		config.DBPort,
		config.DBUser,
		config.DBPassword,
		config.DBName,
	)

	var err error
	db.DB, err = sql.Open("pgx", pgConString)
	if err != nil {
		return err
	}

	log.Println("Database connection successfully established")

	return nil
}

// First retrieves the first record from the database.
func (db *DB) First(table string, criteria string, args []interface{}, orderBy string) ([]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := fmt.Sprintf("SELECT * FROM %s WHERE %s ORDER BY %s LIMIT 1", table, criteria, orderBy)

	row := db.QueryRowContext(ctx, query, args...)

	var jsonData []byte

	if err := row.Scan(&jsonData); err != nil {
		return nil, err
	}

	return jsonData, nil
}

// All retrieves all rows from the table that match the criteria.
func (db *DB) All(table string, criteria string, args []interface{}, orderBy string, limit int, page int) ([][]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := fmt.Sprintf("SELECT * FROM %s WHERE %s", table, criteria)

	if orderBy != "" {
		query = fmt.Sprintf(query+" ORDER BY %s", orderBy)
	}

	if limit > 0 {
		query = fmt.Sprintf(query+" LIMIT %d OFFSET %d", limit, page)
	}

	rows, err := db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results [][]byte
	var jsonData []byte

	for rows.Next() {
		if err := rows.Scan(&jsonData); err != nil {
			return nil, err
		}

		results = append(results, jsonData)
	}

	return results, nil
}

// Insert inserts a new record into the database.
func (db *DB) Insert(table string, data interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := fmt.Sprintf("INSERT INTO %s VALUES ($1)", table)

	_, err := db.ExecContext(ctx, query, data)
	if err != nil {
		return err
	}

	return nil
}

// Update updates a record in the database.
func (db *DB) Update(table string, criteria string, args []interface{}, data interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := fmt.Sprintf("UPDATE %s SET $1 WHERE %s", table, criteria)

	_, err := db.ExecContext(ctx, query, data)
	if err != nil {
		return err
	}

	return nil
}

// Delete deletes a record from the database.
func (db *DB) Delete(table string, criteria string, args []interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	query := fmt.Sprintf("DELETE FROM %s WHERE %s", table, criteria)

	_, err := db.ExecContext(ctx, query, args...)
	if err != nil {
		return err
	}

	return nil
}
