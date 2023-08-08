import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./Cell";

function App() {
  const wordToGuess = "pikachu";
  const maxNumberOfTries = 6;

  const [board, setBoard] = useState([[{ value: "", state: "" }]]);
  const [currentTry, setCurrentTry] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  useEffect(() => {
    let newBoard: any = new Array(maxNumberOfTries);

    for (let i = 0; i < newBoard.length; i++) {
      newBoard[i] = new Array(wordToGuess.length);

      for (let j = 0; j < newBoard[i].length; j++) {
        newBoard[i][j] = {
          value: "",
          state: "",
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
        // TODO: add a check to see if the game is won
        board[currentTry][currentColumn - 1].value = "";

        setBoard(board);
        setCurrentColumn((col) => Math.max(col - 1, 0));
      } else if (event.key === "Enter") {
        if (currentColumn !== wordToGuess.length) {
          return;
        }

        checkGameWon();
        setCurrentColumn(0);
        setCurrentTry((current) => Math.min(current + 1, maxNumberOfTries));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [board, currentTry, currentColumn]);

  const checkGameWon = () => {
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
        board[currentTry][index].state = "correct";
        lettersToFind[value]--;
      }
    });

    // Checking for misplaced letters
    currentGuess.forEach((value, index) => {
      if (board[currentTry][index].state === "correct") {
        return;
      }

      if (lettersToFind[value]) {
        board[currentTry][index].state = "misplaced";
        lettersToFind[value]--;
      }
    });

    setBoard(board);

    // TODO: use a state to store the state of the game
    if (currentGuess.join("") === wordToGuess) {
      console.log("win");
    }
  };

  return (
    <div>
      {board.map((row: any[], rowIndex: number) => (
        <div className="row" key={rowIndex}>
          {row.map(({ value, state }, colIndex: number) => {
            const isActive =
              rowIndex === currentTry && colIndex === currentColumn;

            return (
              <Cell
                key={`${rowIndex} ${colIndex}`}
                value={value}
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

export default App;
