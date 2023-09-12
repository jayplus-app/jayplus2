import './NavbarSide.css'
import useAuth from '../../../../hooks/auth/useAuth'
import { Link, useLocation } from 'react-router-dom'

const NavbarSide = () => {
	const { authToken, logOut } = useAuth()
	const location = useLocation()
	const currentPath = location.pathname.endsWith('/')
		? location.pathname.slice(0, -1)
		: location.pathname

	return (
		<nav id="navbar-side">
			<div id="navbar-side-logo">
				<img src="logo.png" alt="Logo" />
			</div>
			<div id="navbar-side-options">
				<Link
					to="/admin"
					className={currentPath === '/admin' ? 'active' : ''}
				>
					Dashboard
				</Link>
				<Link
					to="/admin/booking-management"
					className={
						currentPath === '/admin/booking-management'
							? 'active'
							: ''
					}
				>
					Booking Management
				</Link>
				<Link
					to="/admin/booking"
					className={currentPath === '/admin/booking' ? 'active' : ''}
				>
					Booking
				</Link>
			</div>
			<div id="navbar-side-logout">
				{authToken === '' ? (
					<Link to="/login">Login</Link>
				) : (
					<Link to="/login" onClick={logOut}>
						Logout
					</Link>
				)}
			</div>
		</nav>
	)
}

export default NavbarSide
