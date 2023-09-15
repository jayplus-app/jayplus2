import './DescriptionField.css'

interface DescriptionFieldProps {
	content: string
	className?: string
}

const DescriptionField = ({ content, className }: DescriptionFieldProps) => {
	return (
		<div id="description-field" className={className}>
			{content}
		</div>
	)
}

export default DescriptionField
