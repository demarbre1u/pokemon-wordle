import { useEffect, useState } from "react";

export default function Cell(props: any) {
  const { state, value, isActive } = props;

  const [classList, setClassList] = useState(["cell"]);

  useEffect(() => {
    let newClassList = ["cell"];
    if (isActive) {
      newClassList.push("cell--active");
    }

    if (state === "correct") {
      newClassList.push("cell--correct");
    }

    if (state === "misplaced") {
      newClassList.push("cell--misplaced");
    }

    setClassList(newClassList);
  }, [state, value, isActive]);

  return <div className={classList.join(" ")}>{value.toUpperCase()}</div>;
}
