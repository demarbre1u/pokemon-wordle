import { ReactNode } from "react";

import { Events } from "@/constants/Events";
import { GameStates } from "@/constants/GameStates";
import { eventSystem } from "@/utils/eventSystem";

import "./StatusBar.css";

type StatusBarProps = {
  state: number;
};

const APP_NAME = "Pokémon Wordle";

export const StatusBar = ({ state }: StatusBarProps) => {
  let buttonEl: ReactNode = <></>;

  switch (state) {
    case GameStates.PLAYING:
      buttonEl = (
        <button
          className="status-bar__button"
          onClick={() =>
            eventSystem.emit(Events.GAME_STATE, GameStates.GAME_OVER)
          }
        >
          Abandonner
        </button>
      );
      break;
    case GameStates.GAME_WON:
    case GameStates.GAME_OVER:
      buttonEl = (
        <button
          className="status-bar__button"
          onClick={() =>
            eventSystem.emit(Events.GAME_STATE, GameStates.LOADING)
          }
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
