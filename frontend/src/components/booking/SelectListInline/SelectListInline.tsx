import { ChangeEvent, useContext, useState } from 'react'
import CustomerBookingContext from '../../../context/CustomerBookingContext/CustomerBookingContext'

export interface Options {
	id: string
	name: string
	icon?: string
}

interface SelectListInlineProps {
	options: Options[]
	name: string
	select: (id: string) => void
}

const SelectListInline = ({ options, name, select }: SelectListInlineProps) => {
	const [selected, setSelected] = useState('')
	const {
		vehicleTypeSelected,
		serviceTypeSelected,
		setServiceCost,
		setDateTimeSelected,
	} = useContext(CustomerBookingContext)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelected(e.currentTarget.value)
		select(e.currentTarget.value)
		setDateTimeSelected('')
		setServiceCost(100)
	}

	return (
		<ul id="select-list-inline">
			{options.map((option) => (
				<li id="select-list-item">
					<input
						className="select-list-input"
						type="radio"
						id={option.name}
						name={name}
						value={option.id}
						checked={selected === option.id}
						onChange={handleChange}
					/>
					<label htmlFor={option.name} className="select-list-label">
						{option.icon && (
							<img
								src={option.icon}
								alt={`${option.name} icon`}
							/>
						)}
						<span>{option.name}</span>
					</label>
				</li>
			))}
		</ul>
	)
}

export default SelectListInline
