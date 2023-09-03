import { createBrowserRouter } from 'react-router-dom'
import CustomerApp from './customer/CustomerApp'
import CustomerBookingSelectionPage from './customer/pages/booking/CustomerBookingSelectionPage'
import PaymentPage from './customer/pages/payment/PaymentPage'
import PaymentSuccessPage from './customer/pages/payment/PaymentSuccessPage'
import AdminApp from './admin/AdminApp'
import DashboardPage from './admin/pages/DashboardPage'
import BookingManagementPage from './admin/pages/booking/BookingManagementPage'
import AdminBookingSelectionPage from './admin/pages/booking/AdminBookingSelectionPage'
import AdminLogin from './admin/pages/auth/AdminLogin'

const Router = createBrowserRouter([
	{
		path: '/',
		element: <CustomerApp />,
		children: [
			{
				path: '',
				element: <CustomerBookingSelectionPage />,
			},
			{
				path: 'payment',
				element: <PaymentPage />,
			},
			{
				path: 'payment-success',
				element: <PaymentSuccessPage />,
			},
		],
	},
	{
		path: '/admin',
		element: <AdminApp />,
		children: [
			{
				path: '',
				element: <DashboardPage />,
			},
			{
				path: 'booking-management',
				element: <BookingManagementPage />,
			},
			{
				path: 'booking',
				element: <AdminBookingSelectionPage />,
			},
			{
				path: 'login',
				element: <AdminLogin />,
			},
		],
	},
])

export default Router
