import './ConfirmCancelBookingModal.css'
import { useCancelBooking } from '../../../hooks/booking/useCancelBooking'
import { AiOutlineClose } from 'react-icons/ai'
import ButtonMD from '../../../components/system/buttons/ButtonMD'

interface ConfirmCancelBookingModalProps {
	bookingId: string
	onClose: () => void
	onConfirmCancelBooking: (bookingId: string) => void
}

const ConfirmCancelBookingModal = ({
	bookingId,
	onClose,
	onConfirmCancelBooking,
}: ConfirmCancelBookingModalProps) => {
	return (
		<div id="confirm-cancel-booking-modal">
			<div className="modal-container">
				<div className="modal-heading">
					<div className="modal-title">Confirm Cancel Booking</div>
					<AiOutlineClose
						size="26px"
						onClick={onClose}
						className="close-modal-button"
					/>
				</div>
				<div className="modal-body">
					<p>Are you sure you want to cancel this booking?</p>
				</div>
				<div className="modal-footer">
					<ButtonMD bold={true} onClick={() => onClose()}>
						<span>No</span>
					</ButtonMD>
					<ButtonMD
						bgColor="var(--dangerColorDark)"
						bgColorHover="var(--dangerColorDarker)"
						color="white"
						bold={true}
						onClick={() => onConfirmCancelBooking(bookingId)}
					>
						<span>Yes, Cancel!</span>
					</ButtonMD>
				</div>
			</div>
		</div>
	)
}

export default ConfirmCancelBookingModal
