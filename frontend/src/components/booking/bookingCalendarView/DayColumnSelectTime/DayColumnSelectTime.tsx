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
						key={slot.startTime}
						className={`${!slot.available && 'li-disabled'}`}
					>
						<input
							className="select-list-input"
							type="radio"
							id={`${date}${slot.startTime}`}
							name={date}
							value={date + slot.startTime}
							checked={dateTimeSelected === date + slot.startTime}
							onChange={handleChange}
							disabled={!slot.available}
						/>
						<label
							htmlFor={`${date}${slot.startTime}`}
							className={`select-list-label ${
								!slot.available && 'label-disabled'
							}`}
						>
							<span>{slot.startTime.slice(11, 16)}</span>
						</label>
					</li>
				))
			)}
		</ul>
	)
}

export default DayColumnSelectTime
