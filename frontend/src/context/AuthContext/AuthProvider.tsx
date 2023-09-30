import { ReactNode, useState, useRef, useEffect } from 'react'
import AuthContext from './AuthContext'
import { apiGet } from '../../utils/apiUtils'

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const initialToken = localStorage.getItem('authToken') || ''
	const [authToken, setAuthToken] = useState(initialToken)
	const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const setRefreshInterval = (shouldStart: boolean) => {
		if (shouldStart) {
			tickIntervalRef.current = setInterval(() => {
				apiGet('/api/auth/refresh')
					.then((data) => {
						if (data.access_token) {
							setAuthToken(data.access_token)
							localStorage.setItem('authToken', data.access_token)
						}
					})
					.catch((err) => {
						console.log(err.message)
					})
			}, 840000) // 14 minutes
		} else {
			if (tickIntervalRef.current) {
				clearInterval(tickIntervalRef.current)
				tickIntervalRef.current = null
			}
		}
	}

	useEffect(() => {
		return () => {
			if (tickIntervalRef.current) {
				clearInterval(tickIntervalRef.current)
			}
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				authToken,
				setAuthToken,
				setRefreshInterval,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
