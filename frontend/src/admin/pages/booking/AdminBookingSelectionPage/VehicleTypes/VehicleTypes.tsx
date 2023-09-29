import './VehicleTypes.css'
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
		(vt) => `vt-${vt.id}` === vehicleTypeSelected
	)?.description

	return (
		<div id="admin-booking-vehicle-types">
			<div className="section-title">Vehicle Types</div>
			{isLoadingVehicleTypes ? (
				'Loading...'
			) : (
				<SelectListInline
					options={vehicleTypes}
					name="vt"
					className="vehicle-types-list"
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
