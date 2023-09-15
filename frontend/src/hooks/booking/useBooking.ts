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

interface UseBookingsProps {
	bookingID: string
}

export const useBooking = ({ bookingID }: UseBookingsProps) => {
	const [booking, setBooking] = useState<Booking | null>(null)
	const [isLoadingBooking, setIsLoadingBooking] = useState(true)

	const { authToken } = useContext(AuthContext)

	useEffect(() => {
		setIsLoadingBooking(true)

		apiGet(`/api/booking/booking/${bookingID}`, authToken)
			.then((data: Booking) => {
				setBooking(data)
				setIsLoadingBooking(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoadingBooking(false)
			})
	}, [bookingID, authToken])

	return {
		booking,
		isLoadingBooking,
	}
}
