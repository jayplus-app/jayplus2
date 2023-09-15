export const apiGet = async (url: string, authToken: string | null = null) => {
	const headers: any = {}

	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`
	}

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers,
			credentials: 'include',
		})
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		throw error
	}
}

export const apiPost = async (
	url: string,
	payload: any,
	authToken: string | null = null
) => {
	const headers: any = {
		'Content-Type': 'application/json',
	}

	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`
	}

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers,
			credentials: 'include',
			body: JSON.stringify(payload),
		})
		if (!res.ok) throw new Error('Failed to post')
		return res.json()
	} catch (error) {
		throw error
	}
}
