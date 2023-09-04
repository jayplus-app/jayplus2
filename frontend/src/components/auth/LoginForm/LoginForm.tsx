import { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const { setAuthToken, setRefreshInterval } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')

	const navigate = useNavigate()

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const payload = {
				email: email,
				password: password,
			}

			const options: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(payload),
			}

			fetch('/api/auth/login', options)
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						setLoginError(data.message)
					} else {
						setAuthToken(data.access_token)
						setLoginError('')
						navigate('/admin/booking')
						setRefreshInterval(true)
					}
				})
				.catch((err) => {
					setLoginError(err.message)
				})
		},
		[email, password, navigate, setAuthToken, setRefreshInterval]
	)

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="username">Username</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{loginError && <p className="error">{loginError}</p>}
			<button type="submit">Login</button>
		</form>
	)
}

export default LoginForm
