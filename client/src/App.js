import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		personService.getAll().then(response => {
			setPersons(response.data)
		})
	}, [])

	const handleSubmit = e => {
		e.preventDefault()

		const existedPerson = persons.filter(person => person.name === newName)
		if (existedPerson.length > 0) {
			const id = existedPerson[0].id
			const changedPerson = { ...existedPerson, number: newNumber }
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				personService.update(id, changedPerson).then(returnedPerson => {
					setPersons(
						persons.map(person =>
							person.id !== id ? person : returnedPerson
						)
					)
				})
			}
		} else {
			personService
				.create({
					name: `${newName}`,
					number: `${newNumber}`
				})
				.then(response => {
					setPersons(persons.concat(response.data))
				})
			setNotification(`Added ${newName}`)
			setTimeout(() => {
				setNotification(null)
			}, 2000)
		}
		setNewName('')
		setNewNumber('')
	}

	const handleDelete = e => {
		const id = e.target.id
		if (window.confirm(`Delete ${e.target.name} ?`)) {
			personService.handleDelete(id).then(response => {
				setPersons(persons.filter(person => person.id !== id))
				personService.getAll().then(response => {
					setPersons(response.data)
				})
			})
		}
	}

	const handleNameChange = e => {
		setNewName(e.target.value)
	}

	const handleNumberChange = e => {
		setNewNumber(e.target.value)
	}

	const handleFilterChange = e => {
		setFilter(e.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification} />
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>add a new</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons
				persons={persons}
				filter={filter}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default App
