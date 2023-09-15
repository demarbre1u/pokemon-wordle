import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";
import Button from "./components/Button";
import { useGameData } from "./hooks/useGameData";

function App() {
  const { gameState, setGameState, gameData, wordToGuess } = useGameData();

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
