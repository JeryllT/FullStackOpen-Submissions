import React from "react"

const People = ({person}) => <p>{person.name} {person.number}</p>
const Persons = ({people}) => people.map((person, index) => <People key={index} person={person}/>)

export default Persons