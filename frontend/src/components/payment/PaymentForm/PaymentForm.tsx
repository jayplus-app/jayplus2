import ButtonMD from '../../system/buttons/ButtonMD'

const PaymentForm = () => {
	return (
		<div>
			<h1>Payment Form</h1>
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
				<ButtonMD />
				<ButtonMD />
			</form>
		</div>
	)
}

export default PaymentForm
