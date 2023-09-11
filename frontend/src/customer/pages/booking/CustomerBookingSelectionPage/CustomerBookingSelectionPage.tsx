import './CustomerBookingSelectionPage.css'
import ButtonMD from '../../../../components/system/buttons/ButtonMD'
import ServiceTypes from './ServiceTypes'
import TimeSelection from './TimeSelection'
import VehicleTypes from './VehicleTypes'
import { useNavigate } from 'react-router-dom'

const CustomerBookingSelectionPage = () => {
	const navigate = useNavigate()

	return (
		<div id="customer-booking-selection-page">
			<VehicleTypes />
			<ServiceTypes />
			<TimeSelection />
			<div id="footer">
				<div>Price 100$</div>
				<div className="footer-button">
					<ButtonMD
						onClick={() => {
							navigate('/payment')
						}}
						bgColor="var(--primaryColorLight)"
						bgColorHover="var(--primaryColorDark)"
					>
						Payment
					</ButtonMD>
				</div>
			</div>
		</div>
	)
}

export default CustomerBookingSelectionPage
