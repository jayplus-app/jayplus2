import './PaymentSuccessPage.css'
import { useNavigate } from 'react-router-dom'
import Invoice from '../../../../components/payment/Invoice'
import ButtonMD from '../../../../components/system/buttons/ButtonMD'

const PaymentSuccessPage = () => {
	const navigate = useNavigate()

	return (
		<div id="payment-success">
			<h2>DONE SUCCESSFULLY</h2>
			<Invoice />
			<div className="buttons">
				<ButtonMD
					onClick={() => {
						navigate('/')
					}}
					bgColor="var(--primaryColorLight)"
					bgColorHover="var(--primaryColorDark)"
				>
					Back to Booking
				</ButtonMD>
			</div>
		</div>
	)
}

export default PaymentSuccessPage
