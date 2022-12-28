import React from 'react';

import { useState } from 'react'


// Components should never be nested hence outside of App
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Headings = ({text}) => (
  <h1>{text}</h1>
)

const Statistics = ({good, neutral, bad}) => {

  const getAverage = (good, neutral, bad) => {
    let denom = good+neutral+bad
    let numer = good-bad
    return `${numer/denom}`
  }

  const getPositive = (good, neutral, bad) => {
    let denom = good+neutral+bad
    return `${good/denom * 100}%`
  }

  if (good === 0 && neutral === 0 && bad === 0) return `No feedback given`
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good+neutral+bad} />
        <StatisticLine text="average" value={getAverage(good, neutral, bad)} />
        <StatisticLine text="Positive" value={getPositive(good, neutral, bad)} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Headings text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <Headings text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App