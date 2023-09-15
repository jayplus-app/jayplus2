import { createContext } from 'react'

export const defaultAppConfig = { maxFutureBookingDays: 5 }
export const defaultCssConfig = {
	primaryColorLight: '#ffd27a',
	primaryColorDark: '#ffaf14',
	secondaryColorLight: '#f8f9fa',
	secondaryColorDark: '#ced4da',
	secondaryColorDarker: '#b1bbc4',
	secondaryColorDarkest: '#404040',
	complementaryColorLight: '#eaf0f0',
	complementaryColorDark: '#45645b',
	disableColor: '#f3f3f3',
}

interface CustomerConfigContextProps {
	appConfig: typeof defaultAppConfig
	cssConfig: typeof defaultCssConfig
	isLoadingConfig: boolean
}

const CustomerConfigContext = createContext<CustomerConfigContextProps>({
	appConfig: defaultAppConfig,
	cssConfig: defaultCssConfig,
	isLoadingConfig: true,
})

export default CustomerConfigContext
