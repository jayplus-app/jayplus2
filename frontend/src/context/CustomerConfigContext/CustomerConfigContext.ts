import { createContext } from 'react'

interface AppConfig {
	maxFutureBookingDays: number
}

interface CSSConfig {
	primaryColor: string
	secondaryColor: string
}

interface CustomerConfigContextProps {
	appConfig: AppConfig
	cssConfig: CSSConfig
	isLoadingConfig: boolean
}

export const defaultAppConfig = { maxFutureBookingDays: 5 }
export const defaultCssConfig = {
	primaryColor: '#FFC960',
	secondaryColor: '#ced4da',
}

const CustomerConfigContext = createContext({
	appConfig: defaultAppConfig,
	cssConfig: defaultCssConfig,
	isLoadingConfig: true,
})

export default CustomerConfigContext
