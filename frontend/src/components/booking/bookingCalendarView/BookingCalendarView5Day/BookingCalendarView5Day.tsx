import './BookingCalendarView5Day.css'
import { useContext, useEffect, useState } from 'react'
import {
	addDaysToDate,
	dateToNumber,
	formatDateToRelativeOrMMMDDForm,
	todaysDate,
} from '../../../../utils'
import DayColumnSelectTime from '../DayColumnSelectTime'
import NextDayButton from '../NextDayButton'
import PreviousDayButton from '../PreviousDayButton'
import BookingContext from '../../../../context/BookingContext/BookingContext'
import CustomerConfigContext from '../../../../context/CustomerConfigContext/CustomerConfigContext'
import DayColumnBookingCards from '../DayColumnBookingCards'

interface BookingCalendarView5DayProps {
	type: 'view' | 'select'
}

const BookingCalendarView5Day = ({ type }: BookingCalendarView5DayProps) => {
	const { appConfig } = useContext(CustomerConfigContext)
	const { setDateTimeSelected } = useContext(BookingContext)
	const [startDate, setStartDate] = useState<string>(todaysDate())

	const dates = [
		startDate,
		addDaysToDate(startDate, +1),
		addDaysToDate(startDate, +2),
		addDaysToDate(startDate, +3),
		addDaysToDate(startDate, +4),
	]

	useEffect(() => {
		setDateTimeSelected('')
	}, [startDate])

	return (
		<div id="booking-calendar-view-3-day">
			<PreviousDayButton
				onClick={() => setStartDate(addDaysToDate(startDate, -1))}
				disabled={
					type === 'select' &&
					dateToNumber(startDate) <= dateToNumber(todaysDate())
				}
			/>

			<div id="day-columns">
				{dates.map((date) => (
					<div key={date}>
						<div className="day-column-title">
							{formatDateToRelativeOrMMMDDForm(
								date,
								todaysDate()
							)}
						</div>
						{type === 'select' ? (
							<DayColumnSelectTime date={date} />
						) : (
							<DayColumnBookingCards date={date} />
						)}
					</div>
				))}
			</div>

			<NextDayButton
				onClick={() => setStartDate(addDaysToDate(startDate, +1))}
				disabled={
					type === 'select' &&
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

BookingCalendarView5Day.defaultProps = {
	type: 'select',
}

export default BookingCalendarView5Day
