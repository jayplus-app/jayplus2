import { createContext } from 'react'

interface CustomerUIContextProps {
	maxFutureBookingDays: number
	setMaxFutureBookingDays: (maxFutureBookingDays: number) => void
	isLoadingUI: boolean
}

const CustomerUIContext = createContext<CustomerUIContextProps>(
	{} as CustomerUIContextProps
)

export default CustomerUIContext
