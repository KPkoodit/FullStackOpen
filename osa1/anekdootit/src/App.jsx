import { useState } from 'react'

const Anecdotes = ({anecdotes, votes, selected}) => {
  return(
    <>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
    </>
  )
}

const MostVotedAnecdote = ({anecdotes, votes}) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]} <br />
      has {votes[votes.indexOf(Math.max(...votes))]} votes
    </>
  )
}

const Button = ({name, funct}) => {
  return (
    <button onClick={funct}>
      {name}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const voteArray = Array(8).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setUpdatedVotes] = useState(voteArray)

  const getRandomNumber = (min, max) => {
    return (
      Math.floor(Math.random() * (max - min + 1)) + min
    )
  }
  const randomAnecdote = () => setSelected(getRandomNumber(0,7))

  const addVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setUpdatedVotes(updatedVotes)
  }

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button name='vote' funct={addVote}/>
      <Button name='next anecdote' funct={randomAnecdote}/>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
