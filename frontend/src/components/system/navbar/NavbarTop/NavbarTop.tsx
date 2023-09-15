import './NavbarTop.css'
import useAuth from '../../../../hooks/auth/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoIosMenu, IoIosClose } from 'react-icons/io'

interface NavbarTopProps {
	expanded: (expanded: boolean) => void
}

const NavbarTop = ({ expanded }: NavbarTopProps) => {
	const { logOut } = useAuth()
	const location = useLocation()
	const currentPath = location.pathname.endsWith('/')
		? location.pathname.slice(0, -1)
		: location.pathname
	const navigate = useNavigate()
	const [isMenuExpanded, setIsMenuExpanded] = useState(false)

	const handleToggle = () => {
		const newMenuState = !isMenuExpanded
		setIsMenuExpanded(newMenuState)
		expanded(newMenuState)
	}

	const handleLogout = () => {
		logOut()
			.then(() => navigate('/login'))
			.catch((error) => {
				console.error('Failed to log out:', error)
			})
	}

	const closeNavbar = () => {
		setIsMenuExpanded(false)
		expanded(false)
	}

	return (
		<nav id="navbar-top">
			<div id="navbar-top-heading">
				<div id="navbar-top-logo">
					<img src="logo.png" alt="Logo" />
				</div>
				<div id="navbar-top-toggle" onClick={handleToggle}>
					{isMenuExpanded ? (
						<IoIosClose size="35px" />
					) : (
						<IoIosMenu size="28px" />
					)}{' '}
				</div>
			</div>
			<div
				id="navbar-top-options"
				className={isMenuExpanded ? 'expanded' : ''}
			>
				<div id="navbar-top-options-nav">
					<Link
						to="/admin"
						className={currentPath === '/admin' ? 'active' : ''}
						onClick={closeNavbar}
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
						onClick={closeNavbar}
					>
						Booking Management
					</Link>
					<Link
						to="/admin/booking"
						className={
							currentPath === '/admin/booking' ? 'active' : ''
						}
						onClick={closeNavbar}
					>
						Booking
					</Link>
				</div>
				<div id="navbar-top-options-logout">
					<Link to="#" onClick={handleLogout}>
						Logout
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default NavbarTop
