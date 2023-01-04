import React from "react"

const People = ({person, handleDelete}) => (
    <p>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.name, person.id)} >delete</button>
    </p>
)
const Persons = ({people, handleDelete}) => 
    people.map((person, index) => <People key={index} person={person} handleDelete={handleDelete}/>)

export default Persons