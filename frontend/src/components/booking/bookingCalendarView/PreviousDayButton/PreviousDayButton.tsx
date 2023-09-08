import './PreviousDayButton.css'

interface PreviousDayButtonProps {
	onClick: () => void
	disabled: boolean
}

const PreviousDayButton = ({ onClick, disabled }: PreviousDayButtonProps) => {
	return (
		<button id="previous-day-button" onClick={onClick} disabled={disabled}>
			{'<<'}
		</button>
	)
}

export default PreviousDayButton
