import { useContext, useEffect, useState } from 'react'
import DescriptionField from '../../../../../components/booking/DescriptionField'
import SelectListInline from '../../../../../components/booking/SelectListInline'
import CustomerBookingContext from '../../../../../context/CustomerBookingContext/CustomerBookingContext'

interface VehicleType {
	id: string
	name: string
	icon: string
	description: string
}

interface VehicleTypeResponse {
	name: string
	types: VehicleType[]
}

const VehicleTypes = () => {
	const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { vehicleTypeSelected, setVehicleTypeSelected } = useContext(
		CustomerBookingContext
	)

	useEffect(() => {
		fetch('/api/booking/vehicle-types')
			.then((response) => response.json())
			.then((data: VehicleTypeResponse) => {
				setVehicleTypes(data.types)
				setIsLoading(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoading(false)
			})
	}, [])

	return (
		<div>
			<h2>Vehicle Types</h2>
			{isLoading ? (
				'Loading...'
			) : (
				<SelectListInline
					options={vehicleTypes}
					name="vehicle-types"
					select={(option) => setVehicleTypeSelected(option)}
				/>
			)}
			<DescriptionField />
		</div>
	)
}

export default VehicleTypes
