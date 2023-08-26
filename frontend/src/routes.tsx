import { createBrowserRouter } from 'react-router-dom'
import CustomerApp from './customer/CustomerApp'
import BookingSelectionPage from './customer/pages/booking/BookingSelectionPage'
import PaymentPage from './customer/pages/payment/PaymentPage'
import PaymentSuccessPage from './customer/pages/payment/PaymentSuccessPage'
import AdminApp from './admin/AdminApp'
import DashboardPage from './admin/pages/DashboardPage'

const Router = createBrowserRouter([
	{
		path: '/',
		element: <CustomerApp />,
		children: [
			{
				path: '',
				element: <BookingSelectionPage />,
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
		],
	},
])

export default Router
