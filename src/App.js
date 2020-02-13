import React, { useState, useEffect } from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import ToggleGameState from './ToggleGameState.js';
import './App.css';
import './LoginButton.css'
import { GAME_STATE } from './game_state_enum.js';
import { RandomGrid } from './random_grid.js';
import { ChallengeGrid } from './challenge_grid.js';
import firebase from 'firebase';
import LoginButton from './LoginButton.js';
import TextInput from './TextInput.js';
import LoadChallenge from './DailyChallenge.js';

const firebaseConfig = {
  apiKey: "AIzaSyBHkFOuH-0yKjbgTv9IllJe_v4Qn37Vo-U",
  authDomain: "lfraserboggle.firebaseapp.com",
  databaseURL: "https://lfraserboggle.firebaseio.com",
  projectId: "lfraserboggle",
  storageBucket: "lfraserboggle.appspot.com",
  messagingSenderId: "101154086813",
  appId: "1:101154086813:web:c1102d98f07f70b7c65974",
  measurementId: "G-5S2T1GXQ58"
};

//const firebaseApp = firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState(null);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
 


  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);
  
  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.LOAD_RANDOM) {
      setGrid(RandomGrid());
      setFoundSolutions([]);
      setGameState(GAME_STATE.IN_PROGRESS);
    }
    else if( gameState === GAME_STATE.LOAD_CHALLENGE){
      ChallengeGrid(setGrid); 
      setFoundSolutions([]); 
      setGameState(GAME_STATE.IN_PROGRESS);
    }
  }, [gameState]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <header className="myStyle"><center><h1>Lauren's Boggle Game</h1></center></header>
      <center>
        <LoginButton className="button" setUser={(user) => setUser(user)} />

        {user != null &&
          <div>
            <TextInput promptText="Name?" field="name" user={user} />
            <TextInput promptText="Hometown?" field="hometown" user={user} />
            <p>Welcome, {user.displayName} ({user.email})</p>
          </div>
        }

        <LoadChallenge gameState={gameState}
          setGameState={(state) => setGameState(state)} />
        <ToggleGameState gameState={gameState}
          setGameState={(state) => setGameState(state)} />
        {gameState === GAME_STATE.IN_PROGRESS &&
          <div>
            <Board className="tiles" board={grid} />
            <GuessInput allSolutions={allSolutions}
              foundSolutions={foundSolutions}
              correctAnswerCallback={(answer) => correctAnswerFound(answer)} />
            <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
          </div>
        }
        {gameState === GAME_STATE.ENDED &&
          <div>
            <Board board={grid} className = "tiles" />
            <FoundSolutions headerText="All possible solutions" words={allSolutions} />
          </div>
        }</center>
    </div>
  );
}

export default App;
