import CellStates from "@/constants/CellStates";

import "./Key.css";

type KeyProps = {
  state: number;
  symbol: string;
  onClick: (event: string) => void;
};

const getClasses = (state: number) => {
  const classList = ["keys"];
  switch (state) {
    case CellStates.CORRECT:
      classList.push("key--correct");
      break;
    case CellStates.MISPLACED:
      classList.push("key--misplaced");
      break;
    case CellStates.INCORRECT:
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
