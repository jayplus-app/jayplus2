import { useContext } from 'react'
import DescriptionField from '../../../../../components/booking/DescriptionField'
import SelectListInline from '../../../../../components/booking/SelectListInline'
import BookingContext from '../../../../../context/BookingContext/BookingContext'

const VehicleTypes = () => {
	const {
		vehicleTypeSelected,
		setVehicleTypeSelected,
		vehicleTypes,
		isLoadingVehicleTypes,
	} = useContext(BookingContext)

	const selectedDescription = vehicleTypes.find(
		(vt) => vt.id === vehicleTypeSelected
	)?.description

	return (
		<div>
			<div>Vehicle Types</div>
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
