import { ReactNode, useEffect, useMemo, useState } from 'react'
import SystemContext from './SystemContext'

interface SystemProviderProps {
	children: ReactNode
}

const SystemProvider = ({ children }: SystemProviderProps) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const contextValue = useMemo(
		() => ({
			windowWidth,
			setWindowWidth,
		}),
		[windowWidth, setWindowWidth]
	)

	return (
		<SystemContext.Provider value={contextValue}>
			{children}
		</SystemContext.Provider>
	)
}

export default SystemProvider
