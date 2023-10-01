import { apiPost } from '../../utils/apiUtils'

export const useServiceCost = () => {
	const getServiceCost = async (
		vehicleTypeID: string,
		serviceTypeID: string
	) => {
		try {
			const response = await apiPost('/api/booking/service-cost', {
				vehicleTypeID,
				serviceTypeID,
			})

			if (response && response.price) {
				return response.price
			} else {
				throw new Error('No price in response')
			}
		} catch (error) {
			throw error
		}
	}

	return { getServiceCost }
}
