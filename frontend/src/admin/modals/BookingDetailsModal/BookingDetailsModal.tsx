import './BookingDetailsModal.css'
import { AiOutlineClose } from 'react-icons/ai'
import { FaTrashCan } from 'react-icons/fa6'
import ButtonMD from '../../../components/system/buttons/ButtonMD'
import { useEffect, useState } from 'react'
import { Booking } from '../../../context/BookingManagementContext/BookingManagementContext'
import { useBooking } from '../../../hooks/booking/useBooking'
import {
	extractDateFromISOString,
	extractTimeFromISOString,
} from '../../../utils'

interface BookingDetailsModalProps {
	bookingID: number
	onClose: () => void
	onCancelBooking: () => void
}

const BookingDetailsModal = ({
	bookingID,
	onClose,
	onCancelBooking,
}: BookingDetailsModalProps) => {
	const [booking, setBooking] = useState<Booking | null>(null)
	const [isLoadingBookingDetails, setIsLoadingBookingDetails] = useState(true)

	const { getBooking } = useBooking()

	useEffect(() => {
		getBooking(bookingID)
			.then((booking) => {
				setBooking(booking)
			})
			.catch((error) => {
				console.error(error)
			})
			.finally(() => {
				setIsLoadingBookingDetails(false)
			})
	})

	return (
		<div id="booking-details-modal">
			<div className="modal-container">
				<div className="modal-heading">
					<div className="modal-title">Booking Details</div>
					<AiOutlineClose
						size="26px"
						onClick={onClose}
						className="close-modal-button"
					/>
				</div>
				<div className="booking-table">
					{isLoadingBookingDetails ? (
						<p>Loading...</p>
					) : booking ? (
						<table>
							<tbody>
								<tr>
									<td>ID</td>
									<td>{booking.id}</td>
								</tr>
								<tr>
									<td>User ID</td>
									<td>{booking.userID}</td>
								</tr>
								<tr>
									<td>Vehicle Type</td>
									<td>{booking.vehicleType}</td>
								</tr>
								<tr>
									<td>Service Type</td>
									<td>{booking.serviceType}</td>
								</tr>
								<tr>
									<td>Date</td>
									<td>
										{extractDateFromISOString(
											booking.datetime
										)}
									</td>
								</tr>
								<tr>
									<td>Time</td>
									<td>
										{extractTimeFromISOString(
											booking.datetime
										)}
									</td>
								</tr>
								<tr>
									<td>Cost</td>
									<td>{booking.cost}</td>
								</tr>
								<tr>
									<td>Discount</td>
									<td>{booking.discount}</td>
								</tr>
								<tr>
									<td>Deposit</td>
									<td>{booking.deposit}</td>
								</tr>
								<tr>
									<td>Bill Number</td>
									<td>{booking.billNumber}</td>
								</tr>
								<tr>
									<td>Status</td>
									<td>{booking.status}</td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>Booking not found</p>
					)}
				</div>
				<div className="modal-footer">
					<ButtonMD
						bgColor="var(--dangerColorDark)"
						bgColorHover="var(--dangerColorDarker)"
						color="white"
						bold={true}
						onClick={() => onCancelBooking()}
					>
						<span>Cancel Booking</span>
						<FaTrashCan size="21px" />
					</ButtonMD>
				</div>
			</div>
		</div>
	)
}

export default BookingDetailsModal
