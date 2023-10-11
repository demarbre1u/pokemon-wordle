import "./App.css";
import Board from "./components/Board";
import GAME_STATES from "./constants/gameStates";
import { useGameData } from "./hooks/useGameData";
import { ReactNode, useCallback } from "react";
import { useBoard } from "./hooks/useBoard";
import { useKeyPress } from "./hooks/useKeyPress";
import { Keyboard } from "./components/Keyboard";
import { PokemonType } from "./types/PokemonType";
import { Hints } from "./components/Hints";
import StatusBar from "./components/StatusBar";
import TypeLabel from "./components/TypeLabel";

const MAX_NUMBER_OF_TRIES = 3;

function App() {
  const {
    gameState,
    setGameState,
    gameData,
    pokemonToGuess,
    currentTry,
    setCurrentTry,
    currentColumn,
    setCurrentColumn,
  } = useGameData();
  const wordToGuess = pokemonToGuess.name;

  const { board, setBoard, updateBoard, lettersGuessed, setLettersGuessed } =
    useBoard({
      wordToGuess,
      maxNumberOfTries: MAX_NUMBER_OF_TRIES,
      currentTry,
    });

  const onVictory = useCallback(() => {
    setGameState(GAME_STATES.GAME_WON);
    setLettersGuessed({});
  }, [setGameState, setLettersGuessed]);

  const onDefeat = useCallback(() => {
    setGameState(GAME_STATES.GAME_OVER);
    setLettersGuessed({});
  }, [setGameState, setLettersGuessed]);

  const isGameWon = useCallback(() => {
    const currentGuess = board[currentTry].map((cell) => cell.value).join("");
    return currentGuess === wordToGuess;
  }, [board, currentTry, wordToGuess]);

  const isGameLost = useCallback(() => {
    return currentTry + 1 === MAX_NUMBER_OF_TRIES;
  }, [currentTry]);

  const handleLetterKeys = useCallback(
    (letter: string) => {
      if (currentColumn >= wordToGuess.length) {
        return;
      }

      board[currentTry][currentColumn].value = letter;

      setBoard(board);
      setCurrentColumn(Math.min(currentColumn + 1, wordToGuess.length));
    },
    [board, currentColumn, currentTry, setBoard, setCurrentColumn, wordToGuess]
  );

  const handleBackspaceKey = useCallback(() => {
    if (currentColumn <= 1) {
      return;
    }

    board[currentTry][currentColumn - 1].value = "";
    setBoard(board);
    setCurrentColumn(Math.max(currentColumn - 1, 0));
  }, [board, currentColumn, currentTry, setBoard, setCurrentColumn]);

  const isGuessValid = useCallback(() => {
    const isValid = gameData.some(
      (pokemon: PokemonType) =>
        board[currentTry].map((cell) => cell.value).join("") === pokemon.name
    );

    return isValid;
  }, [board, currentTry, gameData]);

  const handleEnterKey = useCallback(() => {
    if (currentColumn !== wordToGuess.length) {
      return;
    }

    if (!isGuessValid()) {
      return;
    }

    if (isGameWon()) {
      return onVictory();
    }

    if (isGameLost()) {
      return onDefeat();
    }

    updateBoard();
    setCurrentColumn(1);
    setCurrentTry(Math.min(currentTry + 1, MAX_NUMBER_OF_TRIES));
  }, [
    isGuessValid,
    currentColumn,
    currentTry,
    isGameLost,
    isGameWon,
    onDefeat,
    onVictory,
    setCurrentColumn,
    setCurrentTry,
    updateBoard,
    wordToGuess,
  ]);

  useKeyPress({
    handleLetterKeys,
    handleBackspaceKey,
    handleEnterKey,
  });

  let content: ReactNode = <></>;

  switch (gameState) {
    case GAME_STATES.PLAYING:
      content = (
        <>
          <Hints pokemonToGuess={pokemonToGuess} currentTry={currentTry} />

          <div className="app-screen">
            <Board
              board={board}
              currentTry={currentTry}
              currentColumn={currentColumn}
            />

            <Keyboard
              lettersGuessed={lettersGuessed}
              onLetterClick={handleLetterKeys}
              onBackspaceClick={handleBackspaceKey}
              onEnterClick={handleEnterKey}
            />
          </div>
        </>
      );
      break;
    case GAME_STATES.GAME_WON:
      content = (
        <>
          <div className="app-screen">
            <div className="app-screen__result">
              <div className="gamestate-bar">Gagné !</div>

              <div className="app-screen__result__data">
                <div className="app-screen__result__data__top">
                  <span className="app-screen__result__data__subtitle">
                    N° {pokemonToGuess.id}
                  </span>
                  <span className="app-screen__result__data__title">
                    {pokemonToGuess.displayName}
                  </span>
                  <span className="app-screen__result__data__subtitle">
                    {pokemonToGuess.category}
                  </span>
                  <span className="app-screen__result__data__types">
                    {pokemonToGuess.types.map(({ name, image }) => (
                      <TypeLabel name={name} image={image} />
                    ))}
                  </span>
                </div>

                <div className="app-screen__result__data__bottom">
                  <span className="app-screen__result__data__subtitle">
                    Taille : {pokemonToGuess.height}
                  </span>
                  <span className="app-screen__result__data__subtitle">
                    Poids : {pokemonToGuess.weight}
                  </span>{" "}
                </div>
              </div>
              <div className="app-screen__result__image">
                <img
                  src={pokemonToGuess.sprite}
                  alt={`Image de ${pokemonToGuess.displayName}`}
                />
              </div>
            </div>
          </div>
        </>
      );
      break;
    case GAME_STATES.GAME_OVER:
      content = (
        <>
          <div className="app-screen">
            <div className="app-screen__result">
              <div className="gamestate-bar">Perdu...</div>

              <div className="app-screen__result__data">
                <div className="app-screen__result__data__top">
                  <span className="app-screen__result__data__subtitle">
                    N° {pokemonToGuess.id}
                  </span>
                  <span className="app-screen__result__data__title">
                    {pokemonToGuess.displayName}
                  </span>
                  <span className="app-screen__result__data__subtitle">
                    {pokemonToGuess.category}
                  </span>
                  <span className="app-screen__result__data__types">
                    {pokemonToGuess.types.map(({ name, image }) => (
                      <TypeLabel name={name} image={image} />
                    ))}
                  </span>
                </div>

                <div className="app-screen__result__data__bottom">
                  <span className="app-screen__result__data__subtitle">
                    Taille : {pokemonToGuess.height}
                  </span>
                  <span className="app-screen__result__data__subtitle">
                    Poids : {pokemonToGuess.weight}
                  </span>{" "}
                </div>
              </div>
              <div className="app-screen__result__image">
                <img
                  src={pokemonToGuess.sprite}
                  alt={`Image de ${pokemonToGuess.displayName}`}
                />
              </div>
            </div>
          </div>
        </>
      );
      break;
  }

  return (
    <div className="phone-wrapper">
      <div className="phone-content">
        <StatusBar state={gameState} setState={setGameState} />

        {content}
      </div>
    </div>
  );
}

export default App;
