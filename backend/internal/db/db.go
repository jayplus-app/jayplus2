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

func ExecuteQuery(db *sql.DB, query string, args ...any) (*sql.Row, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbConnectTimeout*time.Second)
	defer cancel()

	row := db.QueryRowContext(ctx, query, args...)
	return row, nil
}