package db

import "backend/contracts/auth"

type DBInterface interface {
	SetupDB() error
	auth.AuthDBInterface
}