import { useContext } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'

export const useCancelBooking = () => {
	const { authToken } = useContext(AuthContext)

	const cancelBooking = async (
		bookingId: number
	): Promise<{ success: boolean; message?: string }> => {
		try {
			const response = await apiGet(
				`/api/booking/cancel-booking/${bookingId}`,
				authToken
			)
			return { success: true, message: response.message }
		} catch (error) {
			console.error('Error canceling the booking:', error)
			return { success: false }
		}
	}

	return {
		cancelBooking,
	}
}
