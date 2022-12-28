import React from "react"
import { useState } from "react";

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick} >{text}</button>
const DisplayVotes = ({votes}) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getAnecdote = () => {
    const ranAnecIndex = () => Math.floor(Math.random()*anecdotes.length)
    let outputIndex = ranAnecIndex()
    while (outputIndex === selected) {
      outputIndex = ranAnecIndex()
    }
    console.log(outputIndex)
    return setSelected(outputIndex)
  }

  const updateVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    return setVotes(newVotes)
  }

  const getTopVoteIndex = () => {
    let highestVote = 0
    let highestVoteIndex = 0

    for (const i in votes) {
      if (votes[i] > highestVote) {
        highestVote = votes[i]
        highestVoteIndex = i
      }
    }
    return highestVoteIndex
  }

  console.log(votes[selected])

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <br/>
      <DisplayVotes votes={votes[selected]} />
      <Button handleClick={updateVote} text="vote" />
      <Button handleClick={getAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      {anecdotes[getTopVoteIndex()]}
      <DisplayVotes votes={votes[getTopVoteIndex()]} />
    </div>
  )
}

export default App