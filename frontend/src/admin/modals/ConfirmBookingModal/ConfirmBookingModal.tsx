import './ConfirmBookingModal.css'
import { AiOutlineClose } from 'react-icons/ai'
import ButtonMD from '../../../components/system/buttons/ButtonMD'
import { useContext } from 'react'
import BookingContext from '../../../context/BookingContext/BookingContext'

interface ConfirmBookingModalProps {
	onClose: () => void
	onConfirmBooking: () => void
}

const ConfirmBookingModal = ({
	onClose,
	onConfirmBooking,
}: ConfirmBookingModalProps) => {
	const {
		vehicleTypeSelected,
		serviceTypeSelected,
		dateTimeSelected,
		serviceCost,
	} = useContext(BookingContext)

	return (
		<div id="confirm-booking-modal">
			<div className="modal-container">
				<div className="modal-heading">
					<div className="modal-title">Confirm Booking</div>
					<AiOutlineClose
						size="26px"
						onClick={onClose}
						className="close-modal-button"
					/>
				</div>
				<div className="modal-body">
					<p>Are you sure you want to book?</p>
					<table>
						<tbody>
							<tr>
								<td>Vehicle Type</td>
								<td>{vehicleTypeSelected}</td>
							</tr>
							<tr>
								<td>Service Type</td>
								<td>{serviceTypeSelected}</td>
							</tr>
							<tr>
								<td>Date</td>
								<td>{dateTimeSelected}</td>
							</tr>
							<tr>
								<td>Time</td>
								<td>{dateTimeSelected}</td>
							</tr>
							<tr>
								<td>Service Cost</td>
								<td>{serviceCost}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="modal-footer">
					<ButtonMD bold={true} onClick={() => onClose()}>
						<span>No</span>
					</ButtonMD>
					<ButtonMD
						bgColor="var(--PrimaryColorLight)"
						bgColorHover="var(--primaryColorDark)"
						bold={true}
						onClick={() => onConfirmBooking()}
					>
						<span>Yes, Book!</span>
					</ButtonMD>
				</div>
			</div>
		</div>
	)
}

export default ConfirmBookingModal
