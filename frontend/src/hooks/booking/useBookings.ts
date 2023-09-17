import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'
import { Booking } from '../../context/BookingManagementContext/BookingManagementContext'

interface BookingsResponse {
	date: string
	bookings: Booking[]
}

export const useBookings = () => {
	const { authToken } = useContext(AuthContext)

	const getBookings = async (date: string): Promise<Booking[]> => {
		try {
			const data: BookingsResponse = await apiGet(
				`/api/booking/bookings?date=${date}`,
				authToken
			)
			return data.bookings
		} catch (error) {
			console.error('Error fetching data:', error)
			return []
		}
	}

	return { getBookings }
}
