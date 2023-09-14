import './AdminLoginPage.css'
import LoginForm from '../../../../components/auth/LoginForm'
import useAuth from '../../../../hooks/auth/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {
	const { authToken } = useAuth()
	const [shouldRender, setShouldRender] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		if (authToken !== '') {
			navigate('/admin')
		} else {
			setShouldRender(true)
		}
	})

	return shouldRender ? (
		<div id="AdminLogin">
			<h1>Admin Login</h1>
			<LoginForm />
		</div>
	) : null
}

export default AdminLoginPage
