import React from 'react'

export default ({ filter, handleFilterChange }) => {
	return (
		<div>
			filter shown with{' '}
			<input value={filter} onChange={handleFilterChange} />
		</div>
	)
}
