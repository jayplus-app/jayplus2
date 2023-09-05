import ButtonMD from '../../../../components/system/buttons/ButtonMD'
import ServiceTypes from './ServiceTypes'
import TimeSelection from './TimeSelection'
import VehicleTypes from './VehicleTypes'

const CustomerBookingSelectionPage = () => {
	return (
		<div>
			<VehicleTypes />
			<ServiceTypes />
			<TimeSelection />
			<p>Price 100$</p>
			<ButtonMD />
		</div>
	)
}

export default CustomerBookingSelectionPage
