import React, { useEffect, useMemo, useState } from 'react'
import CustomerConfigContext, {
	defaultAppConfig,
	defaultCssConfig,
} from './CustomerConfigContext'
import { apiGet } from '../../utils/apiUtils'

interface CustomerConfigProviderProps {
	children: React.ReactNode
}

const CustomerConfigProvider = ({ children }: CustomerConfigProviderProps) => {
	const [appConfig, setAppConfig] = useState(defaultAppConfig)
	const [cssConfig, setCssConfig] = useState(defaultCssConfig)

	const [isLoadingConfig, setIsLoadingConfig] = useState(true)

	const setCssVariables = (cssConfig: typeof defaultCssConfig) => {
		Object.keys(cssConfig).forEach((key) => {
			document.documentElement.style.setProperty(
				`--${key}`,
				cssConfig[key as keyof typeof cssConfig]
			)
		})
	}

	useEffect(() => {
		apiGet('/api/app/ui-config')
			.then((data) => {
				setCssConfig(data)
				setIsLoadingConfig(false)
			})
			.catch((err) => {
				console.error('Failed to fetch UI config:', err)
				setIsLoadingConfig(false)
			})

		apiGet('/api/app/booking-config')
			.then((data) => {
				console.log('booking config:', data)
				setAppConfig(data)
				setIsLoadingConfig(false)
			})
			.catch((err) => {
				console.error('Failed to fetch booking config:', err)
				setIsLoadingConfig(false)
			})
	}, [])

	setCssVariables(cssConfig)

	const contextValue = useMemo(
		() => ({
			appConfig,
			cssConfig,
			isLoadingConfig: isLoadingConfig,
		}),
		[appConfig, cssConfig, isLoadingConfig]
	)

	return (
		<CustomerConfigContext.Provider value={contextValue}>
			{children}
		</CustomerConfigContext.Provider>
	)
}

export default CustomerConfigProvider
