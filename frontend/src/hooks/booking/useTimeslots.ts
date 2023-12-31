import { useState, useEffect } from 'react'
import { apiGet, apiPost } from '../../utils/apiUtils'

interface Timeslot {
	id: number
	startTime: string
	endTime: string
	freeMinutes: number
	available: boolean
	isPast: boolean
}

interface TimeslotsResponse {
	date: string
	slots: Timeslot[]
}

interface UseTimeslotsProps {
	selectedDate: string
	vehicleType: string
	serviceType: string
}

export const useTimeslots = ({
	selectedDate,
	vehicleType,
	serviceType,
}: UseTimeslotsProps) => {
	const [timeslots, setTimeslots] = useState<Timeslot[] | null>(null)
	const [isLoadingTimeslots, setIsLoadingTimeslots] = useState(true)

	useEffect(() => {
		setIsLoadingTimeslots(true)

		apiPost(`/api/booking/timeslots`, {
			datetime: selectedDate,
			vehicleTypeID: vehicleType,
			serviceTypeID: serviceType,
		})
			.then((data: TimeslotsResponse) => {
				setTimeslots(data.slots)
				setIsLoadingTimeslots(false)
			})
			.catch((error) => {
				console.error(error)
				setIsLoadingTimeslots(false)
			})
	}, [selectedDate])

	return { timeslots, isLoadingTimeslots }
}
