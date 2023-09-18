import { Key } from "./Key";
import { Icon } from "@iconify/react";
import { SpecialKey } from "./SpecialKey";
import { LettersGuessedType } from "../types/LettersGuessedType";

const KEYBOARD_LAYOUT = [
  ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  ["backspace", "w", "x", "c", "v", "b", "n", "enter"],
];

type KeyboardProps = {
  lettersGuessed: LettersGuessedType;
  onLetterClick: (letter: string) => void;
  onBackspaceClick: () => void;
  onEnterClick: () => void;
};

export const Keyboard = (props: KeyboardProps) => {
  const { lettersGuessed, onLetterClick, onBackspaceClick, onEnterClick } =
    props;

  return (
    <div className="keyboard-wrapper">
      {KEYBOARD_LAYOUT.map((row, index) => {
        return (
          <span key={index} className="keyboard-row">
            {row.map((symbol) => {
              switch (symbol) {
                default:
                  return (
                    <Key
                      key={symbol}
                      symbol={symbol}
                      state={lettersGuessed[symbol]}
                      onClick={() => onLetterClick(symbol)}
                    />
                  );
                case "backspace":
                  return (
                    <SpecialKey key={symbol} onClick={onBackspaceClick}>
                      <Icon icon="solar:backspace-outline" />
                    </SpecialKey>
                  );
                case "enter":
                  return (
                    <SpecialKey key={symbol} onClick={onEnterClick}>
                      <Icon icon="fluent:arrow-enter-16-filled" />
                    </SpecialKey>
                  );
              }
            })}
          </span>
        );
      })}
    </div>
  );
};
