import './AdminBookingSelectionPage.css'
import ButtonMD from '../../../../components/system/buttons/ButtonMD'
import ServiceTypes from './ServiceTypes'
import TimeSelection from './TimeSelection'
import VehicleTypes from './VehicleTypes'
import BookingContext from '../../../../context/BookingContext/BookingContext'
import { useContext, useEffect, useState } from 'react'
import ConfirmBookingModal from '../../../modals/ConfirmBookingModal'
import { useCreateBooking } from '../../../../hooks/booking/useCreateBooking'
import { FaXmark } from 'react-icons/fa6'

const AdminBookingSelectionPage = () => {
	const {
		serviceCost,
		vehicleTypeSelected,
		serviceTypeSelected,
		dateTimeSelected,
	} = useContext(BookingContext)

	const { bookingNumber, isLoadingCreateBooking, createBooking } =
		useCreateBooking()

	const [showConfirmBookingModal, setShowConfirmBookingModal] =
		useState(false)
	const [
		showConfirmCreateBookingMessage,
		setShowConfirmCreateBookingMessage,
	] = useState(false)

	const isDisabled =
		dateTimeSelected === '' ||
		vehicleTypeSelected === '' ||
		serviceTypeSelected === ''

	const handleConfirmBooking = (
		vehicleTypeSelected: string,
		serviceTypeSelected: string,
		dateTimeSelected: string
	) => {
		setShowConfirmBookingModal(false)
		createBooking(
			vehicleTypeSelected,
			serviceTypeSelected,
			dateTimeSelected
		)
		setShowConfirmCreateBookingMessage(true)
	}

	return (
		<div id="admin-booking-selection-page">
			{showConfirmCreateBookingMessage && (
				<div className="confirm-create-booking-message">
					{isLoadingCreateBooking ? (
						<div>Creating booking...</div>
					) : (
						<div
							className={`confirm-message ${
								bookingNumber ? 'success' : 'fail'
							}`}
						>
							{bookingNumber ? (
								<span>
									Booking created successfully. Booking
									number: {bookingNumber}
								</span>
							) : (
								<span>Booking failed to create.</span>
							)}
							<FaXmark
								size="20px"
								className={`confirm-message-icon ${
									bookingNumber ? 'success' : 'fail'
								}`}
								onClick={() =>
									setShowConfirmCreateBookingMessage(false)
								}
							/>
						</div>
					)}
				</div>
			)}
			<VehicleTypes />
			<ServiceTypes />
			<TimeSelection />
			<div id="footer">
				<div>Price {serviceCost}$</div>
				<div className="footer-button">
					<ButtonMD
						onClick={() => {
							setShowConfirmBookingModal(true)
						}}
						bgColor="var(--primaryColorLight)"
						bgColorHover="var(--primaryColorDark)"
						disabled={isDisabled}
					>
						Payment
					</ButtonMD>
				</div>
			</div>
			{showConfirmBookingModal && (
				<ConfirmBookingModal
					onClose={() => {
						setShowConfirmBookingModal(false)
					}}
					onConfirmBooking={() => {
						handleConfirmBooking(
							vehicleTypeSelected,
							serviceTypeSelected,
							dateTimeSelected
						)
					}}
				/>
			)}
		</div>
	)
}

export default AdminBookingSelectionPage
