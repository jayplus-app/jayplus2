// CSS Config
export const cssConfig = {
	primaryColorLight: '#ffd27a',
	primaryColorDark: '#ffaf14',
	secondaryColorLight: '#e9edf0',
	secondaryColorDark: '#ced4da',
	secondaryColorDarker: '#b1bbc4',
	secondaryColorDarkest: '#404040',
	complementaryColorLight: '#eaf0f0',
	complementaryColorDark: '#45645b',
	disableColor: '#f3f3f3',
}

export const setAdminCssVariables = () => {
	for (const [key, value] of Object.entries(cssConfig)) {
		document.documentElement.style.setProperty(`--${key}`, value)
	}
}
