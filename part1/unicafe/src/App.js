import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if(!good && !neutral && !bad) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
  <>
    <div>
      <h1>statistics</h1>
    </div>
    <div>
          <p style={{margin: '0px'}}>good {good}</p>
          <p style={{margin: '0px'}}>neutral {neutral}</p>
          <p style={{margin: '0px'}}>bad {bad}</p>
          <p style={{margin: '0px'}}>all {good + neutral + bad}</p>
          <p style={{margin: '0px'}}>average { ((good*1 + neutral*0 + bad*-1) / (good + neutral + bad)) || 0 }</p>
          <p style={{margin: '0px'}}>positive {((good / (good + neutral + bad)) * 100) || 0} %</p>
    </div>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <button onClick={() => { setGood(good + 1) }}>good</button>
      <button onClick={() => { setNeutral(neutral + 1) }}>neutral</button>
      <button onClick={() => { setBad(bad + 1) }}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App