import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'
import {
	Booking,
	Bookings,
} from '../../context/BookingManagementContext/BookingManagementContext'
import useAuth from '../auth/useAuth'

export const useBookings = () => {
	const { authToken } = useContext(AuthContext)
	const { logOut } = useAuth()

	const getBookings = async (date: string): Promise<Bookings[]> => {
		try {
			const data: Bookings[] = await apiGet(
				`/api/booking/bookings?date=${date}`,
				authToken
			)
			return data
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
