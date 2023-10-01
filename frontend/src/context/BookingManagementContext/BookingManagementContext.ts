import { createContext } from 'react'

export interface Booking {
	id: number
	userID: number
	vehicleType: string
	serviceType: string
	datetime: string
	cost: number
	discount: number
	deposit: number
	billNumber: number
	status: string
}

export interface Bookings {
	id: number
	vehicleType: string
	serviceType: string
	datetime: string
	status: string
}

interface BookingManagementContextProps {
	isCanceling: boolean | null
	setIsCanceling: (isCanceling: boolean | null) => void
	isCanceled: boolean | null
	setIsCanceled: (isCanceled: boolean | null) => void
	bookingIdToCancel: number | null
	setBookingIdToCancel: (bookingId: number) => void
	isLoadingBooking: boolean | null
	setIsLoadingBooking: (isLoadingBooking: boolean | null) => void
	bookingSelected: Booking | null
	setBookingSelected: (booking: Booking) => void
}

const BookingManagementContext = createContext<BookingManagementContextProps>(
	{} as BookingManagementContextProps
)

export default BookingManagementContext
