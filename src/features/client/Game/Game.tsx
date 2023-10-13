import { FC } from "react";
import { Button } from "@/features/server";
import { TimeTillNextRiddle } from "@/features/client";
import { INPUT_LENGTH, cx } from "@/helpers";
import { GameRow } from "./GameRow";
import { useGame } from "./useGame";
import { Keyboard } from "./Keyboard";
import { FeedbackMessage } from "./FeedbackMessage";

type Props = {
  riddle: number;
  id: number;
};

export const Game: FC<Props> = ({ riddle, id }) => {
  const {
    solved,
    gameover,
    message,
    hintses,
    submit,
    input,
    cursor,
    clearAnswer,
    updateDigit,
    setPrevCursor,
    setNextCursor,
  } = useGame(riddle, id);

  const bottomSectionClasses = cx([
    "w-full flex flex-col items-center mt-12 transition ease-in-out",
    (solved || gameover) && "-translate-y-[182px]",
  ]);

  const bottomTextClasses = cx([
    "text-center text-lg tracking-wide",
    message.className,
  ]);

  const nextAnswerPlaceholders = [
    ...Array(Math.max(0, INPUT_LENGTH - 1 - hintses.length)),
  ];

  return (
    <div className="flex justify-center items-center flex-col">
      <FeedbackMessage solved={solved} gameover={gameover} />

      <h2 className="text-lg tracking-wide text-center mt-3 opacity-70">
        The hidden calculation equals
      </h2>
      <div className="text-3xl rounded-full p-3 bg-black/60 font-black text-white mt-5">
        {riddle}
      </div>
      <div
        className="grid gap-2 mt-6 mb-12"
        style={{ gridTemplateColumns: `repeat(${INPUT_LENGTH}, 1fr)` }}
      >
        {/* previous answers */}
        {hintses.map((prev, index) => (
          <GameRow key={index} hints={prev} />
        ))}

        {/* current answer */}
        {!gameover && (
          <GameRow
            solved={solved}
            value={input}
            selectedIndex={cursor}
            bgClass={hintses.length % 2 ? "rotate-90" : "-rotate-90"}
          />
        )}

        {/* next answers */}
        {nextAnswerPlaceholders.map((_, index) => (
          <GameRow key={index} />
        ))}
      </div>

      <Keyboard
        hidden={solved || gameover}
        updateDigit={updateDigit}
        setPrevCursor={setPrevCursor}
        setNextCursor={setNextCursor}
        input={input}
        cursor={cursor}
      />

      <div className={bottomSectionClasses}>
        <div className={bottomTextClasses}>
          {solved || gameover ? <TimeTillNextRiddle /> : message.text}
        </div>

        {solved || gameover ? (
          <Button
            className="bg-yellow-200 !text-[#22222f] hover:bg-yellow-400"
            onClick={clearAnswer}
          >
            Travel Back In Time
          </Button>
        ) : (
          <Button onClick={submit}>Submit Solution</Button>
        )}
      </div>
    </div>
  );
};
