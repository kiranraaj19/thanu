"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gamepad2, Sparkles, Menu, X, Film, Music, Cat } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "crossword", label: "Crossword", icon: Gamepad2 },
  { id: "confession", label: "Confession", icon: Film },
  { id: "music", label: "Our Music", icon: Music },
  { id: "baby", label: "Our Baby", icon: Cat },
  { id: "coming-soon", label: "Coming Soon", icon: Sparkles },
];

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "glass border-b border-white/40"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange("crossword")}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart
                size={28}
                className="text-rose-500 fill-rose-500 drop-shadow-md"
              />
            </motion.div>
            <span className="font-handwritten text-2xl md:text-3xl text-rose-600 font-semibold">
              Our Story
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-full flex items-center gap-2",
                    "text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "text-rose-700"
                      : "text-rose-950/60 hover:text-rose-600"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-rose-100 to-lavender-100 rounded-full"
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon size={18} />
                    {item.label}
                    {item.id === "confession" && (
                      <span className="text-xs bg-rose-200 text-rose-700 px-1.5 py-0.5 rounded-full">
                        ♥
                      </span>
                    )}
                    {item.id === "music" && (
                      <span className="text-xs bg-green-200 text-green-700 px-1.5 py-0.5 rounded-full">
                        🎵
                      </span>
                    )}
                    {item.id === "baby" && (
                      <span className="text-xs bg-pink-200 text-pink-700 px-1.5 py-0.5 rounded-full">
                        🐱
                      </span>
                    )}
                    {item.id === "coming-soon" && (
                      <span className="text-xs bg-lavender-200 text-lavender-700 px-1.5 py-0.5 rounded-full">
                        ✨
                      </span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full bg-rose-100/50 text-rose-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-rose-100/50 bg-white/80 backdrop-blur-md"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl flex items-center gap-3",
                      "text-left font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-rose-100 to-lavender-100 text-rose-700"
                        : "text-rose-950/60 hover:bg-rose-50"
                    )}
                  >
                    <Icon size={20} />
                    {item.label}
                    {item.id === "confession" && (
                      <span className="ml-auto text-xs bg-rose-200 text-rose-700 px-2 py-0.5 rounded-full">
                        ♥
                      </span>
                    )}
                    {item.id === "music" && (
                      <span className="ml-auto text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full">
                        🎵
                      </span>
                    )}
                    {item.id === "baby" && (
                      <span className="ml-auto text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full">
                        🐱
                      </span>
                    )}
                    {item.id === "coming-soon" && (
                      <span className="ml-auto text-xs bg-lavender-200 text-lavender-700 px-2 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
