import './ButtonMD.css'

interface ButtonMDProps {
	children: React.ReactNode
	onClick?: () => void
	bgColor?: string
	bgColorHover?: string
	disabled?: boolean
}

const ButtonMD = ({
	children,
	onClick,
	bgColor,
	bgColorHover,
	disabled,
}: ButtonMDProps) => {
	return (
		<button
			className="buttonMD"
			onClick={onClick}
			style={
				{
					'--button-md-bg-color': bgColor,
					'--button-md-bg-color-hover': bgColorHover,
				} as React.CSSProperties
			}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

ButtonMD.defaultProps = {
	onClick: () => {},
	disabled: false,
	bgColor: 'var(--secondaryColorDark)',
	bgColorHover: 'var(--secondaryColorDarker)',
}

export default ButtonMD
