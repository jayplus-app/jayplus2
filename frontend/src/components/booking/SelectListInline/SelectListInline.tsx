import './SelectListInline.css'
import { ChangeEvent, useContext, useState } from 'react'
import BookingContext from '../../../context/BookingContext/BookingContext'

export interface Options {
	id: string
	name: string
	icon?: string
}

interface SelectListInlineProps {
	options: Options[]
	className?: string
	name: string
	select: (id: string) => void
}

const SelectListInline = ({
	options,
	name,
	className,
	select,
}: SelectListInlineProps) => {
	const [selected, setSelected] = useState(`${name}-${options[0].id}`)
	const { setServiceCost, setDateTimeSelected } = useContext(BookingContext)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelected(e.currentTarget.value)
		select(e.currentTarget.value)
		setDateTimeSelected('')
		setServiceCost(100)
	}

	return (
		<ul id="select-list-inline" className={className}>
			{options.map((option) => (
				<li id="select-list-item" key={option.id}>
					<input
						className="select-list-input"
						type="radio"
						id={`${name}-${option.id}`}
						name={name}
						value={`${name}-${option.id}`}
						checked={selected === `${name}-${option.id}`}
						onChange={handleChange}
					/>
					<label
						htmlFor={`${name}-${option.id}`}
						className="select-list-label"
					>
						{option.icon && <img src={option.icon} alt={''} />}
						<span>{option.name}</span>
					</label>
				</li>
			))}
		</ul>
	)
}

export default SelectListInline
