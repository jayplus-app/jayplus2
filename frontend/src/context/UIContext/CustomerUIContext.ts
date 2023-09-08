import { createContext } from 'react'

interface CustomerUIContextProps {
	maxFutureBookingDays: number
	primaryColor: string
	secondaryColor: string
	isLoadingUI: boolean
}

const CustomerUIContext = createContext<CustomerUIContextProps>(
	{} as CustomerUIContextProps
)

export default CustomerUIContext
