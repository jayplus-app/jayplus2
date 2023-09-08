import './NextDayButton.css'

interface NextDayButtonProps {
	onClick: () => void
	disabled: boolean
}

const NextDayButton = ({ onClick, disabled }: NextDayButtonProps) => {
	return (
		<button id="next-day-button" onClick={onClick} disabled={disabled}>
			{'>>'}
		</button>
	)
}

export default NextDayButton
