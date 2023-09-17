import { createContext } from 'react'

export interface BookingInterface {
	ID: string
	TransactionNumber: string
	BillNumber: string
	TypeOfService: string
	VehicleType: string
	Date: string
	Time: string
	ServiceCost: string
	Discount: string
	Total: string
	Deposit: string
	Remaining: string
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
	bookingSelected: BookingInterface | null
	setBookingSelected: (booking: BookingInterface) => void
}

const BookingManagementContext = createContext<BookingManagementContextProps>(
	{} as BookingManagementContextProps
)

export default BookingManagementContext
