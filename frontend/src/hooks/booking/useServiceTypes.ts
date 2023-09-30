import { useState, useEffect } from 'react'
import { apiGet } from '../../utils/apiUtils'

export interface ServiceType {
	id: string
	businessId: string
	name: string
	icon: string
	description: string
	position: number
}

export const useServiceTypes = () => {
	const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
	const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(true)

	useEffect(() => {
		apiGet('/api/booking/service-types')
			.then((data: ServiceType[]) => {
				const sortedServiceTypes = data.sort(
					(a, b) => a.position - b.position
				)
				setServiceTypes(sortedServiceTypes)
				setIsLoadingServiceTypes(false)
			})
			.catch((error) => {
				console.error(error)
				setIsLoadingServiceTypes(false)
			})
	}, [])

	return { serviceTypes, isLoadingServiceTypes }
}
