import './DayColumnBookingCards.css'
import { useBookings } from '../../../../hooks/booking/useBookings'
import { useContext, useEffect, useState } from 'react'
import BookingDetailsModal from '../../../../admin/modals/BookingDetailsModal'
import ConfirmCancelBookingModal from '../../../../admin/modals/ConfirmCancelBookingModal'
import BookingManagementContext from '../../../../context/BookingManagementContext/BookingManagementContext'

interface DayColumnBookingCardsProps {
	date: string
}

const DayColumnBookingCards = ({ date }: DayColumnBookingCardsProps) => {
	const { bookings, isLoadingBookings } = useBookings({
		selectedDate: date,
	})
	const { cancelBooking } = useContext(BookingManagementContext)

	const [showBookingDetailsModal, setShowBookingdetailsModal] =
		useState(false)
	const [showConfirmCancelBookingModal, setShowConfirmCancelBookingModal] =
		useState(false)
	const [bookingId, setBookingId] = useState<string>('')

	const handleBookingClick = (id: string) => {
		setBookingId(id)
		setShowBookingdetailsModal(true)
	}

	const handleCancelBooking = (id: string) => {
		setShowBookingdetailsModal(false)
		setShowConfirmCancelBookingModal(true)
	}

	const handleConfirmCancelBooking = (id: string) => {
		cancelBooking(id)
		setShowConfirmCancelBookingModal(false)
		setBookingId('')
	}

	return (
		<div>
			<ul id="card-list-block">
				{isLoadingBookings ? (
					<li>Loading...</li>
				) : (
					bookings?.map((booking) => (
						<li
							id="card-list-item"
							key={booking.Date + booking.Time}
							onClick={() => handleBookingClick(booking.ID)}
						>
							<span>{booking.Time}</span>
							<span>{booking.VehicleType}</span>
							<span>{booking.TypeOfService}</span>
						</li>
					))
				)}
			</ul>
			{showBookingDetailsModal && (
				<BookingDetailsModal
					bookingId={bookingId}
					onClose={() => {
						setShowBookingdetailsModal(false)
						setBookingId('')
					}}
					onCancelBooking={() => handleCancelBooking(bookingId)}
				/>
			)}
			{showConfirmCancelBookingModal && (
				<ConfirmCancelBookingModal
					bookingId={bookingId}
					onClose={() => {
						setShowConfirmCancelBookingModal(false)
						setBookingId('')
					}}
					onConfirmCancelBooking={() => {
						handleConfirmCancelBooking(bookingId)
					}}
				/>
			)}
		</div>
	)
}

export default DayColumnBookingCards
