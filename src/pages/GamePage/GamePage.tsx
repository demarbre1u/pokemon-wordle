import { useCallback } from "react";

import { Board } from "@/components/Board/Board";
import { Hints } from "@/components/Hints/Hints";
import { Keyboard } from "@/components/Keyboard/Keyboard";
import { Events } from "@/constants/Events";
import { GameStates } from "@/constants/GameStates";
import { useBoard } from "@/hooks/useBoard";
import { useKeyPress } from "@/hooks/useKeyPress";
import { PokemonType } from "@/types/PokemonType";
import { eventSystem } from "@/utils/eventSystem";

const MAX_NUMBER_OF_TRIES = 3;

type GamePageProps = {
  pokemonToGuess: PokemonType;
  currentTry: number;
  currentColumn: number;
  setCurrentTry: (tryNumber: number) => void;
  setCurrentColumn: (colNumber: number) => void;
  wordToGuess: string;
  gameData: PokemonType[];
};

export const GamePage = ({
  pokemonToGuess,
  currentTry,
  currentColumn,
  wordToGuess,
  gameData,
  setCurrentTry,
  setCurrentColumn,
}: GamePageProps) => {
  const { board, setBoard, updateBoard, lettersGuessed, setLettersGuessed } =
    useBoard({
      wordToGuess,
      maxNumberOfTries: MAX_NUMBER_OF_TRIES,
      currentTry,
    });

  const onVictory = useCallback(() => {
    eventSystem.emit(Events.GAME_STATE, GameStates.GAME_WON);
    setLettersGuessed({});
  }, [setLettersGuessed]);

  const onDefeat = useCallback(() => {
    eventSystem.emit(Events.GAME_STATE, GameStates.GAME_OVER);
    setLettersGuessed({});
  }, [setLettersGuessed]);

  const isGameWon = useCallback(() => {
    const currentGuess = board[currentTry].map((cell) => cell.value).join("");
    return currentGuess === wordToGuess;
  }, [board, currentTry, wordToGuess]);

  const isGameLost = useCallback(() => {
    return currentTry + 1 === MAX_NUMBER_OF_TRIES;
  }, [currentTry]);

  const isGuessValid = useCallback(() => {
    const isValid = gameData.some(
      (pokemon: PokemonType) =>
        board[currentTry].map((cell) => cell.value).join("") === pokemon.name
    );

    return isValid;
  }, [board, currentTry, gameData]);

  const handleEnterKey = () => {
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
  };

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

  useKeyPress({
    handleLetterKeys,
    handleBackspaceKey,
    handleEnterKey,
  });

  return (
    <>
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
    </>
  );
};
