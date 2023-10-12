import { FC } from "react";
import { INPUT_LENGTH } from "@/helpers";
import { Hint } from "./types";

type Props = (
  | {
      hints: Hint[];
      value?: never;
    }
  | {
      hints?: never;
      value?: string;
    }
) & {
  bgClass?: string;
  solved?: boolean;
  selectedIndex?: number;
};

export const GameRow: FC<Props> = ({
  hints,
  value,
  bgClass,
  solved = false,
  selectedIndex = -1,
}) =>
  [...new Array(INPUT_LENGTH)].map((_, index) => (
    <div className="relative w-10 h-10" key={index}>
      <div
        style={{
          transitionDelay: `${(1 + (solved ? index : -1)) * 50}ms`,
          zIndex: solved ? -100 : -10,
        }}
        className={[
          "absolute -z-10 left-0 right-0 top-0 w-auto h-full rounded-xl transition duration-500 ease-out border-4",
          selectedIndex === index ? "border-yellow-200" : "border-transparent",
          hints
            ? hints[index]?.correct
              ? "bg-green-500"
              : hints?.[index].misplaced
              ? "bg-yellow-500"
              : "bg-gray-600/50"
            : solved
            ? "bg-green-900/25 scale-[4000%] !rounded-full"
            : !hints
            ? "bg-yellow-50/25"
            : "",
          bgClass,
        ].join(" ")}
      />
      <div
        className={[
          "absolute left-0 right-0 top-0 p-1 w-full h-full flex justify-center items-center text-2xl font-black transition duration-300 ease-out",
          solved ? "text-white scale-150" : "text-[#22222f]",
        ].join(" ")}
      >
        {hints ? hints![index].char : value?.[index] ?? ""}
      </div>
    </div>
  ));
