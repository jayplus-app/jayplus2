package app

import (
	"backend/models"
	"encoding/json"
)

func (app *App) GetBusinessUIConfigByID(businessID int) (*models.UIConfig, error) {
	var uiConfig models.UIConfig

	args := []interface{}{businessID, "ui-config"}

	jsonData, err := app.DB.First("business_config", "business_id = $1 AND key = $2", args, "")
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(jsonData, &uiConfig); err != nil {
		return nil, err
	}

	return &uiConfig, nil
}

func (app *App) GetBusinessBookingConfigByID(businessID int) (*models.BookingConfig, error) {
	var bookingConfig models.BookingConfig

	args := []interface{}{businessID, "booking-config"}

	jsonResults, err := app.DB.First("business_config", "business_id = $1 AND key = 'booking-config'", args, "")
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(jsonResults, &bookingConfig); err != nil {
		return nil, err
	}

	return &bookingConfig, nil
}

func (app *App) GetAllBusinesses() ([]*models.Business, error) {
	var businesses []*models.Business

	jsonBusinesses, err := app.DB.All("businesses", "", nil, "", 0, 0)
	if err != nil {
		return nil, err
	}

	for _, jsonBusiness := range jsonBusinesses {
		var business models.Business

		if err := json.Unmarshal(jsonBusiness, &business); err != nil {
			return nil, err
		}

		businesses = append(businesses, &business)
	}

	return businesses, nil
}

func (app *App) CreateBusiness(business *models.Business) error {
	return app.DB.Insert("businesses", business)
}

func (app *App) UpdateBusiness(business *models.Business) error {
	args := []interface{}{business.ID}

	return app.DB.Update("businesses", "id = $1", args, business)
}

func (app *App) DeleteBusiness(businessID int) error {
	args := []interface{}{businessID}

	return app.DB.Delete("businesses", "id = $1", args)
}
