import { useContext } from 'react'
import BookingCalendarView3Day from '../../../../components/booking/bookingCalendarView/BookingCalendarView3Day'
import BookingCalendarView5Day from '../../../../components/booking/bookingCalendarView/BookingCalendarView5Day'
import './BookingManagementPage.css'
import SystemContext from '../../../../context/SystemContext/SystemContext'

const BookingManagementPage = () => {
	const { windowWidth } = useContext(SystemContext)

	return (
		<div>
			<div>Time Selection</div>
			{windowWidth <= 1000 ? (
				<BookingCalendarView3Day type="view" />
			) : (
				<BookingCalendarView5Day type="view" />
			)}
		</div>
	)
}

export default BookingManagementPage
