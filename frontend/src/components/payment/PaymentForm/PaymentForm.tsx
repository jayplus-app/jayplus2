import './PaymentForm.css'
import ButtonMD from '../../system/buttons/ButtonMD'
import { useNavigate } from 'react-router-dom'

const PaymentForm = () => {
	const navigate = useNavigate()

	return (
		<div id="payment-form">
			<form action="">
				<label htmlFor="">Card Number</label>
				<input type="text" />
				<label htmlFor="">Card Holder</label>
				<input type="text" />
				<label htmlFor="">Expiration Date</label>
				<input type="text" />
				<label htmlFor="">CVV</label>
				<input type="text" />
				<label htmlFor="">Phone Number</label>
				<input type="text" />
			</form>
			<div className="buttons">
				<ButtonMD
					bgColor="var(--secondaryColorDark)"
					bgColorHover="var(--secondaryColorDarker)"
					onClick={() => {
						navigate('/')
					}}
				>
					Cancel
				</ButtonMD>
				<ButtonMD
					bgColor="var(--primaryColorLight)"
					bgColorHover="var(--primaryColorDark)"
					onClick={() => {
						navigate('/payment-success')
					}}
				>
					Pay
				</ButtonMD>
			</div>
		</div>
	)
}

export default PaymentForm
