import { createContext } from 'react'
import { VehicleType } from '../../hooks/booking/useVehicleTypes'
import { ServiceType } from '../../hooks/booking/useServiceTypes'

interface CustomerBookingContextProps {
	vehicleTypes: VehicleType[]
	isLoadingVehicleTypes: boolean
	serviceTypes: ServiceType[]
	isLoadingServiceTypes: boolean
	vehicleTypeSelected: string
	setVehicleTypeSelected: (vehicleType: string) => void
	serviceTypeSelected: string
	setServiceTypeSelected: (serviceType: string) => void
	dateTimeSelected: string
	setDateTimeSelected: (dateTime: string) => void
	serviceCost: number
	setServiceCost: (cost: number) => void
}

const CustomerBookingContext = createContext<CustomerBookingContextProps>(
	{} as CustomerBookingContextProps
)

export default CustomerBookingContext
