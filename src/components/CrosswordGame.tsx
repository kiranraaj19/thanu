"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrosswordWord } from "@/types";
import { generateCrosswordGrid, getCompletedWords, getWordsAtCell } from "@/lib/crosswordGenerator";
import { RomanticModal } from "./RomanticModal";

export function CrosswordGame() {
  const grid = generateCrosswordGrid();
  const [userInput, setUserInput] = useState<Record<string, string>>({});
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<"across" | "down">("across");
  const [modalWord, setModalWord] = useState<CrosswordWord | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Check for completed words whenever input changes
  useEffect(() => {
    const newCompleted = getCompletedWords(grid.words, userInput);
    
    // Find newly completed words
    const newlyCompleted = newCompleted.filter(
      (id) => !completedWords.includes(id)
    );

    if (newlyCompleted.length > 0) {
      setCompletedWords(newCompleted);
      // Show modal for the first newly completed word
      const word = grid.words.find((w) => w.id === newlyCompleted[0]);
      if (word) {
        setTimeout(() => setModalWord(word), 300);
      }
    }
  }, [userInput, grid.words, completedWords]);

  const handleCellChange = useCallback(
    (row: number, col: number, value: string) => {
      const key = `${row}-${col}`;
      const letter = value.slice(-1).toUpperCase();
      
      if (letter && /^[A-Z]$/.test(letter)) {
        setUserInput((prev) => ({ ...prev, [key]: letter }));
        
        // Auto-advance to next cell
        const words = getWordsAtCell(row, col, grid.words);
        const activeWord = words.find((w) => w.direction === selectedDirection) || words[0];
        
        if (activeWord) {
          const letters = activeWord.word.split("");
          const currentIndex = activeWord.direction === "across" 
            ? col - activeWord.col 
            : row - activeWord.row;
          
          if (currentIndex < letters.length - 1) {
            const nextRow = activeWord.direction === "across" ? row : row + 1;
            const nextCol = activeWord.direction === "across" ? col + 1 : col;
            const nextKey = `${nextRow}-${nextCol}`;
            
            setTimeout(() => {
              inputRefs.current[nextKey]?.focus();
            }, 50);
          }
        }
      }
    },
    [grid.words, selectedDirection]
  );

  const handleKeyDown = useCallback(
    (row: number, col: number, e: React.KeyboardEvent) => {
      const key = `${row}-${col}`;
      
      if (e.key === "Backspace") {
        if (!userInput[key]) {
          // Move to previous cell
          const words = getWordsAtCell(row, col, grid.words);
          const activeWord = words.find((w) => w.direction === selectedDirection) || words[0];
          
          if (activeWord) {
            const currentIndex = activeWord.direction === "across" 
              ? col - activeWord.col 
              : row - activeWord.row;
            
            if (currentIndex > 0) {
              const prevRow = activeWord.direction === "across" ? row : row - 1;
              const prevCol = activeWord.direction === "across" ? col - 1 : col;
              const prevKey = `${prevRow}-${prevCol}`;
              
              inputRefs.current[prevKey]?.focus();
            }
          }
        } else {
          setUserInput((prev) => {
            const newInput = { ...prev };
            delete newInput[key];
            return newInput;
          });
        }
      } else if (e.key === "ArrowRight") {
        setSelectedDirection("across");
        const nextKey = `${row}-${col + 1}`;
        inputRefs.current[nextKey]?.focus();
      } else if (e.key === "ArrowLeft") {
        setSelectedDirection("across");
        const nextKey = `${row}-${col - 1}`;
        inputRefs.current[nextKey]?.focus();
      } else if (e.key === "ArrowDown") {
        setSelectedDirection("down");
        const nextKey = `${row + 1}-${col}`;
        inputRefs.current[nextKey]?.focus();
      } else if (e.key === "ArrowUp") {
        setSelectedDirection("down");
        const nextKey = `${row - 1}-${col}`;
        inputRefs.current[nextKey]?.focus();
      }
    },
    [grid.words, selectedDirection, userInput]
  );

  const isCellInCompletedWord = (row: number, col: number): boolean => {
    const words = getWordsAtCell(row, col, grid.words);
    return words.some((word) => completedWords.includes(word.id));
  };

  const getCellHighlightClass = (row: number, col: number): string => {
    if (!selectedCell) return "";
    
    const words = getWordsAtCell(row, col, grid.words);
    const selectedWords = getWordsAtCell(selectedCell.row, selectedCell.col, grid.words);
    
    const isRelated = words.some((w) => 
      selectedWords.some((sw) => sw.id === w.id)
    );
    
    if (isRelated) {
      return "bg-rose-100 ring-2 ring-rose-300";
    }
    
    return "";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="text-lavender-400" size={24} />
          <Heart className="text-rose-400 fill-rose-400" size={32} />
          <Sparkles className="text-lavender-400" size={24} />
        </motion.div>
        
        <h2 className="font-serif text-4xl md:text-5xl font-semibold gradient-text mb-4">
          Our Love in Words
        </h2>
        <p className="text-rose-950/70 text-lg max-w-xl mx-auto font-sans">
          Fill in the puzzle to uncover the beautiful memories we&apos;ve shared together.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-rose-600">
            <CheckCircle2 size={20} />
            <span className="font-medium">
              {completedWords.length} / {grid.words.length} memories unlocked
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 max-w-xs mx-auto h-2 bg-rose-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-400 to-lavender-400"
            initial={{ width: 0 }}
            animate={{ width: `${(completedWords.length / grid.words.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Crossword Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="perspective-1000"
        >
          <motion.div
            className={cn(
              "inline-block p-4 rounded-2xl",
              "bg-white/80 backdrop-blur-sm",
              "shadow-xl shadow-rose-200/50",
              "border border-white/60"
            )}
            whileHover={{ rotateY: 2, rotateX: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${grid.size}, minmax(0, 1fr))`,
              }}
            >
              {grid.cells.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const isCompleted = isCellInCompletedWord(rowIndex, colIndex);
                  const isSelected =
                    selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

                  if (!cell.isActive) {
                    return (
                      <div
                        key={key}
                        className="w-8 h-8 md:w-10 md:h-10 bg-transparent"
                      />
                    );
                  }

                  return (
                    <motion.div
                      key={key}
                      className={cn(
                        "relative w-8 h-8 md:w-10 md:h-10",
                        "rounded-lg overflow-hidden"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Cell number */}
                      {cell.number && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] md:text-[10px] font-medium text-rose-400 z-10">
                          {cell.number}
                        </span>
                      )}

                      <input
                        ref={(el) => {
                          inputRefs.current[key] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={userInput[key] || ""}
                        onChange={(e) =>
                          handleCellChange(rowIndex, colIndex, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
                        onFocus={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                        className={cn(
                          "w-full h-full text-center text-sm md:text-base font-semibold uppercase",
                          "bg-white border-2 rounded-lg transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400",
                          isCompleted
                            ? "bg-gradient-to-br from-green-100 to-green-50 border-green-300 text-green-700"
                            : "border-rose-200 text-rose-950",
                          isSelected && "ring-2 ring-rose-400 border-rose-400",
                          getCellHighlightClass(rowIndex, colIndex)
                        )}
                      />
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Instructions */}
          <div className="mt-6 text-center text-sm text-rose-950/60">
            <p>Use arrow keys to navigate • Type to fill in letters</p>
          </div>
        </motion.div>

        {/* Clues Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Across */}
          <div className="glass rounded-2xl p-6 shadow-lg">
            <h3 className="font-serif text-xl font-semibold text-rose-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-sm">
                →
              </span>
              Across
            </h3>
            <ul className="space-y-3">
              {grid.words
                .filter((w) => w.direction === "across")
                .map((word, index) => (
                  <motion.li
                    key={word.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer",
                      completedWords.includes(word.id)
                        ? "bg-green-50 border border-green-200"
                        : "bg-white/50 hover:bg-white/80 border border-transparent"
                    )}
                    onClick={() => {
                      const key = `${word.row}-${word.col}`;
                      inputRefs.current[key]?.focus();
                    }}
                  >
                    <span className="font-medium text-rose-400 min-w-[24px]">
                      {word.number || index + 1}.
                    </span>
                    <div className="flex-1">
                      <span
                        className={cn(
                          "text-sm",
                          completedWords.includes(word.id)
                            ? "text-green-700 line-through"
                            : "text-rose-950/80"
                        )}
                      >
                        {word.clue}
                      </span>
                      {completedWords.includes(word.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 mt-1 text-green-600 text-xs"
                        >
                          <CheckCircle2 size={12} />
                          <span>Unlocked!</span>
                        </motion.div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(showHint === word.id ? null : word.id);
                      }}
                      className="p-1.5 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                    >
                      <Lightbulb size={16} />
                    </button>
                  </motion.li>
                ))}
            </ul>
          </div>

          {/* Down */}
          <div className="glass rounded-2xl p-6 shadow-lg">
            <h3 className="font-serif text-xl font-semibold text-rose-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm">
                ↓
              </span>
              Down
            </h3>
            <ul className="space-y-3">
              {grid.words
                .filter((w) => w.direction === "down")
                .map((word, index) => (
                  <motion.li
                    key={word.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer",
                      completedWords.includes(word.id)
                        ? "bg-green-50 border border-green-200"
                        : "bg-white/50 hover:bg-white/80 border border-transparent"
                    )}
                    onClick={() => {
                      const key = `${word.row}-${word.col}`;
                      inputRefs.current[key]?.focus();
                    }}
                  >
                    <span className="font-medium text-lavender-400 min-w-[24px]">
                      {word.number || index + 1}.
                    </span>
                    <div className="flex-1">
                      <span
                        className={cn(
                          "text-sm",
                          completedWords.includes(word.id)
                            ? "text-green-700 line-through"
                            : "text-rose-950/80"
                        )}
                      >
                        {word.clue}
                      </span>
                      {completedWords.includes(word.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 mt-1 text-green-600 text-xs"
                        >
                          <CheckCircle2 size={12} />
                          <span>Unlocked!</span>
                        </motion.div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(showHint === word.id ? null : word.id);
                      }}
                      className="p-1.5 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                    >
                      <Lightbulb size={16} />
                    </button>
                  </motion.li>
                ))}
            </ul>
          </div>

          {/* Hint display */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-xl p-4 border-l-4 border-amber-400"
              >
                <p className="text-sm text-rose-950/70">
                  <span className="font-medium text-amber-600">Hint: </span>
                  {grid.words.find((w) => w.id === showHint)?.word.length} letters
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Romantic Modal */}
      <RomanticModal
        isOpen={!!modalWord}
        onClose={() => setModalWord(null)}
        word={modalWord?.word || ""}
        meaning={modalWord?.meaning || ""}
      />

      {/* Completion Celebration */}
      <AnimatePresence>
        {completedWords.length === grid.words.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={120} className="text-rose-500 fill-rose-500 drop-shadow-2xl" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 font-serif text-3xl text-rose-600 font-semibold"
              >
                You unlocked all our memories! 💕
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
