import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.LOADING);
  const [gameData, setGameData] = useState([]);
  const [wordToGuess, setWordToguess] = useState("");

  useEffect(() => {
    (async () => {
      let result = gameData;
      if (gameData.length === 0) {
        result = await loadGameData();
      }

      // Picking a random index
      const randomIndex = Math.round(Math.random() * result.length);

      setGameData(result);
      setWordToguess(result[randomIndex]);
      setGameState(GAME_STATES.PLAYING);
    })();
  }, []);

  const loadGameData = async () => {
    const result = await fetch("/public/pokemon-names.json");

    if (!result.ok) {
      return setGameState(GAME_STATES.LOADING_ERROR);
    }

    return await result.json();
  };

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
