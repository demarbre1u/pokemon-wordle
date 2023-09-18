import { useCallback, useEffect } from "react";

type useKeyPressProps = {
  handleLetterKeys: (letter: string) => void;
  handleBackspaceKey: () => void;
  handleEnterKey: () => void;
};

export const useKeyPress = (props: useKeyPressProps) => {
  const { handleLetterKeys, handleBackspaceKey, handleEnterKey } = props;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key >= "a" && event.key <= "z") {
        handleLetterKeys(event.key);
      } else if (event.key === "Backspace") {
        handleBackspaceKey();
      } else if (event.key === "Enter") {
        handleEnterKey();
      }
    },
    [handleLetterKeys, handleBackspaceKey, handleEnterKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
