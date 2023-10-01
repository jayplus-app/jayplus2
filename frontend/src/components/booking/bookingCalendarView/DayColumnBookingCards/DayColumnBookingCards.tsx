import './DayColumnBookingCards.css'
import { useBookings } from '../../../../hooks/booking/useBookings'
import { useContext, useEffect, useState } from 'react'
import BookingDetailsModal from '../../../../admin/modals/BookingDetailsModal'
import ConfirmCancelBookingModal from '../../../../admin/modals/ConfirmCancelBookingModal'
import { useCancelBooking } from '../../../../hooks/booking/useCancelBooking'
import BookingManagementContext, {
	Bookings,
} from '../../../../context/BookingManagementContext/BookingManagementContext'
import {
	extractDateFromISOString,
	extractTimeFromISOString,
} from '../../../../utils'

interface DayColumnBookingCardsProps {
	date: string
}

const DayColumnBookingCards = ({ date }: DayColumnBookingCardsProps) => {
	const { getBookings } = useBookings()
	const [bookings, setBookings] = useState<Bookings[] | null>(null)
	const [isLoadingBookings, setIsLoadingBookings] = useState(true)

	const { cancelBooking } = useCancelBooking()
	const {
		bookingIdToCancel,
		setBookingIdToCancel,
		setIsCanceled,
		setIsCanceling,
	} = useContext(BookingManagementContext)

	const [showBookingDetailsModal, setShowBookingdetailsModal] =
		useState(false)
	const [showConfirmCancelBookingModal, setShowConfirmCancelBookingModal] =
		useState(false)

	useEffect(() => {
		getBookings(date)
			.then((fetchedBookings) => {
				setBookings(fetchedBookings)
			})
			.catch((error) => {
				console.error(error)
			})
			.finally(() => {
				setIsLoadingBookings(false)
			})
	}, [date])

	return (
		<div>
			<ul id="card-list-block">
				{isLoadingBookings ? (
					<li>Loading...</li>
				) : (
					bookings?.map((booking) => (
						<li
							id="card-list-item"
							key={extractDateFromISOString(booking.datetime)}
							onClick={() => {
								setBookingIdToCancel(booking.id)
								setShowBookingdetailsModal(true)
							}}
						>
							<span>
								{extractTimeFromISOString(booking.datetime)}
							</span>
							<span>{booking.vehicleType}</span>
							<span>{booking.serviceType}</span>
						</li>
					))
				)}
			</ul>
			{showBookingDetailsModal && (
				<BookingDetailsModal
					bookingID={bookingIdToCancel || -1}
					onClose={() => {
						setShowBookingdetailsModal(false)
						setBookingIdToCancel(0)
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
						setBookingIdToCancel(0)
					}}
					onConfirmCancelBooking={() => {
						setIsCanceling(true)
						cancelBooking(bookingIdToCancel || -1)
							.then(() => {
								setIsCanceled(true)
							})
							.catch(() => {
								setIsCanceled(false)
							})
							.finally(() => {
								setIsCanceling(false)
							})
						setShowConfirmCancelBookingModal(false)
						setBookingIdToCancel(0)
					}}
				/>
			)}
		</div>
	)
}

export default DayColumnBookingCards
