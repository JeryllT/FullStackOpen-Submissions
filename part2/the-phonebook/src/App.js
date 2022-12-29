import React from 'react'
import { useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newConsistOf, setConsistOf] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setConsistOf(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const number = persons.find(person => person.number === newNumber)
    
    if (name && number) return (alert(`Both ${newName} and ${newNumber} were already added to phonebook`))
    else if (number) return ( alert(`${newNumber} was already added to phonebook`))
    else if (name) return ( alert(`${newName} was already added to phonebook`))
    
    const newPerson = {name: newName, number: newNumber}
    
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newConsistOf ? persons.filter(person => person.name.includes(newConsistOf)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter startValue={newConsistOf} filter={handleFilter} />
      <h3>Add a New</h3>
      <PersonForm onSubmit={handleSubmit} nameStartVal={newName} handleNewName={handleNewName} numStartVal={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons people={personsToShow} />
    </div>
  )
}

export default App