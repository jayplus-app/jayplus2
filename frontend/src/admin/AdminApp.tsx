import { Link, Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext/AuthContext'
import { useCallback, useContext, useEffect } from 'react'

const AdminApp = () => {
	const { authToken, setAuthToken, setRefreshInterval } =
		useContext(AuthContext)
	const navigate = useNavigate()

	const logOut = () => {
		const options: RequestInit = {
			method: 'GET',
			credentials: 'include',
		}

		fetch('/api/auth/logout', options)
			.catch((error) => console.error('Error logging out', error))
			.finally(() => {
				setAuthToken('')
				setRefreshInterval(false)
			})

		console.log('User logged out')
		navigate('/admin/login')
	}

	const refreshAuthToken = useCallback(() => {
		const options: RequestInit = {
			method: 'GET',
			credentials: 'include',
		}

		fetch('/api/auth/refresh', options)
			.then((res) => res.json())
			.then((data) => {
				if (data.access_token) {
					setAuthToken(data.access_token)
					setRefreshInterval(true)
				}
			})
			.catch((err) => {
				console.log('User not logged in')
			})
	}, [setAuthToken, setRefreshInterval])

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
						<span className="">Login</span>
					</Link>
				) : (
					<Link to="/admin/login" onClick={logOut}>
						<span className="" onClick={logOut}>
							Logout
						</span>
					</Link>
				)}
			</div>
			<Outlet />
		</div>
	)
}

export default AdminApp
