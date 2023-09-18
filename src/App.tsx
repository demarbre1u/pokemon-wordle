import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";
import { useGameData } from "./hooks/useGameData";
import { useCallback } from "react";
import { useBoard } from "./hooks/useBoard";
import { useKeyPress } from "./hooks/useKeyPress";
import ReplayButton from "./components/ReplayButton";
import { Keyboard } from "./components/Keyboard";

const MAX_NUMBER_OF_TRIES = 6;

function App() {
  const {
    gameState,
    setGameState,
    gameData,
    wordToGuess,
    currentTry,
    setCurrentTry,
    currentColumn,
    setCurrentColumn,
  } = useGameData();

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

  const handleEnterKey = useCallback(() => {
    if (currentColumn !== wordToGuess.length) {
      return;
    }

    // Check if the guess is a valid guess
    const isValid = gameData.some(
      (name: string) =>
        board[currentTry].map((cell) => cell.value).join("") === name
    );

    if (!isValid) {
      // TODO: create an alert / notification to indicate that the guess is invalid to the player
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
    board,
    currentColumn,
    currentTry,
    gameData,
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
        <div className="flex">
          <h1>Quel est ce Pokémon ?</h1>
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
      );
    case GAME_STATES.GAME_WON:
      return (
        <div className="flex">
          <h1>Gagné !</h1>
          <h2>Ce Pokémon était : {wordToGuess.toUpperCase()}</h2>
          <ReplayButton onClick={() => setGameState(GAME_STATES.LOADING)} />
        </div>
      );
    case GAME_STATES.GAME_OVER:
      return (
        <div className="flex">
          <h1>Perdu...</h1>
          <h2>Ce Pokémon était : {wordToGuess.toUpperCase()}</h2>
          <ReplayButton onClick={() => setGameState(GAME_STATES.LOADING)} />
        </div>
      );
  }
}

export default App;
