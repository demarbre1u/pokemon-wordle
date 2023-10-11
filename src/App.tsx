import "@/App.css";
import StatusBar from "@/components/StatusBar/StatusBar";
import GamePage from "@/components/pages/GamePage/GamePage";
import ResultPage from "@/components/pages/ResultPage/ResultPage";
import GAME_STATES from "@/constants/gameStates";
import { useGameData } from "@/hooks/useGameData";

function App() {
  const {
    gameState,
    setGameState,
    gameData,
    pokemonToGuess,
    currentTry,
    setCurrentTry,
    currentColumn,
    setCurrentColumn,
  } = useGameData();
  const wordToGuess = pokemonToGuess.name;

  const getContent = () => {
    switch (gameState) {
      case GAME_STATES.PLAYING:
        return (
          <GamePage
            pokemonToGuess={pokemonToGuess}
            currentTry={currentTry}
            currentColumn={currentColumn}
            setCurrentTry={setCurrentTry}
            setCurrentColumn={setCurrentColumn}
            wordToGuess={wordToGuess}
            gameData={gameData}
            setGameState={setGameState}
          />
        );
      case GAME_STATES.GAME_WON:
        return <ResultPage label={"Gagné !"} pokemonToGuess={pokemonToGuess} />;
      case GAME_STATES.GAME_OVER:
        return (
          <ResultPage label={"Perdu..."} pokemonToGuess={pokemonToGuess} />
        );
    }
  };

  return (
    <div className="phone-wrapper">
      <div className="phone-content">
        <StatusBar state={gameState} setState={setGameState} />

        {getContent()}
      </div>
    </div>
  );
}

export default App;
