require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons.map(person => person.toJSON()))
	})
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person.toJSON())
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(result => res.status(204).end())
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const { name, number } = req.body

	const person = new Person({
		name,
		number
	})

	person
		.save()
		.then(savedPerson => {
			res.json(savedPerson.toJSON())
		})
		.catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
	console.log(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
