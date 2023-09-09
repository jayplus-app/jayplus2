import { createContext } from 'react'

export const defaultAppConfig = { maxFutureBookingDays: 5 }
export const defaultCssConfig = {
	primaryColor: '#FFC960',
	secondaryColorDark: '#ced4da',
	secondaryColorLight: '#f8f9fa',
	complementaryColorDark: '#45645b',
	complementaryColorLight: '#eaf0f0',
	disableColor: '#f3f3f3',
}

const CustomerConfigContext = createContext({
	appConfig: defaultAppConfig,
	cssConfig: defaultCssConfig,
	isLoadingConfig: true,
})

export default CustomerConfigContext
