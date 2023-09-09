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
				<ButtonMD
					onClick={() => {
						navigate('/payment')
					}}
				>
					Payment
				</ButtonMD>
			</div>
		</div>
	)
}

export default CustomerBookingSelectionPage
