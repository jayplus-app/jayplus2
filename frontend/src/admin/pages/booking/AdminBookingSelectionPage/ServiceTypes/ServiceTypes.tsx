import { useContext } from 'react'
import DescriptionField from '../../../../../components/booking/DescriptionField'
import SelectListInline from '../../../../../components/booking/SelectListInline'
import BookingContext from '../../../../../context/BookingContext/BookingContext'

const ServiceTypes = () => {
	const {
		serviceTypeSelected,
		setServiceTypeSelected,
		serviceTypes,
		isLoadingServiceTypes,
	} = useContext(BookingContext)

	const selectedDescription = serviceTypes.find(
		(st) => st.id === serviceTypeSelected
	)?.description

	return (
		<div>
			<div>Service Types</div>
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
