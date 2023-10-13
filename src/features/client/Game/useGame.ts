import { useEffect, useState } from "react";
import { INPUT_LENGTH } from "@/helpers";
import { Hint, Message, RiddleResponse } from "./types";
import { useKeyboard } from "./useKeyboard";

const defaultInput = " ".repeat(INPUT_LENGTH);
const defaultMessage = {
  text: "Ready?",
};

export const useGame = (id: number) => {
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
    const res = await fetch(`api/riddle/${id}/${encodeURIComponent(input)}`, {
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

  // keyboard control
  useKeyboard(
    input,
    submit,
    cursor,
    updateDigit,
    setPrevCursor,
    setNextCursor,
    solved || gameover
  );

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
