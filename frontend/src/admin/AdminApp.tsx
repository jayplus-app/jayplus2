import { Link, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from '../hooks/auth/useAuth'
import NavbarSide from '../components/system/navbar/NavbarSide'
import NavbarTop from '../components/system/navbar/NavbarTop'

const AdminApp = () => {
	const { authToken, logOut, refreshAuthToken } = useAuth()

	useEffect(() => {
		if (authToken === '') {
			refreshAuthToken()
		}
	}, [authToken, refreshAuthToken])

	return (
		<div className="container">
			<div className="row">
				{authToken === '' ? (
					<Link to="/admin/login">
						<span>Login</span>
					</Link>
				) : (
					<Link to="/admin/login" onClick={logOut}>
						<span>Logout</span>
					</Link>
				)}
			</div>
			<div id="navbar">
				<NavbarSide />
				<NavbarTop />
			</div>
			<Outlet />
		</div>
	)
}

export default AdminApp
