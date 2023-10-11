import "./Board.css";
import Cell from "../Cell/Cell";
import { CellType } from "../../types/CellType";
import { BoardType } from "../../types/BoardType";

type BoardProps = {
  board: BoardType;
  currentTry: number;
  currentColumn: number;
};

export default function Board(props: BoardProps) {
  const { board, currentColumn, currentTry } = props;

  return (
    <div className="board-wrapper">
      <div>
        {board.map((row: CellType[], rowIndex: number) => (
          <div className="row" key={rowIndex}>
            {row.map(({ placeholder, value, state }, colIndex: number) => {
              const isActive =
                rowIndex === currentTry && colIndex === currentColumn;

              return (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  value={value || placeholder}
                  state={state}
                  isActive={isActive}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
