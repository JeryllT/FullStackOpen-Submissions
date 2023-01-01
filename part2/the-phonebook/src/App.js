import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phbookServices from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newConsistOf, setConsistOf] = useState('')
  const [newNotification, setNotification] = useState(null)
  const [newNotiColor, setNotiColor] = useState(null)

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setConsistOf(event.target.value)

  const effect = () => {
      phbookServices.getRecords()
      .then(records => {
        setPersons(records)
      })
  }

  useEffect(effect, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (name) {
      const status = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      if (status) {
        const updatedPerson = {...name, number:newNumber}
        phbookServices
          .update(name.id, updatedPerson)
          .then( () => {
            setPersons(persons.map(person => person.id === name.id ? updatedPerson : person))
            setNewName('')
            setNewNumber('')

            setNotiColor('green')
            setNotification(`Updated ${updatedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
              setNotiColor(null)
              }, 5000)
            }
          )
          .catch(error => {

            setNotiColor('red')
            setNotification(`Information of ${updatedPerson.name} has already been removed from server`)
            setPersons(persons.filter(person => person.name !== updatedPerson.name))
            setTimeout(() => {
              setNotification(null)
              setNotiColor(null)
              }, 5000)
          })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      phbookServices
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')

          setNotiColor('green')
          setNotification(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotification(null)
            setNotiColor(null)
            }, 5000)
        } 
        )
    }
  }

  const handleDelete = (name, id) => {
    let status = window.confirm(`Delete ${name}?`)
    if (status) {
      phbookServices
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const personsToShow = newConsistOf ? persons.filter(person => person.name.includes(newConsistOf)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} color={newNotiColor} />
      <Filter startValue={newConsistOf} filter={handleFilter} />
      <h3>Add a New</h3>
      <PersonForm onSubmit={handleSubmit} nameStartVal={newName} handleNewName={handleNewName} numStartVal={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons people={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App