import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'

interface CreateBookingResponse {
	booking_number: number
}

export const useCreateBooking = () => {
	const [bookingNumber, setBookingNumber] = useState<number | null>(null)
	const [isLoadingCreateBooking, setIsLoadingCreateBooking] = useState(false)

	const { authToken } = useContext(AuthContext)

	const createBooking = (
		vehicleType: string,
		serviceType: string,
		dateTime: string
	) => {
		setIsLoadingCreateBooking(true)

		apiGet(`/api/booking/create-booking`, authToken)
			.then((data: CreateBookingResponse) => {
				setBookingNumber(data.booking_number)
				setIsLoadingCreateBooking(false)
			})
			.catch((error) => {
				console.error(error)
				setIsLoadingCreateBooking(false)
			})
	}

	return {
		bookingNumber,
		isLoadingCreateBooking,
		createBooking,
	}
}
