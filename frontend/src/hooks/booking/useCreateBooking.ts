import { useContext, useState } from 'react'
import { apiPost } from '../../utils/apiUtils'
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

export const useCreateBooking = () => {
	const [booking, setBooking] = useState<CreateBookingResponse | null>(null)
	const [isLoadingCreateBooking, setIsLoadingCreateBooking] = useState(false)

	const createBooking = async (
		vehicleType: string,
		serviceType: string,
		dateTime: string
	): Promise<CreateBookingResponse | void> => {
		setIsLoadingCreateBooking(true)

		try {
			const res = await apiPost('/api/booking/create-booking', {
				vehicleTypeID: vehicleType,
				serviceTypeID: serviceType,
				datetime: dateTime,
			})
			setBooking(res)
			return res
		} catch (err) {
			throw err
		} finally {
			setIsLoadingCreateBooking(false)
		}
	}

	return {
		booking,
		isLoadingCreateBooking,
		createBooking: createBooking,
	}
}
