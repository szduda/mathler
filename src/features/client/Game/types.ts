export type Hint = {
  char: string;
  correct: boolean;
  misplaced: boolean;
};

export type Message = {
  text: string;
  className?: string;
};

export type RiddleResponse = {
  solved?: boolean;
  message?: string;
  hints?: Hint[];
};
