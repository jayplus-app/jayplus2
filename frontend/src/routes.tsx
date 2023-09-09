import { createBrowserRouter } from 'react-router-dom'
import CustomerApp from './customer/CustomerApp'
import CustomerBookingSelectionPage from './customer/pages/booking/CustomerBookingSelectionPage'
import PaymentPage from './customer/pages/payment/PaymentPage'
import PaymentSuccessPage from './customer/pages/payment/PaymentSuccessPage'
import AdminApp from './admin/AdminApp'
import DashboardPage from './admin/pages/DashboardPage'
import BookingManagementPage from './admin/pages/booking/BookingManagementPage'
import AdminBookingSelectionPage from './admin/pages/booking/AdminBookingSelectionPage'
import AdminLoginPage from './admin/pages/auth/AdminLoginPage'
import AuthProvider from './context/AuthContext/AuthProvider'
import CustomerConfigProvider from './context/CustomerConfigContext/CustomerConfigProvider'

const Router = createBrowserRouter([
	{
		path: '/',
		element: (
			<CustomerConfigProvider>
				<CustomerApp />
			</CustomerConfigProvider>
		),
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
		element: (
			<AuthProvider>
				<AdminApp />
			</AuthProvider>
		),
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
				element: <AdminLoginPage />,
			},
		],
	},
])

export default Router
