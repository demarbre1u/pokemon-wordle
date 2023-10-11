import { useCallback } from "react";

import CellStates from "@/constants/CellStates";

import "./Cell.css";

type CellProps = {
  state: number;
  value: string;
  isActive: boolean;
};

export default function Cell(props: CellProps) {
  const { state, value, isActive } = props;

  const getClasses = useCallback(() => {
    const newClassList = ["cell"];
    if (isActive) {
      newClassList.push("cell--active");
    }

    if (state === CellStates.CORRECT) {
      newClassList.push("cell--correct");
    }

    if (state === CellStates.MISPLACED) {
      newClassList.push("cell--misplaced");
    }

    return newClassList.join(" ");
  }, [isActive, state]);

  const classList = getClasses();

  return <div className={classList}>{value.toUpperCase()}</div>;
}
