import './DayColumnBookingCards.css'
import { useBookings } from '../../../../hooks/booking/useBookings'

interface DayColumnBookingCardsProps {
	date: string
}

const DayColumnBookingCards = ({ date }: DayColumnBookingCardsProps) => {
	const { bookings, isLoadingBookings } = useBookings({
		selectedDate: date,
	})

	return (
		<div>
			<ul id="card-list-block">
				{isLoadingBookings ? (
					<li>Loading...</li>
				) : (
					bookings?.map((booking) => (
						<li
							id="card-list-item"
							key={booking.Date + booking.Time}
						>
							<span>{booking.Time}</span>
							<span>{booking.VehicleType}</span>
							<span>{booking.TypeOfService}</span>
						</li>
					))
				)}
			</ul>
		</div>
	)
}

export default DayColumnBookingCards
