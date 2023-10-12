import { ComponentProps, FC, ReactNode } from "react";
import { Button } from "@/features/server";
import { TimeTillNextRiddle } from "@/features/client";
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
    updateDigit,
    setPrevCursor,
    setNextCursor,
  } = useGame(riddle, id);

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
        {[...Array(Math.max(0, INPUT_LENGTH - 1 - hintses.length))].map(
          (_, index) => (
            <GameRow key={index} />
          )
        )}
      </div>

      <Keyboard
        hidden={solved || gameover}
        updateDigit={updateDigit}
        setPrevCursor={setPrevCursor}
        setNextCursor={setNextCursor}
        input={input}
        cursor={cursor}
      />

      <div
        className={[
          "w-full flex flex-col items-center mt-12 transition ease-in-out",
          solved || gameover ? "-translate-y-[182px]" : "",
        ].join(" ")}
      >
        <div
          className={[
            "text-center text-lg tracking-wide",
            message.className,
          ].join(" ")}
        >
          {solved || gameover ? <TimeTillNextRiddle /> : message.text}
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

export const FeedbackMessage: FC<{ solved?: boolean; gameover?: boolean }> = ({
  solved,
  gameover,
}) => (
  <h2
    className={[
      "text-xl tracking-wide text-center mt-2 transition duration-800 ease-in-out",
      solved || gameover
        ? "scale-125 lg:scale-150"
        : "scale-100 delay-300 duration-1000",
    ].join(" ")}
  >
    {solved ? (
      <>
        Bravo!
        <br />
        You solved this riddle.
      </>
    ) : gameover ? (
      <>
        So close!
        <br />
        Good luck next time.
      </>
    ) : (
      <>
        &nbsp;
        <br />
        Will you guess it?
      </>
    )}
  </h2>
);

type KeyboardProps = {
  hidden?: boolean;
  setPrevCursor(): void;
  setNextCursor(): void;
  updateDigit(digit: string, index?: number): void;
  input: string;
  cursor: number;
};

const Keyboard: FC<KeyboardProps> = ({
  hidden,
  setPrevCursor,
  setNextCursor,
  updateDigit,
  input,
  cursor,
}) => (
  <div
    className={[
      "grid grid-cols-6 md:grid-cols-7 gap-1 w-full transition duration-500",
      hidden ? "scale-0" : "",
    ].join(" ")}
  >
    {[...Array(10)].map((_, index) => (
      <Key
        key={index}
        value={index}
        onClick={() => {
          updateDigit(String(index));
          setNextCursor();
        }}
      />
    ))}
    {["+", "-", "*", "/"].map((operator) => (
      <Key
        key={operator}
        value={operator}
        onClick={() => {
          updateDigit(operator);
          setNextCursor();
        }}
      />
    ))}
    <div className="col-span-4 md:col-span-3 md:col-start-3">
      <Key
        value="Backspace"
        onClick={() => {
          const isEmpty = input[cursor] === " ";
          updateDigit(" ", isEmpty ? cursor - 1 : cursor);
          if (isEmpty) setPrevCursor();
        }}
      />
    </div>
  </div>
);

export const Key: FC<{ value: ReactNode } & ComponentProps<"button">> = ({
  value,
  ...props
}) => (
  <button
    className={[
      "rounded-xl h-10 w-full flex justify-center items-center text-[#22222f] font-black text-2xl p-1 tracking-tighter",
      "bg-yellow-100/50 hover:bg-violet-200/50 active:scale-95",
    ].join(" ")}
    {...props}
  >
    {value}
  </button>
);
