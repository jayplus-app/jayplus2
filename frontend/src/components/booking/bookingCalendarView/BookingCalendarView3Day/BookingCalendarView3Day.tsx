import DayColumnSelectTime from '../DayColumnSelectTime'
import NextDayButton from '../NextDayButton'
import PreviousDayButton from '../PreviousDayButton'

const BookingCalendarView3Day = () => {
	return (
		<div>
			<h1>BookingCalendarView3Day</h1>
			<PreviousDayButton />
			<div>
				<h3>Day 1</h3>
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
			</div>
			<div>
				<h3>Day 2</h3>
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
			</div>
			<div>
				<h3>Day 3</h3>
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
				<DayColumnSelectTime />
			</div>
			<NextDayButton />
		</div>
	)
}

export default BookingCalendarView3Day
