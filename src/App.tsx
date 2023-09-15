import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";
import Button from "./components/Button";

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.LOADING);
  const [gameData, setGameData] = useState([]);
  const [wordToGuess, setWordToguess] = useState("");

  useEffect(() => {
    loadGameData();
  }, []);

  useEffect(() => {
    if (gameData.length === 0 || gameState !== GAME_STATES.LOADING) {
      return;
    }

    // Picking a random index
    const randomIndex = Math.round(Math.random() * gameData.length);
    setWordToguess(gameData[randomIndex]);
    setGameState(GAME_STATES.PLAYING);
  }, [gameData, gameState]);

  const loadGameData = async () => {
    const result = await fetch("/pokemon-wordle/pokemon-names.json");

    if (!result.ok) {
      return setGameState(GAME_STATES.LOADING_ERROR);
    }

    const data = await result.json();
    setGameData(data);
  };

  const updateGameState = (newState: number) => {
    setGameState(newState);
  };

  switch (gameState) {
    default:
    case GAME_STATES.LOADING:
      return <>Chargement...</>;
    case GAME_STATES.PLAYING:
      return (
        <div className="flex">
          <h1>Quel est ce Pokémon ?</h1>
          <Board
            wordToGuess={wordToGuess}
            gameData={gameData}
            onVictory={() => updateGameState(GAME_STATES.GAME_WON)}
            onDefeat={() => updateGameState(GAME_STATES.GAME_OVER)}
          />
        </div>
      );
    case GAME_STATES.GAME_WON:
      return (
        <div className="flex">
          <h1>Gagné !</h1>
          <h2>Ce Pokémon était : {wordToGuess.toUpperCase()}</h2>
          <Button onClick={() => updateGameState(GAME_STATES.LOADING)}>
            Rejouer
          </Button>
        </div>
      );
    case GAME_STATES.GAME_OVER:
      return (
        <div className="flex">
          <h1>Perdu...</h1>
          <h2>Ce Pokémon était : {wordToGuess.toUpperCase()}</h2>
          <Button onClick={() => updateGameState(GAME_STATES.LOADING)}>
            Rejouer
          </Button>
        </div>
      );
  }
}

export default App;
