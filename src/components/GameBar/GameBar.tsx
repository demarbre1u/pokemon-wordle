import "./GameBar.css";
import { ReactNode } from "react";

type GameBarProps = {
  children: ReactNode;
};

const GameBar = ({ children }: GameBarProps) => {
  return <div className="game-bar">{children}</div>;
};

export default GameBar;
