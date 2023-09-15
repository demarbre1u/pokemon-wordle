import { useCallback, useEffect } from "react";
import { BoardType } from "../types/BoardType";

type useKeyPressProps = {
  gameData: string[];
  maxNumberOfTries: number;
  currentTry: number;
  setCurrentTry: (tryCount: number) => void;
  currentColumn: number;
  setCurrentColumn: (column: number) => void;
  wordToGuess: string;
  board: BoardType;
  setBoard: (board: BoardType) => void;
  updateBoard: () => void;
  onVictory: () => void;
  onDefeat: () => void;
};

export const useKeyPress = (props: useKeyPressProps) => {
  const {
    gameData,
    maxNumberOfTries,
    currentTry,
    setCurrentTry,
    currentColumn,
    setCurrentColumn,
    wordToGuess,
    board,
    setBoard,
    updateBoard,
    onVictory,
    onDefeat,
  } = props;

  const isGameWon = useCallback(() => {
    const currentGuess = board[currentTry].map((cell) => cell.value).join("");
    return currentGuess === wordToGuess;
  }, [board, currentTry, wordToGuess]);

  const isGameLost = useCallback(() => {
    return currentTry + 1 === maxNumberOfTries;
  }, [currentTry, maxNumberOfTries]);

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
    setCurrentTry(Math.min(currentTry + 1, maxNumberOfTries));
  }, [
    board,
    currentColumn,
    currentTry,
    gameData,
    isGameLost,
    isGameWon,
    maxNumberOfTries,
    onDefeat,
    onVictory,
    setCurrentColumn,
    setCurrentTry, 
    updateBoard, 
    wordToGuess
  ]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key >= "a" && event.key <= "z") {
        handleLetterKeys(event.key);
      } else if (event.key === "Backspace") {
        handleBackspaceKey();
      } else if (event.key === "Enter") {
        handleEnterKey();
      }
    },
    [handleLetterKeys, handleBackspaceKey, handleEnterKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
