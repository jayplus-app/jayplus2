import React, { useEffect, useMemo, useState } from 'react'
import CustomerConfigContext, {
	defaultAppConfig,
	defaultCssConfig,
} from './CustomerConfigContext'

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
		fetch('/api/app/ui-config')
			.then((res) => res.json())
			.then((data) => {
				setAppConfig(data.appConfig)
				setCssConfig(data.cssConfig)
				setIsLoadingConfig(false)
			})
			.catch((err) => {
				console.error('Failed to fetch UI config:', err)
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
