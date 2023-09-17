import './BookingDetailsModal.css'
import { AiOutlineClose } from 'react-icons/ai'
import { FaTrashCan } from 'react-icons/fa6'
import ButtonMD from '../../../components/system/buttons/ButtonMD'
import { useEffect, useState } from 'react'
import { Booking } from '../../../context/BookingManagementContext/BookingManagementContext'
import { useBooking } from '../../../hooks/booking/useBooking'

interface BookingDetailsModalProps {
	bookingID: string
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
				console.error('Error fetching booking:', error)
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
					) : (
						<table>
							<tbody>
								<tr>
									<td>ID</td>
									<td>{booking?.ID}</td>
								</tr>
								<tr>
									<td>Transaction Number</td>
									<td>{booking?.TransactionNumber}</td>
								</tr>
								<tr>
									<td>Bill Number</td>
									<td>{booking?.BillNumber}</td>
								</tr>
								<tr>
									<td>Type of Service</td>
									<td>{booking?.TypeOfService}</td>
								</tr>
								<tr>
									<td>Vehicle Type</td>
									<td>{booking?.VehicleType}</td>
								</tr>
								<tr>
									<td>Date</td>
									<td>{booking?.Date}</td>
								</tr>
								<tr>
									<td>Time</td>
									<td>{booking?.Time}</td>
								</tr>
								<tr>
									<td>Service Cost</td>
									<td>{booking?.ServiceCost}</td>
								</tr>
								<tr>
									<td>Discount</td>
									<td>{booking?.Discount}</td>
								</tr>
								<tr>
									<td>Total</td>
									<td>{booking?.Total}</td>
								</tr>
								<tr>
									<td>Deposit</td>
									<td>{booking?.Deposit}</td>
								</tr>
								<tr>
									<td>Remaining</td>
									<td>{booking?.Remaining}</td>
								</tr>
							</tbody>
						</table>
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
