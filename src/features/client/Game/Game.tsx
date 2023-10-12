import { FC } from "react";
import { Button } from "@/features/server";
import { INPUT_LENGTH } from "@/helpers";
import { GameRow } from "./GameRow";
import { useGame } from "./useGame";

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
  } = useGame(riddle, id);

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-lg tracking-wide text-center mt-2">
        {solved
          ? "Bravo! You solved this riddle."
          : gameover
          ? "I wish you more luck next time"
          : "Can you guess it?"}
      </h2>
      <div
        className="grid gap-2 my-12"
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
        {[...Array(Math.max(0, INPUT_LENGTH - 1 - hintses.length))].map(
          (_, index) => (
            <GameRow key={index} />
          )
        )}
      </div>

      <div className={["text-center", message.className].join(" ")}></div>

      <div className="w-full">
        <div
          className={[
            "text-center mt-4 text-lg tracking-wide",
            message.className,
          ].join(" ")}
        >
          {solved || gameover ? "Next riddle in 2h 30min 14s" : message.text}
        </div>
        {solved || gameover ? (
          <Button
            className="bg-orange-700 hover:bg-orange-600"
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
