import React from 'react'

export default ({ persons, filter, handleDelete }) => {
	return persons.map(person => {
		return (
			person.name.toLowerCase().includes(filter.toLowerCase()) && (
				<p key={person.name}>
					{person.name} {person.number}
					<button
						id={person.id}
						name={person.name}
						onClick={handleDelete}
					>
						delete
					</button>
				</p>
			)
		)
	})
}
