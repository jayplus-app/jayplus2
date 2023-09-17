import { ReactNode, useState } from 'react'
import BookingManagementContext, {
	BookingInterface,
} from './BookingManagementContext'

interface BookingManagementProviderProps {
	children: ReactNode
}

const BookingManagementProvider = ({
	children,
}: BookingManagementProviderProps) => {
	const [bookingSelected, setBookingSelected] =
		useState<BookingInterface | null>(null)
	const [isCanceling, setIsCanceling] = useState<boolean | null>(null)
	const [isCanceled, setIsCanceled] = useState<boolean | null>(null)
	const [bookingIdToCancel, setBookingIdToCancel] = useState<string | null>(
		null
	)
	const [isLoadingBooking, setIsLoadingBooking] = useState<boolean | null>(
		null
	)

	return (
		<BookingManagementContext.Provider
			value={{
				isCanceling,
				setIsCanceling,
				isCanceled,
				setIsCanceled,
				bookingIdToCancel,
				setBookingIdToCancel,
				isLoadingBooking,
				setIsLoadingBooking,
				bookingSelected,
				setBookingSelected,
			}}
		>
			{children}
		</BookingManagementContext.Provider>
	)
}

export default BookingManagementProvider
