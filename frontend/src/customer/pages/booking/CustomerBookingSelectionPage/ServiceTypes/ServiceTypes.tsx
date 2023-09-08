import { useContext } from 'react'
import DescriptionField from '../../../../../components/booking/DescriptionField'
import SelectListInline from '../../../../../components/booking/SelectListInline'
import CustomerBookingContext from '../../../../../context/CustomerBookingContext/CustomerBookingContext'

const ServiceTypes = () => {
	const {
		serviceTypeSelected,
		setServiceTypeSelected,
		serviceTypes,
		isLoadingServiceTypes,
	} = useContext(CustomerBookingContext)

	const selectedDescription = serviceTypes.find(
		(st) => st.id === serviceTypeSelected
	)?.description

	return (
		<div>
			<h2>Vehicle Types</h2>
			{isLoadingServiceTypes ? (
				'Loading...'
			) : (
				<SelectListInline
					options={serviceTypes}
					name="service-types"
					select={(option) => setServiceTypeSelected(option)}
				/>
			)}
			<DescriptionField
				content={selectedDescription || 'No description available'}
			/>
		</div>
	)
}

export default ServiceTypes
