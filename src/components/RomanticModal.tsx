"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RomanticModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  meaning: string;
}

export function RomanticModal({ isOpen, onClose, word, meaning }: RomanticModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-rose-950/30 modal-backdrop z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                delay: 0.1,
              }}
              className="relative w-full max-w-md pointer-events-auto perspective-1000"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card with 3D effect */}
              <motion.div
                className={cn(
                  "relative bg-gradient-to-br from-white via-rose-50 to-lavender-50",
                  "rounded-3xl p-8 shadow-2xl",
                  "border border-white/60"
                )}
                style={{
                  boxShadow: "0 25px 50px -12px rgba(225, 29, 72, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
                }}
                whileHover={{ rotateY: 2, rotateX: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-rose-100/50 text-rose-400 hover:bg-rose-200/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                {/* Sparkle decorations */}
                <motion.div
                  className="absolute -top-3 -left-3 text-lavender-400"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={24} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -right-2 text-rose-400"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>

                {/* Heart animation */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <Heart
                      size={64}
                      className="text-rose-500 fill-rose-500 drop-shadow-lg"
                      strokeWidth={1.5}
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-xl bg-rose-400/40 rounded-full -z-10" />
                  </motion.div>
                </motion.div>

                {/* Word display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <h3 className="font-serif text-3xl font-semibold gradient-text tracking-wide">
                    {word}
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-rose-300 to-lavender-300 mx-auto mt-3 rounded-full" />
                </motion.div>

                {/* Meaning with typewriter-like reveal */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-rose-950/80 font-sans text-lg leading-relaxed italic"
                >
                  &ldquo;{meaning}&rdquo;
                </motion.p>

                {/* Decorative hearts at bottom */}
                <motion.div
                  className="flex justify-center gap-2 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Heart
                        size={12}
                        className={cn(
                          "fill-current",
                          i % 2 === 0 ? "text-rose-300" : "text-lavender-300"
                        )}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Continue button */}
                <motion.button
                  onClick={onClose}
                  className={cn(
                    "w-full mt-6 py-3 px-6 rounded-full",
                    "bg-gradient-to-r from-rose-400 to-rose-500",
                    "text-white font-medium",
                    "shadow-lg shadow-rose-300/50",
                    "hover:shadow-xl hover:shadow-rose-300/60",
                    "transition-all duration-300"
                  )}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Continue Our Journey 💕
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
