import { useContext } from 'react'
import BookingCalendarView3Day from '../../../../../components/booking/bookingCalendarView/BookingCalendarView3Day'
import BookingCalendarView5Day from '../../../../../components/booking/bookingCalendarView/BookingCalendarView5Day'
import SystemContext from '../../../../../context/SystemContext/SystemContext'

const TimeSelection = () => {
	const { windowWidth } = useContext(SystemContext)

	return (
		<div>
			<div>Time Selection</div>
			{windowWidth <= 1000 ? (
				<BookingCalendarView3Day />
			) : (
				<BookingCalendarView5Day />
			)}
		</div>
	)
}

export default TimeSelection
