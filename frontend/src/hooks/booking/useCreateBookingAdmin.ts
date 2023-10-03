import { useContext, useEffect, useState } from 'react'
import { apiGet, apiPost } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'

interface CreateBookingResponse {
	ID: number
	UserID: number
	VehicleType: string
	ServiceType: string
	Datetime: string
	Cost: number
	Discount: number
	Deposit: number
	BillNumber: number
	Status: string
}

export const useCreateBookingAdmin = () => {
	const [booking, setBooking] = useState<CreateBookingResponse | null>(null)
	const [isLoadingCreateBooking, setIsLoadingCreateBooking] = useState(false)

	const { authToken } = useContext(AuthContext)

	const createBookingAdmin = (
		vehicleType: string,
		serviceType: string,
		dateTime: string
	) => {
		setIsLoadingCreateBooking(true)

		apiPost(
			'/api/booking/create-booking-admin',
			{
				vehicleTypeID: vehicleType,
				serviceTypeID: serviceType,
				datetime: dateTime,
			},
			authToken
		)
			.then((res) => {
				setBooking(res)
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(() => {
				setIsLoadingCreateBooking(false)
			})
	}

	return {
		booking,
		isLoadingCreateBooking,
		createBooking: createBookingAdmin,
	}
}
