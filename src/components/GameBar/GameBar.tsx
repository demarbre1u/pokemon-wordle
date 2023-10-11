import { ReactNode } from "react";

import "./GameBar.css";

type GameBarProps = {
  children: ReactNode;
};

const GameBar = ({ children }: GameBarProps) => {
  return <div className="game-bar">{children}</div>;
};

export default GameBar;
