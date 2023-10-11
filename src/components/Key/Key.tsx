import "./Key.css";
import CELL_STATES from "../../constants/cellStates";

type KeyProps = {
  state: number;
  symbol: string;
  onClick: (event: string) => void;
};

const getClasses = (state: number) => {
  const classList = ["keys"];
  switch (state) {
    case CELL_STATES.CORRECT:
      classList.push("key--correct");
      break;
    case CELL_STATES.MISPLACED:
      classList.push("key--misplaced");
      break;
    case CELL_STATES.INCORRECT:
      classList.push("key--incorrect");
      break;
  }

  return classList.join(" ");
};

export const Key = (props: KeyProps) => {
  const { state, symbol, onClick } = props;

  const classes = getClasses(state);

  return (
    <div className={classes} onClick={() => onClick(symbol)}>
      {symbol}
    </div>
  );
};
