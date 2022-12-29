import React from 'react';

const CurHeader = ({text}) => <h1>{text}</h1>

const CourseHeader = ({text}) => <h2>{text}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} content={part}/>)}
  </div>
)

const Part = ({content}) => <p>{content.name} {content.exercises}</p>

const Total = ({parts}) => {
  const sum = parts.reduce((acc, curVal) => acc + curVal.exercises, 0)
  return <h3>Total of {sum} exercies</h3>
}

const Course = ({course}) => {
  
  return (
    <div>
      <CourseHeader text={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Courses = ({courses}) => (
  <div>
    <CurHeader text="Web development curriculum"/>
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  </div>
)

export default Courses