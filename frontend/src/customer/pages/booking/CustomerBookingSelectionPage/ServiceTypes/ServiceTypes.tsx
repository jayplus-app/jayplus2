import { useContext, useEffect, useState } from 'react'
import DescriptionField from '../../../../../components/booking/DescriptionField'
import SelectListInline from '../../../../../components/booking/SelectListInline'
import CustomerBookingContext from '../../../../../context/CustomerBookingContext/CustomerBookingContext'

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

const ServiceTypes = () => {
	const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
	const { serviceTypeSelected, setServiceTypeSelected } = useContext(
		CustomerBookingContext
	)

	useEffect(() => {
		fetch('/api/booking/service-types')
			.then((response) => response.json())
			.then((data: ServiceTypeResponse) => {
				setServiceTypes(data.types)
			})
			.catch((error) => console.error('Error fetching data:', error))
	}, [])

	return (
		<div>
			<h2>Service Types</h2>
			<SelectListInline
				options={serviceTypes}
				name="service-types"
				select={(option) => console.log('option')}
			/>
			<DescriptionField />
		</div>
	)
}

export default ServiceTypes
