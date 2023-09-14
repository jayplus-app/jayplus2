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
	const [shouldRender, setShouldRender] = useState(false)
	const [showBody, setShowBody] = useState(true)
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
					setShouldRender(true)
				})
		} else {
			setShouldRender(true)
		}
	}, [authToken, refreshAuthToken, navigate])

	return shouldRender ? (
		<div id="admin-app">
			<div id="navbar">
				{windowWidth <= 800 ? (
					<NavbarTop
						expanded={(expanded) => {
							setShowBody(!expanded)
							console.log('expanded', expanded)
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
