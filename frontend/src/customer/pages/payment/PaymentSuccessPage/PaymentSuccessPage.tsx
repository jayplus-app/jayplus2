import Invoice from '../../../../components/payment/Invoice'
import ButtonMD from '../../../../components/system/buttons/ButtonMD'

const PaymentSuccessPage = () => {
	return (
		<div>
			<h1>Payment Success Page</h1>
			<h2>Done Successfully</h2>
			<Invoice />
			<ButtonMD />
		</div>
	)
}

export default PaymentSuccessPage
