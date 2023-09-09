import './DescriptionField.css'

interface DescriptionFieldProps {
	content: string
}

const DescriptionField = ({ content }: DescriptionFieldProps) => {
	return <div id="description-field">{content}</div>
}

export default DescriptionField
