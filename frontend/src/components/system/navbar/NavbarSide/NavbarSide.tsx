import './NavbarSide.css'
import useAuth from '../../../../hooks/auth/useAuth'
import { Link, useLocation } from 'react-router-dom'

const NavbarSide = () => {
	const { authToken, logOut } = useAuth()
	const location = useLocation()

	return (
		<nav id="navbar-side">
			<div id="navbar-side-logo">
				<img src="logo.png" alt="Logo" />
			</div>
			<div id="navbar-side-options">
				<Link
					to="/admin/dashboard"
					className={
						location.pathname === '/admin/dashboard' ? 'active' : ''
					}
				>
					Dashboard
				</Link>
				<Link
					to="/admin/booking"
					className={
						location.pathname === '/admin/booking' ? 'active' : ''
					}
				>
					Booking
				</Link>
			</div>
			<div id="navbar-side-logout">
				{authToken === '' ? (
					<Link to="/admin/login">Login</Link>
				) : (
					<Link to="/admin/login" onClick={logOut}>
						Logout
					</Link>
				)}
			</div>
		</nav>
	)
}

export default NavbarSide
