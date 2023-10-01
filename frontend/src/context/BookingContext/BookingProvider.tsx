import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useVehicleTypes } from '../../hooks/booking/useVehicleTypes'
import BookingContext from './BookingContext'
import { useServiceTypes } from '../../hooks/booking/useServiceTypes'
import { useServiceCost } from '../../hooks/booking/useServiceCost'

interface BookingProviderProps {
	children: ReactNode
}

const BookingProvider = ({ children }: BookingProviderProps) => {
	const { vehicleTypes, isLoadingVehicleTypes } = useVehicleTypes()
	const { serviceTypes, isLoadingServiceTypes } = useServiceTypes()
	const { getServiceCost } = useServiceCost()
	const [vehicleTypeSelected, setVehicleTypeSelected] = useState('')
	const [serviceTypeSelected, setServiceTypeSelected] = useState('')
	const [dateTimeSelected, setDateTimeSelected] = useState('')
	const [serviceCost, setServiceCost] = useState(0)

	useEffect(() => {
		if (!isLoadingVehicleTypes && vehicleTypes.length > 0) {
			setVehicleTypeSelected(`vt-${vehicleTypes[0].id}`)
		}
	}, [isLoadingVehicleTypes, vehicleTypes])

	useEffect(() => {
		if (!isLoadingServiceTypes && serviceTypes.length > 0) {
			setServiceTypeSelected(`st-${serviceTypes[0].id}`)
		}
	}, [isLoadingServiceTypes, serviceTypes])

	useEffect(() => {
		if (
			!isLoadingServiceTypes &&
			serviceTypes.length > 0 &&
			!isLoadingVehicleTypes &&
			vehicleTypes.length > 0
		) {
			getServiceCost(
				serviceTypeSelected.split('-')[1],
				vehicleTypeSelected.split('-')[1]
			)
				.then((res) => {
					setServiceCost(res)
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}, [serviceTypeSelected, vehicleTypeSelected])

	const contextValue = useMemo(
		() => ({
			vehicleTypes,
			isLoadingVehicleTypes,
			serviceTypes,
			isLoadingServiceTypes,
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
			vehicleTypes,
			isLoadingVehicleTypes,
			serviceTypes,
			isLoadingServiceTypes,
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
		<BookingContext.Provider value={contextValue}>
			{children}
		</BookingContext.Provider>
	)
}

export default BookingProvider
