import './BookingDetailsModal.css'
import { AiOutlineClose } from 'react-icons/ai'
import { FaTrashCan } from 'react-icons/fa6'
import ButtonMD from '../../../components/system/buttons/ButtonMD'
import { useContext, useEffect } from 'react'
import BookingManagementContext from '../../../context/BookingManagementContext/BookingManagementContext'

interface BookingDetailsModalProps {
	onClose: () => void
	onCancelBooking: () => void
}

const BookingDetailsModal = ({
	onClose,
	onCancelBooking,
}: BookingDetailsModalProps) => {
	const { isLoadingBooking, bookingSelected } = useContext(
		BookingManagementContext
	)

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
					{isLoadingBooking ? (
						<p>Loading...</p>
					) : (
						<table>
							<tbody>
								<tr>
									<td>ID</td>
									<td>{bookingSelected?.ID}</td>
								</tr>
								<tr>
									<td>Transaction Number</td>
									<td>
										{bookingSelected?.TransactionNumber}
									</td>
								</tr>
								<tr>
									<td>Bill Number</td>
									<td>{bookingSelected?.BillNumber}</td>
								</tr>
								<tr>
									<td>Type of Service</td>
									<td>{bookingSelected?.TypeOfService}</td>
								</tr>
								<tr>
									<td>Vehicle Type</td>
									<td>{bookingSelected?.VehicleType}</td>
								</tr>
								<tr>
									<td>Date</td>
									<td>{bookingSelected?.Date}</td>
								</tr>
								<tr>
									<td>Time</td>
									<td>{bookingSelected?.Time}</td>
								</tr>
								<tr>
									<td>Service Cost</td>
									<td>{bookingSelected?.ServiceCost}</td>
								</tr>
								<tr>
									<td>Discount</td>
									<td>{bookingSelected?.Discount}</td>
								</tr>
								<tr>
									<td>Total</td>
									<td>{bookingSelected?.Total}</td>
								</tr>
								<tr>
									<td>Deposit</td>
									<td>{bookingSelected?.Deposit}</td>
								</tr>
								<tr>
									<td>Remaining</td>
									<td>{bookingSelected?.Remaining}</td>
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
