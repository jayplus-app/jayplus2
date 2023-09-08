import './DayColumnSelectTime.css'
import { ChangeEvent, useContext } from 'react'
import { useTimeslots } from '../../../../hooks/booking/useTimeslots'
import CustomerBookingContext from '../../../../context/CustomerBookingContext/CustomerBookingContext'

interface DayColumnSelectTimeProps {
	date: string
}

const DayColumnSelectTime = ({ date }: DayColumnSelectTimeProps) => {
	const { timeslots, isLoadingTimeslots } = useTimeslots({
		selectedDate: date,
	})
	const { dateTimeSelected, setDateTimeSelected } = useContext(
		CustomerBookingContext
	)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDateTimeSelected(e.currentTarget.value)
	}

	return (
		<ul id="select-list-block">
			{isLoadingTimeslots ? (
				<li>Loading...</li>
			) : (
				timeslots?.map((slot) => (
					<li id="select-list-item" key={slot.start_time}>
						<input
							className="select-list-input"
							type="radio"
							id={`${date}${slot.start_time}`}
							name={date}
							value={date + slot.start_time}
							checked={
								dateTimeSelected === date + slot.start_time
							}
							onChange={handleChange}
						/>
						<label
							htmlFor={`${date}${slot.start_time}`}
							className="select-list-label"
						>
							<span>{slot.start_time}</span>
						</label>
					</li>
				))
			)}
		</ul>
	)
}

export default DayColumnSelectTime
