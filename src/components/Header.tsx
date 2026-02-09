"use client";

import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className={cn("fixed top-0 left-0 right-0 z-50", "glass border-b border-white/40")}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange("crossword")}
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <Heart size={isMobile ? 24 : 28} className="text-rose-500 fill-rose-500 drop-shadow-md" />
            </motion.div>
            <span className="font-handwritten text-xl sm:text-2xl md:text-3xl text-rose-600 font-semibold">
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
                  className={cn("relative px-3 lg:px-4 py-2 rounded-full flex items-center gap-1.5 lg:gap-2", "text-sm font-medium transition-colors duration-300", isActive ? "text-rose-700" : "text-rose-950/60 hover:text-rose-600")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-rose-100 to-lavender-100 rounded-full" transition={{ type: "spring", damping: 25, stiffness: 200 }} />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Icon size={16} />
                    <span className="hidden lg:inline">{item.label}</span>
                    <span className="lg:hidden">{item.label.split(" ")[0]}</span>
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
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="md:hidden border-t border-rose-100/50 bg-white/90 backdrop-blur-md"
          >
            <nav className="px-3 py-3 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => { onSectionChange(item.id); setIsMobileMenuOpen(false); }}
                    className={cn("w-full px-4 py-3 rounded-xl flex items-center gap-3", "text-left font-medium transition-all", isActive ? "bg-gradient-to-r from-rose-100 to-lavender-100 text-rose-700" : "text-rose-950/60 hover:bg-rose-50")}
                  >
                    <Icon size={20} />
                    {item.label}
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
