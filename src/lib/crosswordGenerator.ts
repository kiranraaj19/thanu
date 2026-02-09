import { CrosswordWord, CrosswordCell, CrosswordGrid } from "@/types";
import { crosswordWords, GRID_SIZE } from "@/data/crosswordWords";

// Generate the crossword grid from word data
export function generateCrosswordGrid(): CrosswordGrid {
  // Initialize empty grid
  const cells: CrosswordCell[][] = Array(GRID_SIZE)
    .fill(null)
    .map((_, row) =>
      Array(GRID_SIZE)
        .fill(null)
        .map((_, col) => ({
          row,
          col,
          letter: "",
          wordIds: [],
          isActive: false,
        }))
    );

  let cellNumber = 1;
  const numberMap = new Map<string, number>();

  // Place words on the grid
  crosswordWords.forEach((word) => {
    const letters = word.word.split("");
    
    letters.forEach((letter, index) => {
      const row = word.direction === "across" ? word.row : word.row + index;
      const col = word.direction === "across" ? word.col + index : word.col;

      if (row < GRID_SIZE && col < GRID_SIZE) {
        const cell = cells[row][col];
        cell.letter = letter;
        cell.isActive = true;
        cell.wordIds.push(word.id);

        // Assign number to starting cells
        if (index === 0) {
          const key = `${row}-${col}`;
          if (!numberMap.has(key)) {
            numberMap.set(key, cellNumber++);
          }
          cell.number = numberMap.get(key);
        }
      }
    });
  });

  return {
    cells,
    words: crosswordWords,
    size: GRID_SIZE,
  };
}

// Check if a word is complete and correct
export function checkWordComplete(
  word: CrosswordWord,
  userInput: Record<string, string>
): boolean {
  const letters = word.word.split("");
  
  for (let i = 0; i < letters.length; i++) {
    const row = word.direction === "across" ? word.row : word.row + i;
    const col = word.direction === "across" ? word.col + i : word.col;
    const key = `${row}-${col}`;
    
    if (userInput[key]?.toUpperCase() !== letters[i]) {
      return false;
    }
  }
  
  return true;
}

// Get all completed words
export function getCompletedWords(
  words: CrosswordWord[],
  userInput: Record<string, string>
): string[] {
  return words
    .filter((word) => checkWordComplete(word, userInput))
    .map((word) => word.id);
}

// Find the next empty cell in a word
export function findNextEmptyCell(
  word: CrosswordWord,
  userInput: Record<string, string>,
  currentRow: number,
  currentCol: number
): { row: number; col: number } | null {
  const letters = word.word.split("");
  
  // Find current index
  let currentIndex = -1;
  if (word.direction === "across") {
    currentIndex = currentCol - word.col;
  } else {
    currentIndex = currentRow - word.row;
  }

  // Look for next empty cell
  for (let i = currentIndex + 1; i < letters.length; i++) {
    const row = word.direction === "across" ? word.row : word.row + i;
    const col = word.direction === "across" ? word.col + i : word.col;
    const key = `${row}-${col}`;
    
    if (!userInput[key]) {
      return { row, col };
    }
  }
  
  return null;
}

// Get word at a specific cell
export function getWordsAtCell(
  row: number,
  col: number,
  words: CrosswordWord[]
): CrosswordWord[] {
  return words.filter((word) => {
    const letters = word.word.split("");
    for (let i = 0; i < letters.length; i++) {
      const r = word.direction === "across" ? word.row : word.row + i;
      const c = word.direction === "across" ? word.col + i : word.col;
      if (r === row && c === col) {
        return true;
      }
    }
    return false;
  });
}
