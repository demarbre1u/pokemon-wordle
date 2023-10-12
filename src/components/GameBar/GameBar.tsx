import { ReactNode } from "react";

import "./GameBar.css";

type GameBarProps = {
  children: ReactNode;
};

export const GameBar = ({ children }: GameBarProps) => {
  return <div className="game-bar">{children}</div>;
};
