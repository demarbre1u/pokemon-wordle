import { ReactNode } from "react";

import GAME_STATES from "@/constants/gameStates";

import "./StatusBar.css";

type StatusBarProps = {
  state: number;
  setState: (state: number) => void;
};

const APP_NAME = "Pokémon Wordle";

const StatusBar = ({ state, setState }: StatusBarProps) => {
  let buttonEl: ReactNode = <></>;

  switch (state) {
    case GAME_STATES.PLAYING:
      buttonEl = (
        <button
          className="status-bar__button"
          onClick={() => setState(GAME_STATES.GAME_OVER)}
        >
          Abandonner
        </button>
      );
      break;
    case GAME_STATES.GAME_WON:
    case GAME_STATES.GAME_OVER:
      buttonEl = (
        <button
          className="status-bar__button"
          onClick={() => setState(GAME_STATES.LOADING)}
        >
          Rejouer
        </button>
      );
      break;
  }

  return (
    <div className="status-bar">
      <span className="status-bar__app-name">
        <img src="poke-ball.png" alt="Pokéball icon" />
        {APP_NAME}
      </span>
      <span>{buttonEl}</span>
    </div>
  );
};

export default StatusBar;
