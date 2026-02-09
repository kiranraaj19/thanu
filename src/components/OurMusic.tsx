"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Music, 
  Volume2,
  Shuffle,
  Repeat,
  Share2,
  Clock,
  Disc,
  ExternalLink,
  Home,
  Gamepad2,
  Cat,
  Film
} from "lucide-react";
import { getTodaysSongs, getFormattedDate } from "@/data/playlistSongs";
import { cn } from "@/lib/utils";

interface OurMusicProps {
  onSectionChange?: (section: string) => void;
}

export function OurMusic({ onSectionChange }: OurMusicProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const todaysSongs = useMemo(() => getTodaysSongs(), []);
  const currentSong = todaysSongs[currentSongIndex];
  const todayDate = useMemo(() => getFormattedDate(), []);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSongIndex((curr) => (curr + 1) % todaysSongs.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, todaysSongs.length]);

  const openInSpotify = () => {
    window.open(currentSong.spotifyUrl, "_blank");
  };
  
  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % todaysSongs.length);
    setProgress(0);
    setIsPlaying(false);
  };
  
  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + todaysSongs.length) % todaysSongs.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-950 via-rose-900 to-black text-white">
      {/* Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc size={isMobile ? 20 : 24} className="text-rose-400" />
            <span className="font-bold text-base sm:text-lg">Our Music</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "crossword", icon: Gamepad2, label: "Crossword" },
              { id: "confession", icon: Film, label: "Confession" },
              { id: "baby", icon: Cat, label: "Baby" },
              { id: "coming-soon", icon: Home, label: "Home" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange?.(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xs sm:text-sm whitespace-nowrap"
              >
                <item.icon size={isMobile ? 12 : 14} />
                <span className="hidden sm:inline">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 sm:mb-8"
        >
          <div>
            <p className="text-rose-300/80 text-xs sm:text-sm">{todayDate}</p>
            <p className="text-rose-400/60 text-xs">{todaysSongs.length} songs</p>
          </div>
        </motion.div>

        {/* Main Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "relative rounded-2xl sm:rounded-3xl overflow-hidden",
            "bg-gradient-to-br from-rose-800/50 to-purple-900/50",
            "backdrop-blur-xl border border-white/10",
            "p-4 sm:p-6 md:p-10 mb-4 sm:mb-8"
          )}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className={cn("absolute -inset-20 opacity-30 blur-3xl bg-gradient-to-r", currentSong.coverColor)}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-8">
            {/* Album Art */}
            <motion.div
              className={cn(
                "w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-xl sm:rounded-2xl shadow-2xl cursor-pointer group",
                "bg-gradient-to-br", currentSong.coverColor,
                "flex items-center justify-center relative overflow-hidden flex-shrink-0"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openInSpotify}
            >
              <motion.div animate={isPlaying ? { rotate: 360 } : {}} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                <Music size={isMobile ? 48 : 80} className="text-white/80" />
              </motion.div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <ExternalLink size={isMobile ? 24 : 32} className="text-white mx-auto mb-1 sm:mb-2" />
                  <p className="text-white text-xs sm:text-sm font-medium">Open in Spotify</p>
                </div>
              </div>
            </motion.div>

            {/* Song Info & Controls */}
            <div className="flex-1 text-center md:text-left w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSong.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                    {currentSong.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-rose-200 mb-0.5 sm:mb-1">{currentSong.artist}</p>
                  <p className="text-xs sm:text-sm text-rose-300/60 mb-4 sm:mb-6">{currentSong.album}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="mb-4 sm:mb-6">
                <div className="h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs text-rose-300/60 mt-1 sm:mt-2">
                  <span>{formatTime(progress)}</span>
                  <span>{currentSong.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipBack size={isMobile ? 20 : 24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={openInSpotify}
                  className={cn(
                    "px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center gap-1.5 sm:gap-2",
                    "bg-green-500 text-black",
                    "hover:bg-green-400 transition-colors shadow-lg shadow-green-500/30 text-sm sm:text-base"
                  )}
                >
                  <Play size={isMobile ? 20 : 24} fill="currentColor" className="ml-0.5" />
                  <span className="font-semibold pr-0.5">Play</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipForward size={isMobile ? 20 : 24} />
                </motion.button>
              </div>

              <motion.button
                onClick={openInSpotify}
                className="mt-3 sm:mt-4 text-green-400 hover:text-green-300 text-xs sm:text-sm flex items-center gap-1.5 justify-center md:justify-start transition-colors"
                whileHover={{ x: 3 }}
              >
                <ExternalLink size={isMobile ? 12 : 14} />
                Listen on Spotify
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Today's Playlist */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-xl font-semibold flex items-center gap-1.5 sm:gap-2">
              <Clock size={isMobile ? 16 : 20} className="text-rose-400" />
              Today&apos;s Songs
            </h3>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            {todaysSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={cn(
                  "flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer",
                  "transition-all duration-300",
                  "hover:bg-white/10",
                  currentSongIndex === index && "bg-white/20"
                )}
              >
                <div
                  className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center relative group overflow-hidden flex-shrink-0 bg-gradient-to-br", song.coverColor)}
                  onClick={() => window.open(song.spotifyUrl, "_blank")}
                >
                  <Music size={isMobile ? 16 : 20} className="text-white/80" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink size={isMobile ? 14 : 16} className="text-white" />
                  </div>
                </div>

                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setProgress(0);
                    window.open(song.spotifyUrl, "_blank");
                  }}
                >
                  <p className={cn("font-medium truncate text-sm sm:text-base", currentSongIndex === index ? "text-rose-300" : "text-white")}>
                    {song.title}
                  </p>
                  <p className="text-xs sm:text-sm text-rose-300/60 truncate">{song.artist}</p>
                </div>

                {currentSongIndex === index && isPlaying && (
                  <div className="flex items-end gap-0.5 h-3 sm:h-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 sm:w-1 bg-green-400 rounded-full"
                        animate={{ height: [4, isMobile ? 12 : 16, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
                  className="p-1.5 sm:p-2"
                >
                  <Heart size={isMobile ? 16 : 20} className={cn("transition-colors", likedSongs.has(song.id) ? "text-rose-500 fill-rose-500" : "text-rose-300/60 hover:text-rose-400")} />
                </motion.button>

                <span className="text-xs sm:text-sm text-rose-300/60">{song.duration}</span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(song.spotifyUrl, "_blank")}
                  className="p-1.5 sm:p-2 text-green-400 hover:text-green-300"
                >
                  <ExternalLink size={isMobile ? 16 : 18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Extra Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6 text-rose-300/60">
          {[Shuffle, Repeat, Volume2, Share2].map((Icon, i) => (
            <motion.button key={i} whileHover={{ scale: 1.1 }} className="p-2 hover:text-white transition-colors" onClick={i === 3 ? () => window.open("https://open.spotify.com/playlist/5C7Qf3WGfgRnRE988Gbkam", "_blank") : undefined}>
              <Icon size={isMobile ? 18 : 20} />
            </motion.button>
          ))}
        </motion.div>

        {/* Romantic Note */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 sm:mt-12 text-center">
          <p className="text-rose-300/80 font-handwritten text-lg sm:text-xl">
            &ldquo;Every song is a reminder of how much I love you&rdquo; 💕
          </p>
        </motion.div>

        {/* Open Full Playlist Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 sm:mt-8 text-center">
          <motion.button
            onClick={() => window.open("https://open.spotify.com/playlist/5C7Qf3WGfgRnRE988Gbkam", "_blank")}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors flex items-center gap-1.5 sm:gap-2 mx-auto text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Music size={isMobile ? 18 : 20} />
            Open Full Playlist
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function formatTime(progress: number): string {
  const totalSeconds = Math.floor((progress / 100) * 240);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
