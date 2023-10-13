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
