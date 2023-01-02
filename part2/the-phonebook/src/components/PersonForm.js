import React from "react"

const Name = ({startVal, handleChange}) => <div>Name: <input value={startVal} onChange={handleChange} required/></div>
const Number = ({startVal, handleChange}) => <div>Number: <input value={startVal} onChange={handleChange} required/></div>

const PersonForm = ({onSubmit, nameStartVal, handleNewName, numStartVal, handleNewNumber }) => (
  <form onSubmit={onSubmit}>
    <Name startVal={nameStartVal} handleChange={handleNewName} />
    <Number startVal={numStartVal} handleChange={handleNewNumber} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm