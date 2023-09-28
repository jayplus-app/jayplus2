import { useContext, useCallback } from 'react'
import AuthContext from '../../context/AuthContext/AuthContext'
import { apiGet, apiPost } from '../../utils/apiUtils'

const useAuth = () => {
	const { authToken, setAuthToken, setRefreshInterval } =
		useContext(AuthContext)

	const logOut = useCallback(() => {
		return new Promise((resolve, reject) => {
			apiGet('/api/auth/logout')
				.then(() => {
					setAuthToken('')
					setRefreshInterval(false)
					localStorage.removeItem('authToken')
					resolve('Logged out successfully')
				})
				.catch((error) => {
					console.error('Error logging out', error)
					reject(error)
				})
		})
	}, [setAuthToken, setRefreshInterval])

	const refreshAuthToken = useCallback(() => {
		return new Promise((resolve, reject) => {
			apiGet('/api/auth/refresh')
				.then((data) => {
					if (data.access_token) {
						setAuthToken(data.access_token)
						setRefreshInterval(true)
						localStorage.setItem('authToken', data.access_token)
						resolve(data.access_token)
					} else {
						reject(new Error('No access token'))
					}
				})
				.catch((err) => {
					console.log('User not logged in')
					reject(err)
				})
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
						setRefreshInterval(true)
						localStorage.setItem('authToken', data.access_token)
					}
					return data
				})
				.catch((err) => {
					console.error('Error logging in', err)
					return { error: err.message }
				})
		},
		[setAuthToken, setRefreshInterval]
	)

	return {
		authToken,
		logOut,
		refreshAuthToken,
		login,
	}
}

export default useAuth
