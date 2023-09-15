import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'

interface Booking {
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

interface BookingsResponse {
	date: string
	bookings: Booking[]
}

interface UseBookingsProps {
	selectedDate: string
}

export const useBookings = ({ selectedDate }: UseBookingsProps) => {
	const [bookings, setBookings] = useState<Booking[] | null>(null)
	const [isLoadingBookings, setIsLoadingBookings] = useState(true)

	const { authToken } = useContext(AuthContext)

	useEffect(() => {
		setIsLoadingBookings(true)

		apiGet(`/api/booking/bookings?date=${selectedDate}`, authToken)
			.then((data: BookingsResponse) => {
				setBookings(data.bookings)
				setIsLoadingBookings(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoadingBookings(false)
			})
	}, [selectedDate, authToken])

	return { bookings, isLoadingBookings }
}
