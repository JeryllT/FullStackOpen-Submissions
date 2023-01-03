require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('number', function (req, res){
  if (req.method === 'POST') return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :number'))

const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
    Person
      .find({})
      .then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => response.json(person))
})

app.get('/api/info', (request, response) => {
  const currentDate = new Date()
  Person.find({}).then(result => {
    response.send(
      `<div>
          <p>Phonebook has info for ${result.length}</p>
          <p>${currentDate}</p>
      </div>`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  
  Person.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name && !body.number) return response.status(400).json({error: 'both name and number is missing'})

  const newEntry = new Person({
    name: body.name,
    number: body.number
  })

  newEntry
    .save()
    .then(savedEntry => response.json(savedEntry))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    {name, number},
    { new: true, runValidators: true, context : 'query' })
    .then(result => response.json(result))
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') return response.status(400).json({error: 'malformatted id'})
  else if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  next(error)
} 

app.use(errorHandler)