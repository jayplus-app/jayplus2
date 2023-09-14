import './AdminApp.css'
import { setAdminCssVariables } from './AdminAppConfig'
import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/auth/useAuth'
import NavbarSide from '../components/system/navbar/NavbarSide'
import NavbarTop from '../components/system/navbar/NavbarTop'
import SystemContext from '../context/SystemContext/SystemContext'

const AdminApp = () => {
	const { authToken, refreshAuthToken } = useAuth()
	const [tokenRefreshed, setTokenRefreshed] = useState(false)
	const { windowWidth } = useContext(SystemContext)

	const navigate = useNavigate()

	setAdminCssVariables()

	useEffect(() => {
		if (authToken === '') {
			refreshAuthToken()
				.catch(() => {
					navigate('/login')
				})
				.finally(() => {
					setTokenRefreshed(true)
				})
		} else {
			setTokenRefreshed(true)
		}
	}, [authToken, refreshAuthToken, navigate])

	return tokenRefreshed ? (
		<div id="admin-app">
			<div id="navbar">
				{windowWidth <= 800 ? <NavbarTop /> : <NavbarSide />}
			</div>
			<div id="admin-app-content">
				<Outlet />
			</div>
		</div>
	) : null
}

export default AdminApp
