import './LoginForm.css'
import { useState, useCallback } from 'react'
import useAuth from '../../../hooks/auth/useAuth'
import { useNavigate } from 'react-router-dom'
import ButtonMD from '../../system/buttons/ButtonMD'

const LoginForm = () => {
	const { login } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')

	const navigate = useNavigate()

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			const data = await login(email, password)
			if (data.error) {
				setLoginError(data.message || 'Failed to login')
			} else {
				setLoginError('')
				navigate('/admin')
			}
		},
		[email, password, login]
	)

	return (
		<form id="login-form" onSubmit={handleSubmit}>
			{loginError && <p className="login-error">{loginError}</p>}
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
			<div className="form-button">
				<ButtonMD
					type="submit"
					bgColor="#FFC960"
					bgColorHover="#ffaf14"
				>
					Login
				</ButtonMD>
			</div>
		</form>
	)
}

export default LoginForm
