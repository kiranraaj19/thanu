import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a unique key for a cell
export function getCellKey(row: number, col: number): string {
  return `${row}-${col}`;
}

// Parse cell key back to coordinates
export function parseCellKey(key: string): { row: number; col: number } {
  const [row, col] = key.split("-").map(Number);
  return { row, col };
}
