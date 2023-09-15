import { useEffect, useState } from "react";
import GAME_STATES from "../constants/gameStates";

const POKEMON_DICT_FILEPATH = "/pokemon-wordle/pokemon-names.json"

export const useGameData = () => {
    const [gameState, setGameState] = useState(GAME_STATES.LOADING);
    const [gameData, setGameData] = useState([]);
    const [wordToGuess, setWordToguess] = useState("");
  
    useEffect(() => {
      loadGameData();
    }, []);
  
    useEffect(() => {
      if (gameData.length === 0 || gameState !== GAME_STATES.LOADING) {
        return;
      }
  
      // Picking a random index
      const randomIndex = Math.round(Math.random() * gameData.length);
      setWordToguess(gameData[randomIndex]);
      setGameState(GAME_STATES.PLAYING);
    }, [gameData, gameState]);
  
    const loadGameData = async () => {
      const result = await fetch(POKEMON_DICT_FILEPATH);
  
      if (!result.ok) {
        return setGameState(GAME_STATES.LOADING_ERROR);
      }
  
      const data = await result.json();
      setGameData(data);
    };

    return {
        gameState, setGameState, gameData, setGameData, wordToGuess
    }
}