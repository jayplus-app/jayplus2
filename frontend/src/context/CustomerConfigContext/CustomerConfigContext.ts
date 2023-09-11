import { createContext } from 'react'

export const defaultAppConfig = { maxFutureBookingDays: 5 }
export const defaultCssConfig = {
	primaryColorLight: '#FFC960',
	primaryColorDark: '#ffaf14',
	secondaryColorLight: '#f8f9fa',
	secondaryColorDark: '#ced4da',
	secondaryColorDarker: '#b1bbc4',
	complementaryColorLight: '#eaf0f0',
	complementaryColorDark: '#45645b',
	disableColor: '#f3f3f3',
}

const CustomerConfigContext = createContext({
	appConfig: defaultAppConfig,
	cssConfig: defaultCssConfig,
	isLoadingConfig: true,
})

export default CustomerConfigContext
