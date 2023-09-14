import { Outlet } from 'react-router-dom'
import BookingProvider from '../context/BookingContext/BookingProvider'

const CustomerApp = () => {
	return (
		<BookingProvider>
			<Outlet />
		</BookingProvider>
	)
}

export default CustomerApp
