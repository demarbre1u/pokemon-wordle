import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const wordToGuess = "pikachu";
  const maxNumberOfTries = 6;

  const [board, setBoard] = useState([[{ value: "", state: "" }]]);
  const [currentTry, setCurrentTry] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [changed, setChanged] = useState(0);

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
    setChanged(Math.random());
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
        setChanged(Math.random());
      } else if (event.key === "Backspace") {
        // TODO: add a check to see if the game is won
        board[currentTry][currentColumn - 1].value = "";

        setBoard(board);
        setCurrentColumn((col) => Math.max(col - 1, 0));
        setChanged(Math.random());
      } else if (event.key === "Enter") {
        if (currentColumn !== wordToGuess.length) {
          return;
        }

        checkGameWon();
        setCurrentColumn(0);
        setCurrentTry((current) => Math.min(current + 1, maxNumberOfTries));
        setChanged(Math.random());
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

    currentGuess.forEach((value, index) => {
      if (value === arrayToGuess[index]) {
        board[currentTry][index].state = "correct";
      }
    });

    // TODO: add check for misplaced letters

    setBoard(board);

    // TODO: use a state to store the state of the game
    if (currentGuess.join("") === wordToGuess) {
      console.log("win");
    }
  };

  return (
    <div key={changed}>
      {board.map((row: any[], rowIndex: number) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map(({ value, state }, colIndex: number) => (
              <div
                key={colIndex}
                className={`cell ${
                  rowIndex === currentTry && colIndex === currentColumn
                    ? "cell--active"
                    : ""
                } ${state === "correct" ? "cell--correct" : ""}`}
              >
                {value.toUpperCase()}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
