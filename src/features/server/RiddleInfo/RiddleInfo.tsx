import { FC } from "react";

export const RiddleInfo: FC<{ id: number }> = ({ id }) => {
  const suffix = getNumberSuffix(id);

  return (
    <div className="mt-4">
      <small>the riddle for</small>
      <span className="tracking-widest font-black pl-1">{id}</span>
      <small>{suffix} day of UNIX time</small>
    </div>
  );
};

export const getNumberSuffix = (id: number) => {
  const lastNumberInId = [...String(id)].pop() ?? "";
  const suffixes: Record<string, string> = {
    "1": "st",
    "2": "nd",
    "3": "rd",
    default: "th",
  };
  return suffixes?.[lastNumberInId] ?? suffixes.default;
};
