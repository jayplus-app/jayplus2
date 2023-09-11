import './NextDayButton.css'

interface NextDayButtonProps {
	onClick: () => void
	disabled: boolean
	bgColor?: string
	bgColorHover?: string
}

const NextDayButton = ({
	onClick,
	disabled,
	bgColor,
	bgColorHover,
}: NextDayButtonProps) => {
	return (
		<button
			id="next-day-button"
			onClick={onClick}
			disabled={disabled}
			style={
				{
					'--next-day-button-bg-color': bgColor,
					'--next-day-button-bg-color-hover': bgColorHover,
				} as React.CSSProperties
			}
		>
			{'>>'}
		</button>
	)
}

NextDayButton.defaultProps = {
	onClick: () => {},
	disabled: false,
	bgColor: 'var(--secondaryColorDark)',
	bgColorHover: 'var(--secondaryColorDarker)',
}

export default NextDayButton
