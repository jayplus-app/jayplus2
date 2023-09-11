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

	// Set CSS variables
	document.documentElement.style.setProperty(
		'--primaryColorLight',
		cssConfig.primaryColorLight
	)
	document.documentElement.style.setProperty(
		'--primaryColorDark',
		cssConfig.primaryColorDark
	)
	document.documentElement.style.setProperty(
		'--secondaryColorDark',
		cssConfig.secondaryColorDark
	)
	document.documentElement.style.setProperty(
		'--secondaryColorLight',
		cssConfig.secondaryColorLight
	)
	document.documentElement.style.setProperty(
		'--complementaryColorDark',
		cssConfig.complementaryColorDark
	)
	document.documentElement.style.setProperty(
		'--complementaryColorLight',
		cssConfig.complementaryColorLight
	)
	document.documentElement.style.setProperty(
		'--disableColor',
		cssConfig.disableColor
	)

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
