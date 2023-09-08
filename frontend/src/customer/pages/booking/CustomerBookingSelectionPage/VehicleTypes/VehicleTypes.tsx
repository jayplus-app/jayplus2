import { useContext } from 'react'
import DescriptionField from '../../../../../components/booking/DescriptionField'
import SelectListInline from '../../../../../components/booking/SelectListInline'
import CustomerBookingContext from '../../../../../context/CustomerBookingContext/CustomerBookingContext'

const VehicleTypes = () => {
	const {
		vehicleTypeSelected,
		setVehicleTypeSelected,
		vehicleTypes,
		isLoadingVehicleTypes,
	} = useContext(CustomerBookingContext)

	const selectedDescription = vehicleTypes.find(
		(vt) => vt.id === vehicleTypeSelected
	)?.description

	return (
		<div>
			<h2>Vehicle Types</h2>
			{isLoadingVehicleTypes ? (
				'Loading...'
			) : (
				<SelectListInline
					options={vehicleTypes}
					name="vehicle-types"
					select={(option) => setVehicleTypeSelected(option)}
				/>
			)}
			<DescriptionField
				content={selectedDescription || 'No description available'}
			/>
		</div>
	)
}

export default VehicleTypes
