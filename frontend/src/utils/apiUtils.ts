/**
 * Sends a GET request to the given URL.
 *
 * @param url - The API endpoint URL.
 * @param authToken - The optional authentication token for the request.
 * @returns - The JSON response from the API.
 * @throws - Throws an error if the request fails or if the API returns an error response.
 */
export const apiGet = async (url: string, authToken: string | null = null) => {
	return apiRequest('GET', url, null, authToken)
}

/**
 * Sends a POST request to the given URL with the provided payload.
 *
 * @param url - The API endpoint URL.
 * @param payload - The request payload.
 * @param authToken - The optional authentication token for the request.
 * @returns - The JSON response from the API.
 * @throws - Throws an error if the request fails or if the API returns an error response.
 */
export const apiPost = async (
	url: string,
	payload: Record<string, any>,
	authToken: string | null = null
) => {
	return apiRequest('POST', url, payload, authToken)
}

const apiRequest = async (
	method: 'GET' | 'POST',
	url: string,
	payload: Record<string, any> | null,
	authToken: string | null
) => {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	}

	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`
	}

	try {
		const res = await fetch(url, {
			method,
			headers,
			credentials: 'include',
			body: payload ? JSON.stringify(payload) : undefined,
		})

		if (!res.ok) {
			const responseBody = await res.json()
			throw new Error(
				responseBody.message || `Failed to ${method.toLowerCase()}`
			)
		}

		return res.json()
	} catch (error) {
		throw error
	}
}
