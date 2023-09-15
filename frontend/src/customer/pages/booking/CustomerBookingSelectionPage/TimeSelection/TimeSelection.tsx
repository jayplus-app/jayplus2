import { useContext } from 'react'
import BookingCalendarView3Day from '../../../../../components/booking/bookingCalendarView/BookingCalendarView3Day'
import SystemContext from '../../../../../context/SystemContext/SystemContext'
import BookingCalendarView5Day from '../../../../../components/booking/bookingCalendarView/BookingCalendarView5Day'

const TimeSelection = () => {
	const { windowWidth } = useContext(SystemContext)

	return (
		<div>
			<div>Time Selection</div>
			{windowWidth <= 800 ? (
				<BookingCalendarView3Day />
			) : (
				<BookingCalendarView5Day />
			)}
		</div>
	)
}

export default TimeSelection
