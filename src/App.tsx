import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";
import { useGameData } from "./hooks/useGameData";
import { useCallback } from "react";
import { useBoard } from "./hooks/useBoard";
import { useKeyPress } from "./hooks/useKeyPress";
import ReplayButton from "./components/ReplayButton";
import { Keyboard } from "./components/Keyboard";
import { PokemonType } from "./types/PokemonType";
import { Hints } from "./components/Hints";

const MAX_NUMBER_OF_TRIES = 3;

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

  const { board, setBoard, updateBoard, lettersGuessed, setLettersGuessed } =
    useBoard({
      wordToGuess,
      maxNumberOfTries: MAX_NUMBER_OF_TRIES,
      currentTry,
    });

  const onVictory = useCallback(() => {
    setGameState(GAME_STATES.GAME_WON);
    setLettersGuessed({});
  }, [setGameState, setLettersGuessed]);

  const onDefeat = useCallback(() => {
    setGameState(GAME_STATES.GAME_OVER);
    setLettersGuessed({});
  }, [setGameState, setLettersGuessed]);

  const isGameWon = useCallback(() => {
    const currentGuess = board[currentTry].map((cell) => cell.value).join("");
    return currentGuess === wordToGuess;
  }, [board, currentTry, wordToGuess]);

  const isGameLost = useCallback(() => {
    return currentTry + 1 === MAX_NUMBER_OF_TRIES;
  }, [currentTry]);

  const handleLetterKeys = useCallback(
    (letter: string) => {
      if (currentColumn >= wordToGuess.length) {
        return;
      }

      board[currentTry][currentColumn].value = letter;

      setBoard(board);
      setCurrentColumn(Math.min(currentColumn + 1, wordToGuess.length));
    },
    [board, currentColumn, currentTry, setBoard, setCurrentColumn, wordToGuess]
  );

  const handleBackspaceKey = useCallback(() => {
    if (currentColumn <= 1) {
      return;
    }

    board[currentTry][currentColumn - 1].value = "";
    setBoard(board);
    setCurrentColumn(Math.max(currentColumn - 1, 0));
  }, [board, currentColumn, currentTry, setBoard, setCurrentColumn]);

  const isGuessValid = useCallback(() => {
    const isValid = gameData.some(
      (pokemon: PokemonType) =>
        board[currentTry].map((cell) => cell.value).join("") === pokemon.name
    );

    return isValid;
  }, [board, currentTry, gameData]);

  const handleEnterKey = useCallback(() => {
    if (currentColumn !== wordToGuess.length) {
      return;
    }

    if (!isGuessValid()) {
      return;
    }

    if (isGameWon()) {
      return onVictory();
    }

    if (isGameLost()) {
      return onDefeat();
    }

    updateBoard();
    setCurrentColumn(1);
    setCurrentTry(Math.min(currentTry + 1, MAX_NUMBER_OF_TRIES));
  }, [
    isGuessValid,
    currentColumn,
    currentTry,
    isGameLost,
    isGameWon,
    onDefeat,
    onVictory,
    setCurrentColumn,
    setCurrentTry,
    updateBoard,
    wordToGuess,
  ]);

  useKeyPress({
    handleLetterKeys,
    handleBackspaceKey,
    handleEnterKey,
  });

  switch (gameState) {
    default:
    case GAME_STATES.LOADING:
      return <>Chargement...</>;
    case GAME_STATES.PLAYING:
      return (
        <div className="phone-wrapper">
          <div className="phone-content">
            <div className="status-bar">
              <span className="status-bar__app-name">Pokémon Wordle</span>
              <button
                className="status-bar__giveup-button"
                onClick={() => setGameState(GAME_STATES.GAME_OVER)}
              >
                Abandonner
              </button>
            </div>

            <Hints pokemonToGuess={pokemonToGuess} currentTry={currentTry} />

            <div className="app-screen">
              <Board
                board={board}
                currentTry={currentTry}
                currentColumn={currentColumn}
              />

              <Keyboard
                lettersGuessed={lettersGuessed}
                onLetterClick={handleLetterKeys}
                onBackspaceClick={handleBackspaceKey}
                onEnterClick={handleEnterKey}
              />
            </div>
          </div>
        </div>
      );
    case GAME_STATES.GAME_WON:
      return (
        <div className="phone-wrapper">
          <div className="phone-content">
            <h1>Gagné !</h1>
            <h2>Ce Pokémon était : {wordToGuess.toUpperCase()}</h2>
            <ReplayButton onClick={() => setGameState(GAME_STATES.LOADING)} />
          </div>
        </div>
      );
    case GAME_STATES.GAME_OVER:
      return (
        <div className="phone-wrapper">
          <div className="phone-content">
            <h1>Perdu...</h1>
            <h2>Ce Pokémon était : {wordToGuess.toUpperCase()}</h2>
            <ReplayButton onClick={() => setGameState(GAME_STATES.LOADING)} />
          </div>
        </div>
      );
  }
}

export default App;
