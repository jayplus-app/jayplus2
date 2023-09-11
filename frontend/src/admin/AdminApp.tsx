import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import useAuth from '../hooks/auth/useAuth'
import NavbarSide from '../components/system/navbar/NavbarSide'
import NavbarTop from '../components/system/navbar/NavbarTop'
import SystemContext from '../context/SystemContext/SystemContext'

const AdminApp = () => {
	const { authToken, logOut, refreshAuthToken } = useAuth()
	const { windowWidth } = useContext(SystemContext)

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
				{windowWidth <= 800 ? <NavbarTop /> : <NavbarSide />}
			</div>
			<Outlet />
		</div>
	)
}

export default AdminApp
