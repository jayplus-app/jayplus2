import { useState, useEffect } from 'react'
import { apiGet } from '../../utils/apiUtils'

export interface VehicleType {
	id: string
	businessId: string
	name: string
	icon: string
	description: string
	position: number
}

export const useVehicleTypes = () => {
	const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([])
	const [isLoadingVehicleTypes, setIsLoadingVehicleTypes] = useState(true)

	useEffect(() => {
		apiGet('/api/booking/vehicle-types')
			.then((data: VehicleType[]) => {
				const sortedVehicleTypes = data.sort(
					(a, b) => a.position - b.position
				)
				setVehicleTypes(sortedVehicleTypes)
				setIsLoadingVehicleTypes(false)
			})
			.catch((error) => {
				console.error(error)
				setIsLoadingVehicleTypes(false)
			})
	}, [])

	return { vehicleTypes, isLoadingVehicleTypes }
}
