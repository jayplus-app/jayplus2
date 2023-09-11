export const apiGet = async (url: string) => {
	try {
		const res = await fetch(url, {
			method: 'GET',
			credentials: 'include',
		})
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		throw error
	}
}

export const apiPost = async (url: string, payload: any) => {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(payload),
		})
		if (!res.ok) throw new Error('Failed to post')
		return res.json()
	} catch (error) {
		throw error
	}
}
