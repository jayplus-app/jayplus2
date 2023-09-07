import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useVehicleTypes } from '../../hooks/booking/useVehicleTypes'
import CustomerBookingContext from './CustomerBookingContext'
import { useServiceTypes } from '../../hooks/booking/useServiceTypes'

interface CustomerBookingProviderProps {
	children: ReactNode
}

const CustomerBookingProvider = ({
	children,
}: CustomerBookingProviderProps) => {
	const { vehicleTypes, isLoadingVehicleTypes } = useVehicleTypes()
	const { serviceTypes, isLoadingServiceTypes } = useServiceTypes()
	const [vehicleTypeSelected, setVehicleTypeSelected] = useState('')
	const [serviceTypeSelected, setServiceTypeSelected] = useState('Show Room')
	const [dateTimeSelected, setDateTimeSelected] = useState('')
	const [serviceCost, setServiceCost] = useState(0)

	useEffect(() => {
		if (!isLoadingVehicleTypes && vehicleTypes.length > 0) {
			setVehicleTypeSelected(vehicleTypes[0].id)
		}
	}, [isLoadingVehicleTypes, vehicleTypes])

	useEffect(() => {
		if (!isLoadingServiceTypes && serviceTypes.length > 0) {
			setServiceTypeSelected(serviceTypes[0].id)
		}
	}, [isLoadingServiceTypes, serviceTypes])

	const contextValue = useMemo(
		() => ({
			vehicleTypeSelected,
			setVehicleTypeSelected,
			serviceTypeSelected,
			setServiceTypeSelected,
			dateTimeSelected,
			setDateTimeSelected,
			serviceCost,
			setServiceCost,
		}),
		[
			vehicleTypeSelected,
			setVehicleTypeSelected,
			serviceTypeSelected,
			setServiceTypeSelected,
			dateTimeSelected,
			setDateTimeSelected,
			serviceCost,
			setServiceCost,
		]
	)

	return (
		<CustomerBookingContext.Provider value={contextValue}>
			{children}
		</CustomerBookingContext.Provider>
	)
}

export default CustomerBookingProvider
