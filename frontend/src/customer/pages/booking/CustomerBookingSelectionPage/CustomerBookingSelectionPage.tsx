import './CustomerBookingSelectionPage.css'
import ButtonMD from '../../../../components/system/buttons/ButtonMD'
import ServiceTypes from './ServiceTypes'
import TimeSelection from './TimeSelection'
import VehicleTypes from './VehicleTypes'
import { useNavigate } from 'react-router-dom'
import BookingContext from '../../../../context/BookingContext/BookingContext'
import { useContext } from 'react'
import { centsToDollars } from '../../../../utils/currencyUtils'

const CustomerBookingSelectionPage = () => {
	const {
		serviceCost,
		vehicleTypeSelected,
		serviceTypeSelected,
		dateTimeSelected,
	} = useContext(BookingContext)

	const isDisabled =
		dateTimeSelected === '' ||
		vehicleTypeSelected === '' ||
		serviceTypeSelected === ''

	const navigate = useNavigate()

	const formattedServiceCost = centsToDollars(serviceCost)

	return (
		<div id="customer-booking-selection-page">
			<VehicleTypes />
			<ServiceTypes />
			<TimeSelection />
			<div id="footer">
				<div>Price ${formattedServiceCost}</div>
				<div className="footer-button">
					<ButtonMD
						onClick={() => {
							navigate('/payment')
						}}
						bgColor="var(--primaryColorLight)"
						bgColorHover="var(--primaryColorDark)"
						disabled={isDisabled}
					>
						Payment
					</ButtonMD>
				</div>
			</div>
		</div>
	)
}

export default CustomerBookingSelectionPage
