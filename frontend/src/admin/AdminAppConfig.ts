// CSS Config
export const cssConfig = {
	primaryColorLight: '#FFC960',
	primaryColorDark: '#ffaf14',
	secondaryColorLight: '#f2f2f2',
	secondaryColorDark: '#757575',
	secondaryColorDarker: '#404040',
	complementaryColorLight: '#eaf0f0',
	complementaryColorDark: '#45645b',
	disableColor: '#f3f3f3',
}

export const setAdminCssVariables = () => {
	for (const [key, value] of Object.entries(cssConfig)) {
		document.documentElement.style.setProperty(`--${key}`, value)
	}
}
