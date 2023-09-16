import { useContext, useEffect, useState } from 'react'
import BookingCalendarView3Day from '../../../../components/booking/bookingCalendarView/BookingCalendarView3Day'
import BookingCalendarView5Day from '../../../../components/booking/bookingCalendarView/BookingCalendarView5Day'
import './BookingManagementPage.css'
import SystemContext from '../../../../context/SystemContext/SystemContext'
import BookingManagementContext from '../../../../context/BookingManagementContext/BookingManagementContext'
import { FaXmark } from 'react-icons/fa6'

const BookingManagementPage = () => {
	const { cancelMessage, isCanceled } = useContext(BookingManagementContext)
	const { windowWidth } = useContext(SystemContext)
	const [showMessage, setShowMessage] = useState(true)

	useEffect(() => {
		setShowMessage(true)
		if (cancelMessage && showMessage) {
			const timer = setTimeout(() => {
				setShowMessage(false)
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [cancelMessage])

	return (
		<div id="booking-management-page">
			{cancelMessage && showMessage && (
				<div
					className={`cancel-message ${
						isCanceled ? 'success' : 'fail'
					}`}
				>
					<span>{cancelMessage}</span>
					<FaXmark
						size="20px"
						className={`cancel-message-icon ${
							isCanceled ? 'success' : 'fail'
						}`}
						onClick={() => setShowMessage(false)}
					/>
				</div>
			)}
			<div className="page-title">Bookings</div>
			{windowWidth <= 1000 ? (
				<BookingCalendarView3Day type="view" />
			) : (
				<BookingCalendarView5Day type="view" />
			)}
		</div>
	)
}

export default BookingManagementPage
