import './AdminApp.css'
import { setAdminCssVariables } from './AdminAppConfig'
import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/auth/useAuth'
import NavbarSide from '../components/system/navbar/NavbarSide'
import NavbarTop from '../components/system/navbar/NavbarTop'
import SystemContext from '../context/SystemContext/SystemContext'
import AuthContext from '../context/AuthContext/AuthContext'

const AdminApp = () => {
	const { refreshAuthToken, logOut } = useAuth()
	const [shouldRender, setShouldRender] = useState(false)
	const [showBody, setShowBody] = useState(true)
	const { windowWidth } = useContext(SystemContext)
	const { setRefreshInterval } = useContext(AuthContext)

	const navigate = useNavigate()

	setAdminCssVariables()

	useEffect(() => {
		const refresh = async () => {
			try {
				await refreshAuthToken()
				setRefreshInterval(true)
				setShouldRender(true)
			} catch (err) {
				logOut()
				navigate('/login')
			}
		}

		refresh()
	}, [])

	return shouldRender ? (
		<div id="admin-app">
			<div id="navbar">
				{windowWidth <= 800 ? (
					<NavbarTop
						expanded={(expanded) => {
							setShowBody(!expanded)
						}}
					/>
				) : (
					<NavbarSide />
				)}
			</div>
			{showBody && (
				<div id="admin-app-content">
					<Outlet />
				</div>
			)}
		</div>
	) : null
}

export default AdminApp
