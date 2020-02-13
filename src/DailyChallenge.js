import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import './ToggleGameState.css';

function LoadChallenge({gameState, setGameState}) {

  const [buttonText, setButtonText] = useState("Load the Daily Challenge!");

  function updateGameState() {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.LOAD_CHALLENGE);
      setButtonText("End Daily Challenge");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      setGameState(GAME_STATE.ENDED);
      setButtonText("Load Daily Challenge");
    }
  }

  return (
    <div className="Toggle-game-state">
      <Button onClick={() => updateGameState()} >
        {buttonText}
      </Button>
    </div>
  );
}

export default LoadChallenge;
