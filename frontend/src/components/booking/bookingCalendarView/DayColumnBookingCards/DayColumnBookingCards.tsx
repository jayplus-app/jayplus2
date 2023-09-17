import './DayColumnBookingCards.css'
import { useBookings } from '../../../../hooks/booking/useBookings'
import { useContext, useState } from 'react'
import BookingDetailsModal from '../../../../admin/modals/BookingDetailsModal'
import ConfirmCancelBookingModal from '../../../../admin/modals/ConfirmCancelBookingModal'
import { useCancelBooking } from '../../../../hooks/booking/useCancelBooking'
import BookingManagementContext from '../../../../context/BookingManagementContext/BookingManagementContext'
import { useBooking } from '../../../../hooks/booking/useBooking'

interface DayColumnBookingCardsProps {
	date: string
}

const DayColumnBookingCards = ({ date }: DayColumnBookingCardsProps) => {
	const { bookings, isLoadingBookings } = useBookings({
		selectedDate: date,
	})
	const { getBooking } = useBooking()
	const { cancelBooking } = useCancelBooking()
	const { bookingIdToCancel, setBookingIdToCancel } = useContext(
		BookingManagementContext
	)

	const [showBookingDetailsModal, setShowBookingdetailsModal] =
		useState(false)
	const [showConfirmCancelBookingModal, setShowConfirmCancelBookingModal] =
		useState(false)

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
							onClick={() => {
								getBooking(booking.ID)
								setBookingIdToCancel(booking.ID)
								setShowBookingdetailsModal(true)
							}}
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
					onClose={() => {
						setShowBookingdetailsModal(false)
						setBookingIdToCancel('')
					}}
					onCancelBooking={() => {
						setShowBookingdetailsModal(false)
						setShowConfirmCancelBookingModal(true)
					}}
				/>
			)}
			{showConfirmCancelBookingModal && (
				<ConfirmCancelBookingModal
					onClose={() => {
						setShowConfirmCancelBookingModal(false)
						setBookingIdToCancel('')
					}}
					onConfirmCancelBooking={() => {
						cancelBooking(bookingIdToCancel || '-1')
						setShowConfirmCancelBookingModal(false)
						setBookingIdToCancel('')
					}}
				/>
			)}
		</div>
	)
}

export default DayColumnBookingCards
