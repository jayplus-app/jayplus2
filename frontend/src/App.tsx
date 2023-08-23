import { useEffect, useState } from 'react'

function App() {
	const [message, setMessage] = useState<string | null>(null)

	useEffect(() => {
		fetch(
			'/hello'
		)
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error('Error fetching data: ', error))
	}, [])

	return (
		<div className="App">
			<header className="App-header">
				{message ? <p>{message}</p> : <p>Loading...</p>}
			</header>
		</div>
	)
}

export default App
