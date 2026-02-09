"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, Sparkles, Cat, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase().trim() === "blue") {
      setIsSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setPassword("");
      }, 1500);
    }
  };

  const handleKeyPress = (key: string) => {
    if (password.length < 10) {
      setPassword((prev) => prev + key);
      setIsError(false);
    }
  };

  const handleBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const handleClear = () => {
    setPassword("");
    setIsError(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-lavender-100 flex items-center justify-center p-4">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart size={20 + Math.random() * 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative w-full max-w-md"
      >
        {/* Main Card */}
        <div
          className={cn(
            "relative rounded-3xl p-8 md:p-10",
            "bg-white/80 backdrop-blur-xl",
            "border border-white/60",
            "shadow-2xl shadow-rose-200/50"
          )}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 text-lavender-400"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={32} />
          </motion.div>
          <motion.div
            className="absolute -bottom-3 -left-3 text-rose-400"
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={24} />
          </motion.div>

          {/* Lock Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <motion.div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-rose-400 to-rose-500",
                "shadow-lg shadow-rose-300/50"
              )}
              animate={isSuccess ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="heart"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Heart size={48} className="text-white fill-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="lock"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Lock size={40} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-2"
          >
            <span className="font-handwritten text-3xl md:text-4xl text-rose-600">
              Who is our baby?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-rose-400/70 text-sm mb-8"
          >
            Enter the password to unlock our love story 💕
          </motion.p>

          {/* Password Display */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div
              className={cn(
                "relative h-16 rounded-2xl flex items-center justify-center",
                "bg-rose-50 border-2 transition-all duration-300",
                isError
                  ? "border-red-400 bg-red-50 shake"
                  : isSuccess
                  ? "border-green-400 bg-green-50"
                  : "border-rose-200 focus-within:border-rose-400"
              )}
            >
              <div className="flex items-center gap-2">
                {password.length === 0 ? (
                  <span className="text-rose-300/50 text-lg">Type here...</span>
                ) : (
                  Array.from(password).map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      className={cn(
                        "text-2xl font-bold",
                        isError
                          ? "text-red-500"
                          : isSuccess
                          ? "text-green-600"
                          : "text-rose-600"
                      )}
                    >
                      {showPassword ? char : "●"}
                    </motion.span>
                  ))
                )}
              </div>

              {/* Show/Hide toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 p-2 text-rose-400 hover:text-rose-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error/Success Message */}
            <AnimatePresence>
              {isError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-red-500 text-sm mt-2"
                >
                  Oops! That&apos;s not right 🙈
                </motion.p>
              )}
              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-green-600 text-sm mt-2"
                >
                  Welcome, my love! 💕
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Custom Keypad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-3 mb-4"
          >
            {"ABCDEFGHI".split("").map((key) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "h-14 rounded-xl font-semibold text-lg",
                  "bg-rose-100 text-rose-700",
                  "hover:bg-rose-200 transition-colors",
                  "shadow-sm"
                )}
              >
                {key}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {"JKLMNOPQR".split("").map((key) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "h-14 rounded-xl font-semibold text-lg",
                  "bg-rose-100 text-rose-700",
                  "hover:bg-rose-200 transition-colors",
                  "shadow-sm"
                )}
              >
                {key}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {"STUVWXYZ".split("").map((key) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "h-14 rounded-xl font-semibold text-lg",
                  "bg-rose-100 text-rose-700",
                  "hover:bg-rose-200 transition-colors",
                  "shadow-sm"
                )}
              >
                {key}
              </motion.button>
            ))}
            <motion.button
              type="button"
              onClick={handleBackspace}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "h-14 rounded-xl font-semibold",
                "bg-amber-100 text-amber-700",
                "hover:bg-amber-200 transition-colors",
                "shadow-sm"
              )}
            >
              ⌫
            </motion.button>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-3"
          >
            <motion.button
              type="button"
              onClick={handleClear}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex-1 py-3 rounded-xl font-medium",
                "bg-gray-100 text-gray-600",
                "hover:bg-gray-200 transition-colors"
              )}
            >
              Clear
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={password.length === 0}
              whileHover={{ scale: password.length > 0 ? 1.02 : 1 }}
              whileTap={{ scale: password.length > 0 ? 0.98 : 1 }}
              className={cn(
                "flex-[2] py-3 rounded-xl font-semibold",
                "transition-all duration-300",
                password.length > 0
                  ? "bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg shadow-rose-300/50"
                  : "bg-rose-100 text-rose-300 cursor-not-allowed"
              )}
            >
              Unlock 🔓
            </motion.button>
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-rose-300/50 text-xs mt-6"
          >
            Hint: It&apos;s a color... and our baby&apos;s name! 🐱
          </motion.p>
        </div>

        {/* Cat decoration */}
        <motion.div
          className="absolute -bottom-6 right-8"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
            <Cat size={32} className="text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Shake animation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
