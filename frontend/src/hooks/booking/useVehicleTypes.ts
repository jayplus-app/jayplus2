import { useState, useEffect } from 'react'
import { apiGet } from '../../utils/apiUtils'

export interface VehicleType {
	id: string
	name: string
	icon: string
	description: string
}

export interface VehicleTypeResponse {
	name: string
	types: VehicleType[]
}

export const useVehicleTypes = () => {
	const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([])
	const [isLoadingVehicleTypes, setIsLoadingVehicleTypes] = useState(true)

	useEffect(() => {
		apiGet('/api/booking/vehicle-types')
			.then((data: VehicleTypeResponse) => {
				setVehicleTypes(data.types)
				setIsLoadingVehicleTypes(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoadingVehicleTypes(false)
			})
	}, [])

	return { vehicleTypes, isLoadingVehicleTypes }
}
