import './ButtonMD.css'

interface ButtonMDProps {
	children: React.ReactNode
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	color?: string
	bgColor?: string
	bgColorHover?: string
	disabled?: boolean
	bold?: boolean
}

const ButtonMD = ({
	children,
	type,
	onClick,
	color,
	bgColor,
	bgColorHover,
	disabled,
	bold,
}: ButtonMDProps) => {
	return (
		<button
			className="buttonMD"
			type={type}
			onClick={onClick}
			style={
				{
					'--button-md-bg-color': bgColor,
					'--button-md-bg-color-hover': bgColorHover,
					fontWeight: bold ? 'bold' : 'normal',
					color: color,
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
	color: 'black',
	bgColor: 'var(--secondaryColorDark)',
	bgColorHover: 'var(--secondaryColorDarker)',
}

export default ButtonMD
