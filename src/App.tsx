import { useEffect } from "react";

import "@/App.css";
import { StatusBar } from "@/components/StatusBar/StatusBar";
import { GameStates } from "@/constants/GameStates";
import { useGameData } from "@/hooks/useGameData";
import { GamePage } from "@/pages/GamePage/GamePage";
import { ResultPage } from "@/pages/ResultPage/ResultPage";

import { Events } from "./constants/Events";
import { eventSystem } from "./utils/eventSystem";

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

  useEffect(() => {
    eventSystem.on(Events.GAME_STATE, setGameState);

    return () => {
      eventSystem.off(Events.GAME_STATE, setGameState);
    };
  }, [setGameState]);

  const getContent = () => {
    switch (gameState) {
      case GameStates.PLAYING:
        return (
          <GamePage
            pokemonToGuess={pokemonToGuess}
            currentTry={currentTry}
            currentColumn={currentColumn}
            setCurrentTry={setCurrentTry}
            setCurrentColumn={setCurrentColumn}
            wordToGuess={wordToGuess}
            gameData={gameData}
          />
        );
      case GameStates.GAME_WON:
        return <ResultPage label={"Gagné !"} pokemonToGuess={pokemonToGuess} />;
      case GameStates.GAME_OVER:
        return (
          <ResultPage label={"Perdu..."} pokemonToGuess={pokemonToGuess} />
        );
    }
  };

  return (
    <div className="phone-wrapper">
      <div className="phone-content">
        <StatusBar state={gameState} />

        {getContent()}
      </div>
    </div>
  );
}

export default App;
