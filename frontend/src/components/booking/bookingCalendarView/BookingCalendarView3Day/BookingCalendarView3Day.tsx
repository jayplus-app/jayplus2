import './BookingCalendarView3Day.css'
import { useContext, useEffect, useState } from 'react'
import { addDaysToDate, dateToNumber, todaysDate } from '../../../../utils'
import DayColumnSelectTime from '../DayColumnSelectTime'
import NextDayButton from '../NextDayButton'
import PreviousDayButton from '../PreviousDayButton'
import CustomerBookingContext from '../../../../context/CustomerBookingContext/CustomerBookingContext'
import CustomerConfigContext from '../../../../context/CustomerConfigContext/CustomerConfigContext'

const BookingCalendarView3Day = () => {
	const { appConfig } = useContext(CustomerConfigContext)
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

			<div id="day-columns">
				<div>
					<div className="day-column-title">{startDate}</div>
					<DayColumnSelectTime date={startDate} />
				</div>
				<div>
					<div className="day-column-title">
						{addDaysToDate(startDate, +1)}
					</div>
					<DayColumnSelectTime date={addDaysToDate(startDate, +1)} />
				</div>
				<div>
					<div className="day-column-title">
						{addDaysToDate(startDate, +2)}
					</div>
					<DayColumnSelectTime date={addDaysToDate(startDate, +2)} />
				</div>
			</div>

			<NextDayButton
				onClick={() => setStartDate(addDaysToDate(startDate, +1))}
				disabled={
					dateToNumber(startDate) >=
					dateToNumber(
						addDaysToDate(
							todaysDate(),
							+appConfig.maxFutureBookingDays
						)
					)
				}
			/>
		</div>
	)
}

export default BookingCalendarView3Day
