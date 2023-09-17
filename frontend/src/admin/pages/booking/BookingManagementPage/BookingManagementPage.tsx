import { useContext, useEffect, useState } from 'react'
import BookingCalendarView3Day from '../../../../components/booking/bookingCalendarView/BookingCalendarView3Day'
import BookingCalendarView5Day from '../../../../components/booking/bookingCalendarView/BookingCalendarView5Day'
import './BookingManagementPage.css'
import SystemContext from '../../../../context/SystemContext/SystemContext'
import { FaXmark } from 'react-icons/fa6'
import BookingManagementContext from '../../../../context/BookingManagementContext/BookingManagementContext'

const BookingManagementPage = () => {
	const { windowWidth } = useContext(SystemContext)
	const [showMessage, setShowMessage] = useState(false)
	const [cancelMessage, setCancelMessage] = useState<string>('')
	const { isCanceled, setIsCanceled, setIsCanceling, bookingIdToCancel } =
		useContext(BookingManagementContext)

	useEffect(() => {
		if (isCanceled === null) return

		setCancelMessage(
			isCanceled
				? `Booking has been successfully canceled.`
				: `Failed to cancel booking.`
		)
		setShowMessage(true)

		setTimeout(() => {
			setIsCanceling(null)
			setIsCanceled(null)
			setShowMessage(false)
		}, 3000)
	}, [isCanceled])

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
