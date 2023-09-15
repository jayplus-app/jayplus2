import { useContext, useState } from 'react'
import { apiGet } from '../../utils/apiUtils'
import AuthContext from '../../context/AuthContext/AuthContext'

export const useCancelBooking = () => {
	const [isCanceled, setIsCanceled] = useState<boolean | null>(null)
	const [isCanceling, setIsCanceling] = useState(false)

	const { authToken } = useContext(AuthContext)

	const cancelBooking = (bookingId: string) => {
		setIsCanceling(true)

		apiGet(`/api/booking/cancel-booking/${bookingId}`, authToken)
			.then(() => {
				setIsCanceled(true)
				setIsCanceling(false)
			})
			.catch((error) => {
				console.error('Error canceling booking:', error)
				setIsCanceled(false)
				setIsCanceling(false)
			})
	}

	return {
		isCanceled,
		isCanceling,
		cancelBooking,
	}
}
