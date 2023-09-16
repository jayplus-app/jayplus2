import { ReactNode, useEffect, useState } from 'react'
import { useCancelBooking } from '../../hooks/booking/useCancelBooking'
import BookingManagementContext from './BookingManagementContext'

interface BookingManagementProviderProps {
	children: ReactNode
}

const BookingManagementProvider = ({
	children,
}: BookingManagementProviderProps) => {
	const [bookingIdToCancel, setBookingIdToCancel] = useState<string>('')
	const [cancelMessage, setCancelMessage] = useState<string | null>(null)
	const { isCanceled, isCanceling, cancelBooking } = useCancelBooking()

	useEffect(() => {
		if (isCanceled === true) {
			setCancelMessage(`Booking has been successfully canceled.`)
		} else if (isCanceled === false) {
			setCancelMessage(`Failed to cancel booking.`)
		}
	}, [isCanceling])

	return (
		<BookingManagementContext.Provider
			value={{
				bookingIdToCancel,
				setBookingIdToCancel,
				isCanceling,
				isCanceled,
				cancelMessage,
				cancelBooking,
			}}
		>
			{children}
		</BookingManagementContext.Provider>
	)
}

export default BookingManagementProvider
