package common

import "backend/models"

type AppDBInterface interface {
	GetUIConfig() (*models.UIConfig, error)
}
