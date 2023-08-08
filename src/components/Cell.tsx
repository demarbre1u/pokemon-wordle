import { useEffect, useState } from "react";
import CELL_STATES from "./../constants/cellStates";

export default function Cell(props: any) {
  const { state, value, isActive } = props;

  const [classList, setClassList] = useState(["cell"]);

  useEffect(() => {
    let newClassList = ["cell"];
    if (isActive) {
      newClassList.push("cell--active");
    }

    if (state === CELL_STATES.CORRECT) {
      newClassList.push("cell--correct");
    }

    if (state === CELL_STATES.MISPLACED) {
      newClassList.push("cell--misplaced");
    }

    setClassList(newClassList);
  }, [state, value, isActive]);

  return <div className={classList.join(" ")}>{value.toUpperCase()}</div>;
}
