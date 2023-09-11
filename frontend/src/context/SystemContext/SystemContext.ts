import { createContext } from 'react'

interface SystemContextProps {
	windowWidth: number
	setWindowWidth: (width: number) => void
}

const SystemContext = createContext<SystemContextProps>(
	{} as SystemContextProps
)

export default SystemContext
