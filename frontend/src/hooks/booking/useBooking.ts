import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'
import { Booking } from '../../context/BookingManagementContext/BookingManagementContext'

export const useBooking = () => {
	const { authToken } = useContext(AuthContext)

	const getBooking = async (bookingId: number): Promise<Booking> => {
		try {
			const data: Booking = await apiGet(
				`/api/booking/booking/${bookingId}`,
				authToken
			)
			return data
		} catch (error) {
			console.error(error)
			return {} as Booking
		}
	}

	return {
		getBooking,
	}
}
