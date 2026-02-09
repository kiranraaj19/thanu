"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, Heart, AlertCircle, Home, Music, Cat, Gamepad2 } from "lucide-react";
import { confessionSlides } from "@/data/confessionSlides";
import { cn } from "@/lib/utils";

interface VHSConfessionProps {
  onSectionChange?: (section: string) => void;
}

export function VHSConfession({ onSectionChange }: VHSConfessionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [sheSaidYes, setSheSaidYes] = useState(false);
  
  // Audio refs
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const fireworksRef = useRef<HTMLAudioElement | null>(null);
  const [musicError, setMusicError] = useState(false);

  // Initialize audio
  useEffect(() => {
    // Background music
    const bgMusic = new Audio("/music/our-song.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.7;
    bgMusicRef.current = bgMusic;

    // Fireworks sound
    const fireworks = new Audio("/music/fireworks.mp3");
    fireworks.volume = 0.8;
    fireworksRef.current = fireworks;

    // Check if music exists
    bgMusic.addEventListener("error", () => {
      setMusicError(true);
    });

    return () => {
      bgMusic.pause();
      fireworks.pause();
    };
  }, []);

  // Control background music based on slideshow state
  useEffect(() => {
    if (!bgMusicRef.current || musicError) return;

    if (isPlaying || showProposal) {
      // Play music when slideshow is playing or at proposal
      bgMusicRef.current.play().catch(() => {
        // Browser blocked autoplay
      });
    } else {
      // Pause music when slideshow is paused
      bgMusicRef.current.pause();
    }
  }, [isPlaying, showProposal, musicError]);

  // Auto-advance slides when playing
  useEffect(() => {
    if (!isPlaying || showProposal) return;

    const timer = setInterval(() => {
      if (currentSlide < confessionSlides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setShowProposal(true);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide, showProposal]);

  const handleNext = useCallback(() => {
    if (currentSlide < confessionSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      setShowProposal(true);
    }
  }, [currentSlide]);

  const handleNoClick = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  };

  const handleYesClick = () => {
    setSheSaidYes(true);
    // Play fireworks sound
    if (fireworksRef.current) {
      fireworksRef.current.play().catch(() => {});
    }
    // Background music continues playing
  };

  // VHS noise overlay component
  const VHSNoise = () => (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.1) 2px,
            rgba(0,0,0,0.1) 4px
          )`,
        }}
      />
      {/* Film grain */}
      <div 
        className="absolute inset-0 opacity-20 animate-pulse"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* VHS tracking lines */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-white/20"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {/* Occasional glitch bars */}
      <motion.div
        className="absolute left-0 right-0 h-8 bg-amber-900/10"
        animate={{ 
          top: ["10%", "80%", "30%"],
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
      />
    </div>
  );

  // Film frame border
  const FilmFrame = () => (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Top and bottom film strips */}
      <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-black flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`top-${i}`} className="flex-1 border-r border-amber-900/30">
            <div className="h-4 md:h-5 bg-amber-900/20 m-1 rounded-sm" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-black flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`bottom-${i}`} className="flex-1 border-r border-amber-900/30">
            <div className="h-4 md:h-5 bg-amber-900/20 m-1 rounded-sm" />
          </div>
        ))}
      </div>
      {/* Side vignette */}
      <div 
        className="absolute inset-y-12 md:inset-y-16 left-0 w-6 md:w-12"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)",
        }}
      />
      <div 
        className="absolute inset-y-12 md:inset-y-16 right-0 w-6 md:w-12"
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,0.4), transparent)",
        }}
      />
    </div>
  );

  // Navigation Bar
  const NavigationBar = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-16 md:top-20 left-0 right-0 z-30 flex justify-center gap-2 md:gap-4 px-4"
    >
      {[
        { id: "crossword", icon: Gamepad2, label: "Crossword" },
        { id: "music", icon: Music, label: "Music" },
        { id: "baby", icon: Cat, label: "Our Baby" },
        { id: "coming-soon", icon: Home, label: "Home" },
      ].map((item) => (
        <motion.button
          key={item.id}
          onClick={() => {
            // Pause music when leaving
            if (bgMusicRef.current) {
              bgMusicRef.current.pause();
            }
            onSectionChange?.(item.id);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-full bg-black/50 text-amber-200/80 hover:bg-black/70 hover:text-amber-100 transition-colors text-xs md:text-sm"
        >
          <item.icon size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">{item.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );

  if (sheSaidYes) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-lavender-100 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-6"
          >
            <Heart size={120} className="text-rose-500 fill-rose-500 mx-auto drop-shadow-2xl" />
          </motion.div>
          <h1 className="font-serif text-5xl md:text-7xl gradient-text mb-4">
            She Said Yes!
          </h1>
          <p className="font-handwritten text-2xl text-rose-700">
            Forever starts now... 💕
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 font-serif text-xl text-rose-600/80 max-w-md mx-auto"
          >
            I promise that you will be my happiest girl
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Heart
                  size={20 + (i % 3) * 10}
                  className="text-rose-300 fill-rose-300"
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Navigation after yes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {[
              { id: "crossword", label: "Crossword", icon: Gamepad2 },
              { id: "music", label: "Our Music", icon: Music },
              { id: "baby", label: "Our Baby", icon: Cat },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  // Keep music playing when navigating
                  onSectionChange?.(item.id);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              >
                <item.icon size={18} />
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Navigation */}
      <NavigationBar />

      {/* Main VHS Content */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-4">
        <div className="relative w-full h-full max-w-7xl">
          {/* Main film screen */}
          <div 
            className="absolute inset-0 rounded-sm overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #d4c4a8 0%, #c9b896 50%, #b8a080 100%)",
            }}
          >
            <VHSNoise />
            <FilmFrame />

            {/* Content area */}
            <div className="absolute inset-12 md:inset-16 flex flex-col items-center justify-center">
              {!showProposal ? (
                <>
                  {/* Slide content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                      transition={{ duration: 0.8 }}
                      className="text-center px-4 md:px-12 max-w-5xl"
                    >
                      <p 
                        className={cn(
                          "font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed md:leading-relaxed",
                          "text-amber-900",
                          confessionSlides[currentSlide].emphasis && "font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
                        )}
                        style={{
                          textShadow: "0 0 10px rgba(120, 53, 15, 0.3)",
                          animation: "blink 2s ease-in-out infinite",
                        }}
                      >
                        &ldquo;{confessionSlides[currentSlide].text}&rdquo;
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress indicator */}
                  <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <div className="flex gap-1 md:gap-1.5">
                      {confessionSlides.map((_, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "rounded-full transition-all",
                            idx === currentSlide 
                              ? "bg-amber-800 w-3 md:w-4 h-2 md:h-2.5" 
                              : idx < currentSlide 
                                ? "bg-amber-600 w-2 md:w-2.5 h-2 md:h-2.5" 
                                : "bg-amber-400/50 w-2 md:w-2.5 h-2 md:h-2.5"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 md:p-3 rounded-full bg-amber-900/20 text-amber-900 hover:bg-amber-900/30"
                    >
                      {isPlaying ? <Pause size={18} className="md:w-5 md:h-5" /> : <Play size={18} className="md:w-5 md:h-5" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      className="p-2 md:p-3 rounded-full bg-amber-900/20 text-amber-900 hover:bg-amber-900/30"
                    >
                      <SkipForward size={18} className="md:w-5 md:h-5" />
                    </motion.button>
                  </div>

                  {/* Slide counter */}
                  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-amber-800/60 font-mono text-xs md:text-sm">
                    {String(currentSlide + 1).padStart(2, "0")} / {String(confessionSlides.length).padStart(2, "0")}
                  </div>
                </>
              ) : (
                /* Proposal Section */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center px-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6 md:mb-8"
                  >
                    <Heart size={56} className="md:w-20 md:h-20 text-rose-700 fill-rose-700 mx-auto" />
                  </motion.div>
                  
                  <h2 
                    className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-amber-900 mb-6 md:mb-10"
                    style={{
                      textShadow: "0 0 15px rgba(120, 53, 15, 0.4)",
                      animation: "blink 2s ease-in-out infinite",
                    }}
                  >
                    Thanusha, will you be my girlfriend?
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleYesClick}
                      className="px-8 md:px-10 py-3 md:py-4 bg-rose-600 text-white font-semibold rounded-full shadow-lg hover:bg-rose-700 transition-colors text-lg"
                    >
                      Yes 💕
                    </motion.button>
                    
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNoClick}
                        className="px-8 md:px-10 py-3 md:py-4 bg-amber-800/20 text-amber-900 font-semibold rounded-full hover:bg-amber-800/30 transition-colors text-lg"
                      >
                        No
                      </motion.button>
                      
                      {/* Error popup */}
                      <AnimatePresence>
                        {showError && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg whitespace-nowrap flex items-center gap-2"
                          >
                            <AlertCircle size={16} />
                            You are doing wrong
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-600" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* VHS timestamp overlay */}
            <div className="absolute top-16 md:top-20 left-4 md:left-6 font-mono text-amber-900/40 text-xs md:text-sm">
              REC ● 00:{String(Math.floor(currentSlide * 4)).padStart(2, "0")}:00
            </div>

            {/* Music indicator */}
            {!musicError && (isPlaying || showProposal) && (
              <div className="absolute top-16 md:top-20 right-4 md:right-6 flex items-center gap-2 text-amber-900/40 text-xs md:text-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={12} className="fill-amber-900/40" />
                </motion.div>
                <span className="hidden sm:inline">♪ Playing</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blink animation */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
