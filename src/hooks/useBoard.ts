import { useCallback, useEffect, useState } from "react";
import { BoardType } from "../types/BoardType";
import CELL_STATES from "../constants/cellStates";

type useBoardProps = {
    wordToGuess:string;
    maxNumberOfTries: number;
    currentTry: number;
}

export const useBoard = (props: useBoardProps) => {
    const { wordToGuess, maxNumberOfTries, currentTry } = props

    const [board, setBoard] = useState<BoardType>([
        [{ placeholder: "", value: "", state: CELL_STATES.EMPTY }],
      ]);

    useEffect(() => {
        console.log(wordToGuess);
    
        const newBoard: BoardType = new Array(maxNumberOfTries);
    
        const firstLetter = wordToGuess.split("")[0];
    
        for (let i = 0; i < newBoard.length; i++) {
          newBoard[i] = new Array(wordToGuess.length);
    
          for (let j = 0; j < newBoard[i].length; j++) {
            newBoard[i][j] = {
              placeholder: "",
              value: j === 0 && i === 0 ? firstLetter : "",
              state: CELL_STATES.EMPTY,
            };
          }
        }
    
        setBoard(newBoard);
      }, [wordToGuess, maxNumberOfTries]);

      const updateBoard = useCallback(() => {
        const currentGuess = board[currentTry].map((cell) => cell.value);
        const arrayToGuess = wordToGuess.split("");
    
        const lettersToFind: Record<string, number> = {};
        for (const letter of arrayToGuess) {
          if (!lettersToFind[letter]) {
            lettersToFind[letter] = 0;
          }
          lettersToFind[letter]++;
        }
    
        // Checking for correct letters
        currentGuess.forEach((value, index) => {
          if (value === arrayToGuess[index]) {
            board[currentTry][index].state = CELL_STATES.CORRECT;
            lettersToFind[value]--;
          }
        });
    
        // Checking for misplaced letters
        currentGuess.forEach((value, index) => {
          if (board[currentTry][index].state === CELL_STATES.CORRECT) {
            return;
          }
    
          if (lettersToFind[value]) {
            board[currentTry][index].state = CELL_STATES.MISPLACED;
            lettersToFind[value]--;
          }
        });
    
        // Setting placeholder letters from precedent guessed letters
        for (let i = 0; i < board.length - 1; i++) {
          const row = board[i];
    
          for (let j = 0; j < row.length; j++) {
            const cell = row[j];
    
            if (cell.state === CELL_STATES.CORRECT) {
              if (j) {
                board[currentTry + 1][j].placeholder = cell.value;
              } else {
                board[currentTry + 1][j].value = cell.value;
              }
            }
          }
        }
    
        setBoard(board);
      }, [board, setBoard, currentTry, wordToGuess]);

      return { board, setBoard, updateBoard }
}