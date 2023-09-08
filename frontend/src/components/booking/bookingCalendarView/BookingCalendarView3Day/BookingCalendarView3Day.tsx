import './BookingCalendarView3Day.css'
import { useContext, useEffect, useState } from 'react'
import { addDaysToDate, dateToNumber, todaysDate } from '../../../../utils'
import DayColumnSelectTime from '../DayColumnSelectTime'
import NextDayButton from '../NextDayButton'
import PreviousDayButton from '../PreviousDayButton'
import CustomerBookingContext from '../../../../context/CustomerBookingContext/CustomerBookingContext'
import CustomerUIContext from '../../../../context/UIContext/CustomerUIContext'

const BookingCalendarView3Day = () => {
	const { maxFutureBookingDays } = useContext(CustomerUIContext)
	const { setDateTimeSelected } = useContext(CustomerBookingContext)
	const [startDate, setStartDate] = useState<string>(todaysDate())

	useEffect(() => {
		console.log('BookingCalendarView3Day: startDate', startDate)
		setDateTimeSelected('')
	}, [startDate])

	return (
		<div id="booking-calendar-view-3-day">
			<PreviousDayButton
				onClick={() => setStartDate(addDaysToDate(startDate, -1))}
				disabled={dateToNumber(startDate) <= dateToNumber(todaysDate())}
			/>
			<div className="day-columns">
				<div>
					<h3>{startDate}</h3>
					<DayColumnSelectTime date={startDate} />
				</div>
				<div>
					<h3>{addDaysToDate(startDate, +1)}</h3>
					<DayColumnSelectTime date={addDaysToDate(startDate, +1)} />
				</div>
				<div>
					<h3>{addDaysToDate(startDate, +2)}</h3>
					<DayColumnSelectTime date={addDaysToDate(startDate, +2)} />
				</div>
			</div>
			<NextDayButton
				onClick={() => setStartDate(addDaysToDate(startDate, +1))}
				disabled={
					dateToNumber(startDate) >=
					dateToNumber(
						addDaysToDate(todaysDate(), +maxFutureBookingDays)
					)
				}
			/>
		</div>
	)
}

export default BookingCalendarView3Day
