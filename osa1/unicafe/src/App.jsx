import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if ((good + neutral + bad) === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine text='good' value={good}/>
          </tr>
          <tr>
            <StatisticLine text='neutral' value={neutral}/>
          </tr>
          <tr>
            <StatisticLine text='bad' value={bad}/>
          </tr>
          <tr>
            <StatisticLine text='all' value={(good + neutral + bad)}/>
          </tr>
          <tr>
            <StatisticLine text='average' value={(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)} />
          </tr>
          <tr>
            <StatisticLine text='positive' value={`${(good / (good + neutral + bad) * 100)} %`} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
