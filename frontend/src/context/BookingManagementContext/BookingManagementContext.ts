import { createContext } from 'react'

interface BookingManagementContextProps {
	bookingIdToCancel: string
	setBookingIdToCancel: (bookingId: string) => void
	isCanceling: boolean
	isCanceled: boolean | null
	cancelMessage: string | null
	cancelBooking: (bookingId: string) => void
}

const BookingManagementContext = createContext<BookingManagementContextProps>(
	{} as BookingManagementContextProps
)

export default BookingManagementContext
