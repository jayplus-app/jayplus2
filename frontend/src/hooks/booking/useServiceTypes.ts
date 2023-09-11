import { useState, useEffect } from 'react'
import { apiGet } from '../../utils/apiUtils'

export interface ServiceType {
	id: string
	name: string
	icon: string
	description: string
}

export interface ServiceTypeResponse {
	name: string
	types: ServiceType[]
}

export const useServiceTypes = () => {
	const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
	const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(true)

	useEffect(() => {
		apiGet('/api/booking/service-types')
			.then((data: ServiceTypeResponse) => {
				setServiceTypes(data.types)
				setIsLoadingServiceTypes(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoadingServiceTypes(false)
			})
	}, [])

	return { serviceTypes, isLoadingServiceTypes }
}
