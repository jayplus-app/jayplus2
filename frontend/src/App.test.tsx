import { render, screen } from '@testing-library/react'
import CustomerApp from './customer/CustomerApp'

test('renders learn react link', () => {
	render(<CustomerApp />)
	const linkElement = screen.getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument()
})
