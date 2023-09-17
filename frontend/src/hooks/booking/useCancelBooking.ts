import { useContext, useEffect, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'
import BookingManagementContext from '../../context/BookingManagementContext/BookingManagementContext'

export const useCancelBooking = () => {
	const { setIsCanceling, setIsCanceled } = useContext(
		BookingManagementContext
	)

	const { authToken } = useContext(AuthContext)

	const cancelBooking = (bookingId: string) => {
		setIsCanceling(true)

		apiGet(`/api/booking/cancel-booking/${bookingId}`, authToken)
			.then(() => {
				setIsCanceled(true)
			})
			.catch((error) => {
				setIsCanceled(false)
			})
			.finally(() => {
				setIsCanceling(false)
			})
	}

	return {
		cancelBooking,
	}
}
