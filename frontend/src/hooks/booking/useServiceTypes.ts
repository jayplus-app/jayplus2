import { useState, useEffect } from 'react'

interface ServiceType {
	id: string
	name: string
	icon: string
	description: string
}

interface ServiceTypeResponse {
	name: string
	types: ServiceType[]
}

export const useServiceTypes = () => {
	const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
	const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(true)

	useEffect(() => {
		fetch('/api/booking/service-types')
			.then((response) => response.json())
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
