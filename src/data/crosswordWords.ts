import { CrosswordWord } from "@/types";

// 💌 Crossword words - each one holds a piece of our story
// Compact layout with words tightly intersecting

export const crosswordWords: CrosswordWord[] = [
  // MARRIAGE (8 letters) - Main horizontal word
  {
    id: "marriage",
    word: "MARRIAGE",
    meaning: "What I want to do with you - spend the rest of my life proving that you made the right choice in choosing me.",
    row: 4,
    col: 0,
    direction: "across",
    clue: "What I want with you (8 letters)",
  },
  // SOBREMESA (9 letters) - Vertical, crosses MARRIAGE at R (row 4, col 2)
  {
    id: "sobremesa",
    word: "SOBREMESA",
    meaning: "Our first date at the café - that magical time after a meal when we talked for hours, slowly falling in love with every word.",
    row: 0,
    col: 2,
    direction: "down",
    clue: "Spanish word for time spent talking after a meal - our first date café",
  },
  // SEXY (4 letters) - Vertical, crosses MARRIAGE at A (row 4, col 4)
  {
    id: "sexy",
    word: "SEXY",
    meaning: "How you look - absolutely stunning, and the way you carry yourself makes my heart skip a beat every single time.",
    row: 4,
    col: 4,
    direction: "down",
    clue: "How you look (4 letters)",
  },
  // KISS (4 letters) - Horizontal, crosses SOBREMESA at S (row 2, col 2)
  {
    id: "kiss",
    word: "KISS",
    meaning: "The moment my world stopped and only we existed - when time froze and I knew I was exactly where I was meant to be.",
    row: 2,
    col: 0,
    direction: "across",
    clue: "The moment my world stopped",
  },
  // PASTA (5 letters) - Horizontal, crosses SOBREMESA at S (row 6, col 2)
  {
    id: "pasta",
    word: "PASTA",
    meaning: "The food we made on our cook date - flour everywhere, laughter filling the kitchen, and you looking adorable with sauce on your nose.",
    row: 6,
    col: 0,
    direction: "across",
    clue: "What we made on our cook date",
  },
  // EYES (4 letters) - Horizontal, crosses SOBREMESA at E (row 8, col 2)
  {
    id: "eyes",
    word: "EYES",
    meaning: "My most favourite thing on your face - windows to your soul that I could get lost in forever.",
    row: 8,
    col: 0,
    direction: "across",
    clue: "My favorite feature on your face",
  },
  // HOME (4 letters) - Horizontal, crosses SEXY at E (row 6, col 4)
  {
    id: "home",
    word: "HOME",
    meaning: "Not a place, but a feeling I found in your arms - wherever you are, that's where I belong.",
    row: 6,
    col: 4,
    direction: "across",
    clue: "Where I feel safest with you",
  },
  // FOREVER (7 letters) - Vertical, crosses MARRIAGE at I (row 4, col 6)
  {
    id: "forever",
    word: "FOREVER",
    meaning: "The only word long enough to hold what I feel for you - infinite, endless, eternal love.",
    row: 2,
    col: 6,
    direction: "down",
    clue: "How long I want to love you",
  },
  // CHOCOLATE (9 letters) - Horizontal, crosses FOREVER at R (row 8, col 6)
  {
    id: "chocolate",
    word: "CHOCOLATE",
    meaning: "What you crave most of the times - and I'd get you endless supplies just to see that happy smile on your face.",
    row: 8,
    col: 4,
    direction: "across",
    clue: "Your ultimate craving",
  },
  // BLUE (4 letters) - Vertical, crosses CHOCOLATE at O (row 8, col 7)
  {
    id: "blue",
    word: "BLUE",
    meaning: "Our adopted daughter - the little furry (or scaled, or feathered) angel who completes our little family.",
    row: 8,
    col: 7,
    direction: "down",
    clue: "Our adopted daughter's name",
  },
  // LOVE (4 letters) - Horizontal, crosses FOREVER at E (row 5, col 6)
  {
    id: "love",
    word: "LOVE",
    meaning: "What I feel for you - deeper than oceans, higher than mountains, and more vast than the universe.",
    row: 5,
    col: 6,
    direction: "across",
    clue: "What I feel for you (4 letters)",
  },
];

// Grid configuration - compact size
export const GRID_SIZE = 12;
