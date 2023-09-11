import { ReactNode, useState, useRef, useEffect } from 'react'
import AuthContext from './AuthContext'
import { apiGet } from '../../utils/apiUtils'

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authToken, setAuthToken] = useState('')
	const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const setRefreshInterval = (shouldStart: boolean) => {
		if (shouldStart) {
			tickIntervalRef.current = setInterval(() => {
				apiGet('/api/auth/refresh')
					.then((data) => {
						if (data.access_token) {
							setAuthToken(data.access_token)
						}
					})
					.catch((err) => {
						console.error('Error:', err.message)
					})
			}, 900000) // 15 minutes
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
