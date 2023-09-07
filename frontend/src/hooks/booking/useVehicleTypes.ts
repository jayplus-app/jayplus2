import { useState, useEffect } from 'react'

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

export const useVehicleTypes = () => {
	const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([])
	const [isLoadingVehicleTypes, setIsLoadingVehicleTypes] = useState(true)

	useEffect(() => {
		fetch('/api/booking/vehicle-types')
			.then((response) => response.json())
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
