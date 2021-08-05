import React, { useState } from "react";

const Resume = ({ anecdotes, points }) => {
  const moreVotesIndex = points.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[moreVotesIndex]}</p>
      <p>has {points[moreVotesIndex]} votes</p>
    </div>
  );
};

const Anecdote = ({ selectedAnecdote, selectedAnecdotePoints }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selectedAnecdote}</p>
      <p>has {selectedAnecdotePoints} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const selectRandomAnecdote = () => {
    const min = 0;
    const max = anecdotes.length - 1;
    const selectedIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    return setSelected(selectedIndex);
  };

  const voteSelectedAnecdote = () => {
    const anecdoteVotes = [...points];

    anecdoteVotes[selected] += 1;

    return setPoints(anecdoteVotes);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1).join("0").split("").map(parseFloat)
  );

  return (
    <div>
      <Anecdote
        selectedAnecdote={anecdotes[selected]}
        selectedAnecdotePoints={points[selected]}
      />
      <button onClick={voteSelectedAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <Resume anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
