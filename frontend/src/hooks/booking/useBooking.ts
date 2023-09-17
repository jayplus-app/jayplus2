import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'
import BookingManagementContext from '../../context/BookingManagementContext/BookingManagementContext'

export const useBooking = () => {
	const { isLoadingBooking, setIsLoadingBooking, setBookingSelected } =
		useContext(BookingManagementContext)

	const { authToken } = useContext(AuthContext)

	const getBooking = (bookingId: string) => {
		setIsLoadingBooking(true)

		apiGet(`/api/booking/booking/${bookingId}`, authToken)
			.then((data) => {
				setBookingSelected(data)
				setIsLoadingBooking(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoadingBooking(false)
			})
	}

	return {
		isLoadingBooking,
		getBooking,
	}
}
