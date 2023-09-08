import { useState, useEffect } from 'react'

interface Timeslot {
	id: number
	start_time: string
	end_time: string
	free_minutes: number
	available: boolean
	is_past: boolean
}

interface TimeslotsResponse {
	date: string
	slots: Timeslot[]
}

interface UseTimeslotsProps {
	selectedDate: string
}

export const useTimeslots = ({ selectedDate }: UseTimeslotsProps) => {
	const [timeslots, setTimeslots] = useState<Timeslot[] | null>(null)
	const [isLoadingTimeslots, setIsLoadingTimeslots] = useState(true)

	useEffect(() => {
		setIsLoadingTimeslots(true)

		fetch(`/api/booking/timeslots?date=${selectedDate}`)
			.then((response) => response.json())
			.then((data: TimeslotsResponse) => {
				setTimeslots(data.slots)
				setIsLoadingTimeslots(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setIsLoadingTimeslots(false)
			})
	}, [selectedDate])

	return { timeslots, isLoadingTimeslots }
}
