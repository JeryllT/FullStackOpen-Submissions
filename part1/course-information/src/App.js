import React from 'react';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
        name: 'state of a component',
        exercise: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
}

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => (
    <>
      <Part part={props.parts[0]['name']} exercise={props.parts[0]['exercise']} />
      <Part part={props.parts[1]['name']} exercise={props.parts[1]['exercise']} />
      <Part part={props.parts[2]['name']} exercise={props.parts[2]['exercise']} />
    </>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Total = (props) => (
  <p> {props.exercises[0]['exercise'] + props.exercises[1]['exercise'] + props.exercises[2]['exercise']} </p>
)

export default App;
