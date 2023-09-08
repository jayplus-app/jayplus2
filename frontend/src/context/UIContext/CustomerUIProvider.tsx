import React, { useEffect, useMemo, useState } from 'react'
import CustomerUIContext from './CustomerUIContext'

interface CustomerUIProviderProps {
	children: React.ReactNode
}

const CustomerUIProvider = ({ children }: CustomerUIProviderProps) => {
	const [maxFutureBookingDays, setMaxFutureBookingDays] = useState<number>(5)
	const [primaryColor, setPrimaryColor] = useState<string>('#FFC960')
	const [secondaryColor, setSecondaryColor] = useState<string>('#ced4da')
	const [isLoadingUI, setIsLoadingUI] = useState(true)

	useEffect(() => {
		fetch('/api/app/ui-config')
			.then((res) => res.json())
			.then((data) => {
				setMaxFutureBookingDays(data.maxFutureBookingDays)
				setPrimaryColor(data.primaryColor)
				setSecondaryColor(data.secondaryColor)
				setIsLoadingUI(false)
			})
			.catch((err) => {
				console.error('Failed to fetch UI config:', err)
				setIsLoadingUI(false)
			})
	}, [])

	const contextValue = useMemo(
		() => ({
			maxFutureBookingDays,
			primaryColor,
			secondaryColor,
			isLoadingUI,
		}),
		[maxFutureBookingDays, setMaxFutureBookingDays, isLoadingUI]
	)

	return (
		<CustomerUIContext.Provider value={contextValue}>
			{children}
		</CustomerUIContext.Provider>
	)
}

export default CustomerUIProvider
