export interface CrosswordWord {
  id: string;
  word: string;
  meaning: string;
  row: number;
  col: number;
  direction: "across" | "down";
  clue: string;
  number?: number;
}

export interface CrosswordCell {
  row: number;
  col: number;
  letter: string;
  wordIds: string[];
  isActive: boolean;
  number?: number;
}

export interface CrosswordGrid {
  cells: CrosswordCell[][];
  words: CrosswordWord[];
  size: number;
}

export interface GameState {
  completedWords: string[];
  currentInput: Record<string, string>; // cell key -> letter
}
