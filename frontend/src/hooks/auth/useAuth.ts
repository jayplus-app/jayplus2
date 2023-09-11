import { useContext, useCallback } from 'react'
import AuthContext from '../../context/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { apiGet, apiPost } from '../../utils/apiUtils'

const useAuth = () => {
	const { authToken, setAuthToken, setRefreshInterval } =
		useContext(AuthContext)
	const navigate = useNavigate()

	const logOut = useCallback(() => {
		apiGet('/api/auth/logout')
			.catch((error) => console.error('Error logging out', error))
			.finally(() => {
				setAuthToken('')
				setRefreshInterval(false)
			})

		navigate('/admin/login')
	}, [setAuthToken, setRefreshInterval, navigate])

	const refreshAuthToken = useCallback(() => {
		apiGet('/api/auth/refresh')
			.then((data) => {
				if (data.access_token) {
					setAuthToken(data.access_token)
					setRefreshInterval(true)
				}
			})
			.catch(() => {
				console.log('User not logged in')
			})
	}, [setAuthToken, setRefreshInterval])

	const login = useCallback(
		(
			email: string,
			password: string
		): Promise<{ error?: string; message?: string }> => {
			return apiPost('/api/auth/login', { email, password })
				.then((data) => {
					if (!data.error) {
						setAuthToken(data.access_token)
						navigate('/admin/booking')
						setRefreshInterval(true)
					}
					return data
				})
				.catch((err) => {
					return { error: err.message }
				})
		},
		[setAuthToken, setRefreshInterval, navigate]
	)

	return {
		authToken,
		logOut,
		refreshAuthToken,
		login,
	}
}

export default useAuth
