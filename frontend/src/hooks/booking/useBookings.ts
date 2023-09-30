import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'
import { Booking } from '../../context/BookingManagementContext/BookingManagementContext'
import useAuth from '../auth/useAuth'

interface BookingsResponse {
	date: string
	bookings: Booking[]
}

export const useBookings = () => {
	const { authToken } = useContext(AuthContext)
	const { logOut } = useAuth()

	const getBookings = async (date: string): Promise<Booking[]> => {
		try {
			const data: BookingsResponse = await apiGet(
				`/api/booking/bookings?date=${date}`,
				authToken
			)
			return data.bookings
		} catch (error) {
			if (error === 'token is expired') {
				logOut()
			} else {
				console.log(error)
			}
			return []
		}
	}

	return { getBookings }
}
