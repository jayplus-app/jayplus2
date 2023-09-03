import { FormEvent, useState } from 'react'
import './AdminLogin.css'

const AdminLogin = () => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault()

		if (!username || !password) {
			setError('Both fields are required')
			return
		} else {
			setError(null)
		}

		// Here you can make an API call to validate the admin user
		// try {
		// 	const response = await fetch('/api/hello', {
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		// body: JSON.stringify({ username, password }),
		// 	})

		// 	const data = await response.json()

		// 	if (data.success) {
		// 		// Navigate to admin dashboard or do something
		// 		console.log(data)
		// 	} else {
		// 		setError('Invalid username or password')
		// 	}

		// 	console.log('Admin login successful')
		// } catch (error) {
		// 	setError('An error occurred')
		// 	console.error(error)
		// }
		fetch('/api/hello', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			// body: JSON.stringify({ username, password }),
		}).then((res) => {
			// Write the json resopnse to the console
			console.log(res.json())
		})
	}

	return (
		<div id="AdminLogin">
			<h1>Admin Login</h1>
			<form onSubmit={handleLogin}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
				{error && <p className="error">{error}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default AdminLogin
