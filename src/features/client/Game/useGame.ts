import { useEffect, useState } from "react";
import { INPUT_LENGTH, isDigitValid } from "@/helpers";
import { Hint, Message, RiddleResponse } from "./types";

const defaultInput = " ".repeat(INPUT_LENGTH);
const defaultMessage = {
  text: "Ready?",
};

export const useGame = (riddle: number, id: number) => {
  const [solved, setSolved] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [message, setMessage] = useState<Message>(defaultMessage);
  const [hintses, setHintses] = useState<Hint[][]>([]);
  const [input, setInput] = useState(defaultInput);
  const [cursor, setCursor] = useState(0);

  // load stored game info
  useEffect(() => {
    const data = localStorage.getItem("mathler");
    if (!data) {
      return;
    }

    const { solved, hintses, gameover, riddleId, input } = JSON.parse(data);

    if (id === riddleId) {
      setInput(input);
      setSolved(Boolean(solved));
      setHintses(hintses ?? []);
      setGameover(Boolean(gameover));
      if (solved) {
        setMessage({ text: " " });
      }
    } else {
      clearAnswer();
    }
  }, [id]);

  // keyboard control
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

    if (solved) {
      removeEventListener("keydown", handleKeyboard);
    } else {
      addEventListener("keydown", handleKeyboard);
    }
    return () => removeEventListener("keydown", handleKeyboard);
  }, [solved, cursor, input]);

  const clearAnswer = () => {
    localStorage.removeItem("mathler");
    setInput(defaultInput);
    setHintses([]);
    setMessage(defaultMessage);
    setGameover(false);
    setSolved(false);
    setCursor(0);
  };

  const setNextCursor = () => setCursor(Math.min(cursor + 1, INPUT_LENGTH - 1));
  const setPrevCursor = () => setCursor(Math.max(cursor - 1, 0));

  const updateDigit = (digit: string, index: number = cursor) => {
    let newInput = [...input];
    newInput[index] = digit;
    setInput(newInput.join(""));
  };

  const submit = async () => {
    if ([...input].filter((char) => char !== " ").length < INPUT_LENGTH) {
      setMessage({
        text: "Row must be complete.",
        className: "text-red-400",
      });
      return;
    }

    setMessage({ text: "Let me check that answer..." });
    const res = await fetch(`/riddle/${id}/${encodeURIComponent(input)}`, {
      method: "POST",
    });

    const { solved, message, hints }: RiddleResponse = await res.json();
    setMessage({
      text: message ?? "You're doing great!",
      className: message ? "text-red-400" : "",
    });

    if (res.status === 200) {
      setCursor(0);
      const newHintses = hints ? [...hintses, hints] : hintses;

      if (solved) {
        setSolved(solved);
        setMessage({ text: " " });
      } else if (hints) {
        if (hintses.length < 6) {
          setHintses(newHintses);
          setInput("");
          setGameover(hintses.length === 5);
        }
      }

      localStorage.setItem(
        "mathler",
        JSON.stringify({
          riddleId: id,
          hintses: newHintses,
          input: solved ? input : defaultInput,
          solved,
          gameover: hints && hintses.length === 5,
        })
      );
    }
  };

  return {
    solved,
    gameover,
    hintses,
    message,
    submit,
    input,
    cursor,
    clearAnswer,
    updateDigit,
    setPrevCursor,
    setNextCursor,
  };
};
