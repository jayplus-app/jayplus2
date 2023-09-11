import './Invoice.css'
import { useEffect, useState } from 'react'

interface Invoice {
	transactionNumber: number
	billNumber: number
	typeOfService: string
	vehicleType: string
	date: string
	time: string
	serviceCost: string
	discount: string
	total: string
	deposit: string
	remaining: string
}

const Invoice = () => {
	const [invoice, setInvoice] = useState<Invoice>({
		transactionNumber: 0,
		billNumber: 0,
		typeOfService: 'N/A',
		vehicleType: 'N/A',
		date: 'N/A',
		time: 'N/A',
		serviceCost: '0.00 $',
		discount: 'N/A',
		total: '0.00 $',
		deposit: '0.00 $',
		remaining: '0.00 $',
	})

	useEffect(() => {
		fetch('/api/payment/invoice')
			.then((res) => res.json())
			.then((data) => {
				setInvoice(data)
			})
			.catch((err) => console.error(err))
	}, [])

	return (
		<div id="invoice">
			<table>
				<tbody>
					<tr>
						<td>Transaction Number</td>
						<td>{invoice.transactionNumber}</td>
					</tr>
					<tr>
						<td>Bill Number</td>
						<td>{invoice.billNumber}</td>
					</tr>
					<tr>
						<td>Type of Service</td>
						<td>{invoice.typeOfService}</td>
					</tr>
					<tr>
						<td>Vehicle Type</td>
						<td>{invoice.vehicleType}</td>
					</tr>
					<tr>
						<td>Date</td>
						<td>{invoice.date}</td>
					</tr>
					<tr>
						<td>Time</td>
						<td>{invoice.time}</td>
					</tr>
					<tr>
						<td>Service Cost</td>
						<td>{invoice.serviceCost}</td>
					</tr>
					<tr>
						<td>Discount</td>
						<td>{invoice.discount}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td>{invoice.total}</td>
					</tr>
					<tr>
						<td>Deposit</td>
						<td>{invoice.deposit}</td>
					</tr>
					<tr>
						<td>Remaining</td>
						<td>{invoice.remaining}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Invoice
