const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('number', function (req, res){
  if (req.method === 'POST') return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :number'))

const PORT=3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

let entries = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/info', (request, response) => {
  
  const numPersons = entries.length
  const currentDT = new Date()
  const toSend = (`
    <p>Phonebook has info for ${numPersons} people</p>
    <p>${currentDT}</p>
    `
  )
  response.send(toSend)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const entry = entries.find(entry => entry.id === id)
  if (!entry) {
    response.status(404).json({error : 'ID does not exist'})
  } else {
    response.json(entry)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  entries = entries.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const id = Math.floor(Math.random() * 1000)
  const inEntries = entries.find(entry => entry.name === body.name)

  if (!body.name && !body.number) response.status(404).json({error: 'both name and number is missing'})
  else if (!body.name) response.status(404).json({error: 'name is missing'})
  else if (!body.number) response.status(404).json({error: 'number is missing'})
  else if (inEntries) response.status(404).json({error: 'name must be unique'})
  else {
    const newEntry = {
      id: id,
      name: body.name,
      number: body.number
    }
    entries.push(newEntry)
    response.json(newEntry)
  }

  console.log(entries)
})