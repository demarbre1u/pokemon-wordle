import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";

function App() {
  const [wordToGuess, setWordToguess] = useState("");
  const [gameState, setGameState] = useState(GAME_STATES.LOADING);

  useEffect(() => {
    setWordToguess("pikachu");
    setGameState(GAME_STATES.PLAYING);
  }, []);

  const updateGameState = (newState: number) => {
    setGameState(newState);
  };

  switch (gameState) {
    default:
    case GAME_STATES.LOADING:
      return <>Loading...</>;
    case GAME_STATES.PLAYING:
      return (
        <Board
          wordToGuess={wordToGuess}
          onVictory={() => updateGameState(GAME_STATES.GAME_WON)}
          onDefeat={() => updateGameState(GAME_STATES.GAME_OVER)}
        />
      );
    case GAME_STATES.GAME_WON:
      return <h1>Game won!</h1>;
    case GAME_STATES.GAME_OVER:
      return (
        <>
          <h1>Game lost...</h1>
          <h2>The word was "{wordToGuess.toUpperCase()}"</h2>
        </>
      );
  }
}

export default App;
