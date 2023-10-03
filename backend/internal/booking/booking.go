package booking

import (
	"backend/contracts/db"
	"backend/models"
	"time"
)

// GetBookingTimeslots retrieves all booking timeslots.
func GetBookingTimeslots(db db.DBInterface, businessID int, serviceTypeID int, vehicleTypeID int, date time.Time) ([]*models.TimeSlot, error) {
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
