"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { CrosswordGame } from "@/components/CrosswordGame";
import { ComingSoon } from "@/components/ComingSoon";
import { VHSConfession } from "@/components/VHSConfession";
import { OurMusic } from "@/components/OurMusic";
import { OurBaby } from "@/components/OurBaby";
import { LockScreen } from "@/components/LockScreen";
import { FloatingHearts } from "@/components/FloatingHearts";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSection, setActiveSection] = useState("crossword");

  // Sections that need the romantic background and header
  const romanticSections = ["crossword", "coming-soon"];
  const hideHeaderSections = ["confession", "music", "baby"];
  const showHearts = romanticSections.includes(activeSection);
  const showHeader = !hideHeaderSections.includes(activeSection);
  const showPadding = showHeader;

  // Show lock screen if not unlocked
  if (!isUnlocked) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="lockscreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LockScreen onUnlock={() => setIsUnlocked(true)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating hearts background - only for romantic sections */}
      {showHearts && <FloatingHearts />}

      {/* Header - hide for full-screen sections */}
      {showHeader && (
        <Header
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      )}

      {/* Main content */}
      <div className={showPadding ? "pt-20 md:pt-24" : ""}>
        <AnimatePresence mode="wait">
          {activeSection === "crossword" && (
            <motion.section
              key="crossword"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <CrosswordGame />
            </motion.section>
          )}

          {activeSection === "confession" && (
            <motion.section
              key="confession"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <VHSConfession onSectionChange={setActiveSection} />
            </motion.section>
          )}

          {activeSection === "music" && (
            <motion.section
              key="music"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OurMusic onSectionChange={setActiveSection} />
            </motion.section>
          )}

          {activeSection === "baby" && (
            <motion.section
              key="baby"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OurBaby onSectionChange={setActiveSection} />
            </motion.section>
          )}

          {activeSection === "coming-soon" && (
            <motion.section
              key="coming-soon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <ComingSoon />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - hide for full-screen sections */}
      {showHeader && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 py-8 text-center"
        >
          <p className="text-rose-950/40 text-sm font-sans">
            Made with endless love 💕
          </p>
        </motion.footer>
      )}
    </main>
  );
}
