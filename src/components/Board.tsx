import { useEffect, useState } from "react";
import Cell from "./Cell";
import CELL_STATES from "./../constants/cellStates";

export default function Board(props: any) {
  const { wordToGuess, onVictory, onDefeat } = props;

  const maxNumberOfTries = 6;
  const [board, setBoard] = useState([
    [{ placeholder: "", value: "", state: CELL_STATES.EMPTY }],
  ]);
  const [currentTry, setCurrentTry] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(1);

  useEffect(() => {
    let newBoard: any = new Array(maxNumberOfTries);

    const firstLetter = wordToGuess.split("")[0];

    for (let i = 0; i < newBoard.length; i++) {
      newBoard[i] = new Array(wordToGuess.length);

      for (let j = 0; j < newBoard[i].length; j++) {
        newBoard[i][j] = {
          placeholder: "",
          value: j === 0 && i === 0 ? firstLetter : "",
          state: CELL_STATES.EMPTY,
        };
      }
    }

    setBoard(newBoard);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key >= "a" && event.key <= "z") {
        if (currentColumn >= wordToGuess.length) {
          return;
        }

        board[currentTry][currentColumn].value = event.key;

        setBoard(board);
        setCurrentColumn((col) => Math.min(col + 1, wordToGuess.length));
      } else if (event.key === "Backspace") {
        // TODO: add a check so that the first character can't be removed
        board[currentTry][currentColumn - 1].value = "";

        setBoard(board);
        setCurrentColumn((col) => Math.max(col - 1, 0));
      } else if (event.key === "Enter") {
        if (currentColumn !== wordToGuess.length) {
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
        setCurrentTry((current) => Math.min(current + 1, maxNumberOfTries));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [board, currentTry, currentColumn]);

  const isGameWon = () => {
    const currentGuess = board[currentTry].map((cell) => cell.value).join("");
    return currentGuess === wordToGuess;
  };

  const isGameLost = () => {
    return currentTry + 1 === maxNumberOfTries;
  };

  const updateBoard = () => {
    const currentGuess = board[currentTry].map((cell) => cell.value);
    const arrayToGuess = wordToGuess.split("");

    let lettersToFind: any = {};
    for (let letter of arrayToGuess) {
      if (!lettersToFind[letter]) {
        lettersToFind[letter] = 0;
      }
      lettersToFind[letter]++;
    }

    // Checking for correct letters
    currentGuess.forEach((value, index) => {
      if (value === arrayToGuess[index]) {
        board[currentTry][index].state = CELL_STATES.CORRECT;
        lettersToFind[value]--;
      }
    });

    // Checking for misplaced letters
    currentGuess.forEach((value, index) => {
      if (board[currentTry][index].state === CELL_STATES.CORRECT) {
        return;
      }

      if (lettersToFind[value]) {
        board[currentTry][index].state = CELL_STATES.MISPLACED;
        lettersToFind[value]--;
      }
    });

    // Setting placeholder letters from precedent guessed letters
    for (let i = 0; i < board.length - 1; i++) {
      const row = board[i];

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];

        if (cell.state === CELL_STATES.CORRECT) {
          if (j) {
            board[currentTry + 1][j].placeholder = cell.value;
          } else {
            board[currentTry + 1][j].value = cell.value;
          }
        }
      }
    }

    setBoard(board);
  };

  return (
    <div>
      {board.map((row: any[], rowIndex: number) => (
        <div className="row" key={rowIndex}>
          {row.map(({ placeholder, value, state }, colIndex: number) => {
            const isActive =
              rowIndex === currentTry && colIndex === currentColumn;

            return (
              <Cell
                key={`${rowIndex} ${colIndex}`}
                value={value || placeholder}
                state={state}
                isActive={isActive}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
