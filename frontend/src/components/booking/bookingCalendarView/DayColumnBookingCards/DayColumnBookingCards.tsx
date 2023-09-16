import './DayColumnBookingCards.css'
import { useBookings } from '../../../../hooks/booking/useBookings'
import { useContext, useState } from 'react'
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
	const { cancelBooking, bookingIdToCancel, setBookingIdToCancel } =
		useContext(BookingManagementContext)

	const [showBookingDetailsModal, setShowBookingdetailsModal] =
		useState(false)
	const [showConfirmCancelBookingModal, setShowConfirmCancelBookingModal] =
		useState(false)

	const handleBookingClick = (id: string) => {
		setBookingIdToCancel(id)
		setShowBookingdetailsModal(true)
	}

	const handleCancelBooking = (id: string) => {
		setShowBookingdetailsModal(false)
		setShowConfirmCancelBookingModal(true)
	}

	const handleConfirmCancelBooking = (id: string) => {
		cancelBooking(id)
		setShowConfirmCancelBookingModal(false)
		setBookingIdToCancel('')
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
					bookingId={bookingIdToCancel}
					onClose={() => {
						setShowBookingdetailsModal(false)
						setBookingIdToCancel('')
					}}
					onCancelBooking={() =>
						handleCancelBooking(bookingIdToCancel)
					}
				/>
			)}
			{showConfirmCancelBookingModal && (
				<ConfirmCancelBookingModal
					bookingId={bookingIdToCancel}
					onClose={() => {
						setShowConfirmCancelBookingModal(false)
						setBookingIdToCancel('')
					}}
					onConfirmCancelBooking={() => {
						handleConfirmCancelBooking(bookingIdToCancel)
					}}
				/>
			)}
		</div>
	)
}

export default DayColumnBookingCards
