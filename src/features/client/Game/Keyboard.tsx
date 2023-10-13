import { cx } from "@/helpers";
import { ComponentProps, FC, ReactNode } from "react";

type Props = {
  hidden?: boolean;
  setPrevCursor(): void;
  setNextCursor(): void;
  updateDigit(digit: string, index?: number): void;
  input: string;
  cursor: number;
};

export const Keyboard: FC<Props> = ({
  hidden,
  setPrevCursor,
  setNextCursor,
  updateDigit,
  input,
  cursor,
}) => (
  <div
    className={cx([
      "grid grid-cols-6 md:grid-cols-7 gap-1 w-full transition duration-500",
      hidden ? "scale-0" : "",
    ])}
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
    className={cx([
      "rounded-xl h-10 w-full flex justify-center items-center text-[#22222f] font-black text-2xl p-1 tracking-tighter",
      "bg-yellow-100/50 hover:bg-violet-200/50 active:scale-95",
    ])}
    {...props}
  >
    {value}
  </button>
);
