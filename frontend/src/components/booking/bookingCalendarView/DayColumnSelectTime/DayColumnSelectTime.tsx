import './DayColumnSelectTime.css'
import { ChangeEvent, useContext } from 'react'
import { useTimeslots } from '../../../../hooks/booking/useTimeslots'
import BookingContext from '../../../../context/BookingContext/BookingContext'

interface DayColumnSelectTimeProps {
	date: string
}

const DayColumnSelectTime = ({ date }: DayColumnSelectTimeProps) => {
	const { timeslots, isLoadingTimeslots } = useTimeslots({
		selectedDate: date,
	})
	const { dateTimeSelected, setDateTimeSelected } = useContext(BookingContext)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDateTimeSelected(e.currentTarget.value)
	}

	return (
		<ul id="select-list-block">
			{isLoadingTimeslots ? (
				<li>Loading...</li>
			) : (
				timeslots?.map((slot) => (
					<li
						id="select-list-item"
						key={slot.start_time}
						className={`${!slot.available && 'li-disabled'}`}
					>
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
							disabled={!slot.available}
						/>
						<label
							htmlFor={`${date}${slot.start_time}`}
							className={`select-list-label ${
								!slot.available && 'label-disabled'
							}`}
						>
							<span>{slot.start_time.slice(11, 16)}</span>
						</label>
					</li>
				))
			)}
		</ul>
	)
}

export default DayColumnSelectTime
