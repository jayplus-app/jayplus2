import './DayColumnSelectTime.css'
import { ChangeEvent, useContext } from 'react'
import { useTimeslots } from '../../../../hooks/booking/useTimeslots'
import BookingContext from '../../../../context/BookingContext/BookingContext'

interface DayColumnSelectTimeProps {
	date: string
}

const DayColumnSelectTime = ({ date }: DayColumnSelectTimeProps) => {
	const {
		dateTimeSelected,
		setDateTimeSelected,
		vehicleTypeSelected,
		serviceTypeSelected,
	} = useContext(BookingContext)
	const { timeslots, isLoadingTimeslots } = useTimeslots({
		selectedDate: date,
		vehicleType: vehicleTypeSelected.split('-')[1],
		serviceType: serviceTypeSelected.split('-')[1],
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDateTimeSelected(e.currentTarget.value)
		console.log(e.currentTarget.value)
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
							id={`${slot.startTime}`}
							name={date}
							value={slot.startTime}
							checked={dateTimeSelected === slot.startTime}
							onChange={handleChange}
							disabled={!slot.available}
						/>
						<label
							htmlFor={`${slot.startTime}`}
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
