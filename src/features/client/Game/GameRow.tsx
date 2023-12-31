import { FC } from "react";
import { INPUT_LENGTH, cx } from "@/helpers";
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
        className={cx([
          "absolute -z-10 left-0 right-0 top-0 w-auto h-full rounded-xl transition duration-700 ease-out border-4",
          selectedIndex === index ? "border-yellow-200" : "border-transparent",
          hints
            ? hints[index]?.correct
              ? "bg-green-500"
              : hints?.[index].misplaced
              ? "bg-yellow-500"
              : "bg-gray-600/50"
            : solved
            ? "bg-green-900/25 scale-x-[4000%] scale-y-[3000%] xl:scale-x-[6000%] xl:scale-y-[3000%] -translate-y-[300%] !rounded-full !rotate-0"
            : !hints
            ? "bg-yellow-50/25"
            : "",
          bgClass,
        ])}
      />
      <div
        className={cx([
          "absolute left-0 right-0 top-0 p-1 w-full h-full flex justify-center items-center text-2xl font-black transition duration-300 ease-out",
          solved ? "text-white scale-150" : "text-[#22222f]",
        ])}
      >
        {hints ? hints![index].char : value?.[index] ?? ""}
      </div>
    </div>
  ));
