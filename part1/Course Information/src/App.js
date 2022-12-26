import React from 'react'

/*
Example of a component to be rendered with .createRoot().render()
Components namings have to be capitalised.
All elements within, usually has to be wrapped in a "root" element.
(I.E returning the various greetings alone, without the outer div tag, in App function
 in App function might work but might also result in an error. To prevent unnecessary div tags,
 fragments can be used. Wrapping all greetings in <> </> will return elements without any outer elements)
*/
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

// const App = () => {
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name='Jeryll' />
//       <Hello name='Jeremy' />
//       <Hello name='Jamie' />
//     </div>
//   )
// }

// With fragmenting...
const App = () => {
  const name = 'Jeryll'
  const age = 25

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Hello name='Jeremy' age={24} />
      <Hello name='Jamie' age={22} />
    </>
  )
}

/*

//Without Fragmenting...

const App = () => {
  const name = 'Jeryll'
  const age = 25

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Hello name='Jeremy' age={24} />
      <Hello name='Jamie' age={22} />
    </div>
  )
}
*/

export default App;
