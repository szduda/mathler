import { INPUT_LENGTH, isDigitValid } from "@/helpers";
import { useEffect } from "react";

export const useKeyboard = (
  input: string,
  submit: () => Promise<void>,
  cursor: number,
  updateDigit: (digit: string, index?: number) => void,
  setPrevCursor: () => void,
  setNextCursor: () => void,
  locked: boolean
) => {
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (input.length !== INPUT_LENGTH) {
          return;
        }
        submit();
      } else if (event.key === "Backspace") {
        if (input[cursor] === " ") {
          updateDigit(" ", Math.max(0, cursor - 1));
          setPrevCursor();
        } else {
          updateDigit(" ");
        }
      } else if (isDigitValid(event.key)) {
        updateDigit(event.key);
        setNextCursor();
      } else if (["ArrowRight", " "].includes(event.key)) {
        setNextCursor();
      } else if (event.key === "ArrowLeft") {
        setPrevCursor();
      }
    };

    if (locked) {
      removeEventListener("keydown", handleKeyboard);
    } else {
      addEventListener("keydown", handleKeyboard);
    }
    return () => removeEventListener("keydown", handleKeyboard);
  }, [locked, cursor, input]);
};
