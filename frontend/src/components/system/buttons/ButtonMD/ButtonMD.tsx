interface ButtonMDProps {
	children: React.ReactNode
	onClick?: () => void
}

const ButtonMD = ({ onClick, children }: ButtonMDProps) => {
	return <button onClick={onClick}>{children}</button>
}

ButtonMD.defaultProps = {
	onClick: () => {},
}

export default ButtonMD
