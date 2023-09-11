import './PreviousDayButton.css'

interface PreviousDayButtonProps {
	onClick: () => void
	disabled: boolean
	bgColor?: string
	bgColorHover?: string
}

const PreviousDayButton = ({
	onClick,
	disabled,
	bgColor,
	bgColorHover,
}: PreviousDayButtonProps) => {
	return (
		<button
			id="previous-day-button"
			onClick={onClick}
			disabled={disabled}
			style={
				{
					'--previous-day-button-bg-color': bgColor,
					'--previous-day-button-bg-color-hover': bgColorHover,
				} as React.CSSProperties
			}
		>
			{'<<'}
		</button>
	)
}
PreviousDayButton.defaultProps = {
	onClick: () => {},
	disabled: false,
	bgColor: 'var(--secondaryColorDark)',
	bgColorHover: 'var(--secondaryColorDarker)',
}

export default PreviousDayButton
