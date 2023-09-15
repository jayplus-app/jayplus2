import './CustomerApp.css'
import { Outlet } from 'react-router-dom'
import BookingProvider from '../context/BookingContext/BookingProvider'

const CustomerApp = () => {
	return (
		<BookingProvider>
			<div id="customer-app">
				<Outlet />
			</div>
		</BookingProvider>
	)
}

export default CustomerApp
