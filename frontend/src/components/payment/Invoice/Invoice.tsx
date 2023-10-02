import {
	extractDateFromISOString,
	extractTimeFromISOString,
} from '../../../utils'
import { apiGet } from '../../../utils/apiUtils'
import './Invoice.css'
import { useEffect, useState } from 'react'

interface Invoice {
	bookingID: number
	transactionID: number
	billNumber: number
	status: string
	vehicleType: string
	serviceType: string
	datetime: string
	serviceCost: number
	discount: number
	total: number
	deposit: number
	remaining: number
}

const Invoice = () => {
	const [invoice, setInvoice] = useState<Invoice>({
		bookingID: 0,
		transactionID: 0,
		billNumber: 0,
		status: '',
		vehicleType: '',
		serviceType: '',
		datetime: '',
		serviceCost: 0,
		discount: 0,
		total: 0,
		deposit: 0,
		remaining: 0,
	})

	useEffect(() => {
		apiGet('/api/payment/invoice/1')
			.then((res) => setInvoice(res))
			.catch((err) => console.error(err))
	}, [])

	return (
		<div id="invoice">
			<table>
				<tbody>
					<tr>
						<td>Booking Number</td>
						<td>{invoice.bookingID}</td>
					</tr>
					<tr>
						<td>Transaction Number</td>
						<td>{invoice.transactionID}</td>
					</tr>
					<tr>
						<td>Bill Number</td>
						<td>{invoice.billNumber}</td>
					</tr>
					<tr>
						<td>Status</td>
						<td>{invoice.status}</td>
					</tr>
					<tr>
						<td>Vehicle Type</td>
						<td>{invoice.vehicleType}</td>
					</tr>
					<tr>
						<td>Service Type</td>
						<td>{invoice.serviceType}</td>
					</tr>
					<tr>
						<td>Date</td>
						<td>{extractDateFromISOString(invoice.datetime)}</td>
					</tr>
					<tr>
						<td>Time</td>
						<td>{extractTimeFromISOString(invoice.datetime)}</td>
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
