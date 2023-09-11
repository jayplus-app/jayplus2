import './AdminApp.css'
import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/auth/useAuth'
import NavbarSide from '../components/system/navbar/NavbarSide'
import NavbarTop from '../components/system/navbar/NavbarTop'
import SystemContext from '../context/SystemContext/SystemContext'

const AdminApp = () => {
	const { authToken, refreshAuthToken } = useAuth()
	const { windowWidth } = useContext(SystemContext)

	useEffect(() => {
		if (authToken === '') {
			refreshAuthToken()
		}
	}, [authToken, refreshAuthToken])

	return (
		<div id="admin-app">
			<div id="navbar">
				{windowWidth <= 800 ? <NavbarTop /> : <NavbarSide />}
			</div>
			<div id="admin-app-content">
				<Outlet />
			</div>
		</div>
	)
}

export default AdminApp
