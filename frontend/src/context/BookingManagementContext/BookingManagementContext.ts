import { createContext } from 'react'

export interface Booking {
	id: string
	transactionNumber: string
	billNumber: string
	typeOfService: string
	vehicleType: string
	date: string
	time: string
	serviceCost: string
	discount: string
	total: string
	deposit: string
	remaining: string
}

interface BookingManagementContextProps {
	isCanceling: boolean | null
	setIsCanceling: (isCanceling: boolean | null) => void
	isCanceled: boolean | null
	setIsCanceled: (isCanceled: boolean | null) => void
	bookingIdToCancel: string | null
	setBookingIdToCancel: (bookingId: string) => void
	isLoadingBooking: boolean | null
	setIsLoadingBooking: (isLoadingBooking: boolean | null) => void
	bookingSelected: Booking | null
	setBookingSelected: (booking: Booking) => void
}

const BookingManagementContext = createContext<BookingManagementContextProps>(
	{} as BookingManagementContextProps
)

export default BookingManagementContext
