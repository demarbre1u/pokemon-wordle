import Cell from "./Cell";
import { CellType } from "../types/CellType";
import { useBoard } from "../hooks/useBoard";
import { useKeyPress } from "../hooks/useKeyPress";
import { useState } from "react";

type BoardProps = {
  wordToGuess: string;
  gameData: string[];
  onVictory: () => void;
  onDefeat: () => void;
};

export default function Board(props: BoardProps) {
  const { wordToGuess, onVictory, onDefeat, gameData } = props;

  const maxNumberOfTries = 6;
  const [currentTry, setCurrentTry] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(1);

  const { board, setBoard, updateBoard } = useBoard({
    wordToGuess,
    maxNumberOfTries,
    currentTry,
  });

  useKeyPress({
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
  });

  return (
    <div>
      {board.map((row: CellType[], rowIndex: number) => (
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
