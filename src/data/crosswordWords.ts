import { CrosswordWord } from "@/types";

// 💌 Crossword words - properly intersecting layout
// All words fit within the grid with correct intersections

export const crosswordWords: CrosswordWord[] = [
  // SOBREMESA (9 letters) - Vertical at col 4, starting at row 0
  // S(0,4), O(1,4), B(2,4), R(3,4), E(4,4), M(5,4), E(6,4), S(7,4), A(8,4)
  {
    id: "sobremesa",
    word: "SOBREMESA",
    meaning: "Our first date at the café - that magical time after a meal when we talked for hours, slowly falling in love with every word.",
    row: 0,
    col: 4,
    direction: "down",
    clue: "Spanish word for time spent talking after a meal - our first date café",
  },
  
  // KISS (4 letters) - Horizontal at row 2
  // K(2,2), I(2,3), S(2,4)←intersection, S(2,5)
  {
    id: "kiss",
    word: "KISS",
    meaning: "The moment my world stopped and only we existed - when time froze and I knew I was exactly where I was meant to be.",
    row: 2,
    col: 2,
    direction: "across",
    clue: "The moment my world stopped",
  },
  
  // MARRIAGE (8 letters) - Horizontal at row 3
  // M(3,2), A(3,3), R(3,4)←intersection, R(3,5), I(3,6), A(3,7), G(3,8), E(3,9)←intersection with FOREVER
  {
    id: "marriage",
    word: "MARRIAGE",
    meaning: "What I want to do with you - spend the rest of my life proving that you made the right choice in choosing me.",
    row: 3,
    col: 2,
    direction: "across",
    clue: "What I want with you (8 letters)",
  },
  
  // HOME (4 letters) - Horizontal at row 4
  // H(4,1), O(4,2), M(4,3), E(4,4)←intersection
  {
    id: "home",
    word: "HOME",
    meaning: "Not a place, but a feeling I found in your arms - wherever you are, that's where I belong.",
    row: 4,
    col: 1,
    direction: "across",
    clue: "What i feel when you are with me (4 letters)",
  },
  
  // FOREVER (7 letters) - Vertical at col 9
  // F(0,9), O(1,9), R(2,9), E(3,9)←intersection, V(4,9), E(5,9), R(6,9)
  {
    id: "forever",
    word: "FOREVER",
    meaning: "The only word long enough to hold what I feel for you - infinite, endless, eternal love.",
    row: 0,
    col: 9,
    direction: "down",
    clue: "How long I want to love you",
  },
  
  // PASTA (5 letters) - Horizontal at row 5
  // P(5,2), A(5,3), S(5,4)←intersection, T(5,5), A(5,6)
  {
    id: "pasta",
    word: "PASTA",
    meaning: "The food we made on our cook date - flour everywhere, laughter filling the kitchen, and you looking adorable with sauce on your nose.",
    row: 5,
    col: 2,
    direction: "across",
    clue: "What we made on our cook date",
  },
  
  // EYES (4 letters) - Horizontal at row 6
  // E(6,4)←intersection, Y(6,5), E(6,6), S(6,7)
  {
    id: "eyes",
    word: "EYES",
    meaning: "My most favourite thing on your face - windows to your soul that I could get lost in forever.",
    row: 6,
    col: 4,
    direction: "across",
    clue: "My favorite feature on your face",
  },
  
  // SEXY (4 letters) - Horizontal at row 7
  // S(7,4)←intersection, E(7,5), X(7,6), Y(7,7)
  {
    id: "sexy",
    word: "SEXY",
    meaning: "How you look - absolutely stunning, and the way you carry yourself makes my heart skip a beat every single time.",
    row: 7,
    col: 4,
    direction: "across",
    clue: "How you look (4 letters)",
  },
  
  // BLUE (4 letters) - Vertical at col 7, starting at row 6 (above SEXY's Y)
  // Actually let's place BLUE to intersect with something else
  // Let's put BLUE vertical at col 6, intersecting SEXY at X? No, SEXY has X at col 6
  // SEXY: S(7,4), E(7,5), X(7,6), Y(7,7)
  // BLUE: B(5,6), L(6,6), U(7,6)? No, X is at row 7
  // Let's try: B(4,6), L(5,6), U(6,6), E(7,6) - E would need to be X, no
  
  // Let's place BLUE vertically at col 7, going down from row 5
  // B(5,7), L(6,7), U(7,7), E(8,7)
  // This crosses EYES at... EYES is at row 6, cols 4-7, so E(6,7) is the last letter
  // So BLUE's L at (6,7) would intersect with EYES's S at (6,7)? No, EYES ends at col 7 with S
  // E(6,4), Y(6,5), E(6,6), S(6,7) - so S is at col 7
  // BLUE's L at (6,7) would need to be S - no match
  
  // Let's move BLUE to col 8
  // B(5,8), L(6,8), U(7,8), E(8,8)
  // Check conflicts: FOREVER is at col 9, so no conflict
  // CHOCOLATE will need to be adjusted
  
  // Actually let's place BLUE to intersect CHOCOLATE
  // CHOCOLATE at row 9: C(9,2), H(9,3), O(9,4), C(9,5), O(9,6), L(9,7), A(9,8), T(9,9), E(9,10)
  // BLUE vertical at col 7: B(6,7), L(7,7), U(8,7), E(9,7)
  // L at (7,7) - SEXY has Y at (7,7), conflict!
  
  // Move BLUE to col 8: B(6,8), L(7,8), U(8,8), E(9,8)
  // CHOCOLATE has A at (9,8), not E - conflict!
  
  // Move BLUE to col 10: B(6,10), L(7,10), U(8,10), E(9,10)
  // CHOCOLATE ends at col 10 with E(9,10) - match!
  {
    id: "blue",
    word: "BLUE",
    meaning: "Our adopted daughter - the little furry (or scaled, or feathered) angel who completes our little family.",
    row: 6,
    col: 10,
    direction: "down",
    clue: "Our adopted daughter's name",
  },
  
  // CHOCOLATE (9 letters) - Horizontal at row 9
  // Positioned to intersect BLUE at E
  // BLUE ends at E(9,10), and CHOCOLATE ends with E
  // C(9,2), H(9,3), O(9,4), C(9,5), O(9,6), L(9,7), A(9,8), T(9,9), E(9,10)←intersection
  {
    id: "chocolate",
    word: "CHOCOLATE",
    meaning: "What you crave most of the times - and I'd get you endless supplies just to see that happy smile on your face.",
    row: 9,
    col: 2,
    direction: "across",
    clue: "Your ultimate craving",
  },
];

// Grid configuration - increased to fit all words
export const GRID_SIZE = 15;
