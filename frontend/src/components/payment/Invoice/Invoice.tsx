const Invoice = () => {
	const invoiceData = {
		transactionNumber: 13,
		billNumber: 37,
		typeOfService: 'Show Room',
		vehicleType: 'Sedan',
		date: '14 Mar 2023',
		time: '15:00',
		serviceCost: '169.00 $',
		discount: 'Not Specified',
		total: '169.00 $',
		deposit: '30.00 $',
		remaining: '139.00 $',
	}
	return (
		<div>
			<h1>Invoice</h1>
			<table>
				<tbody>
					<tr>
						<td>Transaction Number</td>
						<td>{invoiceData.transactionNumber}</td>
					</tr>
					<tr>
						<td>Bill Number</td>
						<td>{invoiceData.billNumber}</td>
					</tr>
					<tr>
						<td>Type of Service</td>
						<td>{invoiceData.typeOfService}</td>
					</tr>
					<tr>
						<td>Vehicle Type</td>
						<td>{invoiceData.vehicleType}</td>
					</tr>
					<tr>
						<td>Date</td>
						<td>{invoiceData.date}</td>
					</tr>
					<tr>
						<td>Time</td>
						<td>{invoiceData.time}</td>
					</tr>
					<tr>
						<td>Service Cost</td>
						<td>{invoiceData.serviceCost}</td>
					</tr>
					<tr>
						<td>Discount</td>
						<td>{invoiceData.discount}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td>{invoiceData.total}</td>
					</tr>
					<tr>
						<td>Deposit</td>
						<td>{invoiceData.deposit}</td>
					</tr>
					<tr>
						<td>Remaining</td>
						<td>{invoiceData.remaining}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Invoice
