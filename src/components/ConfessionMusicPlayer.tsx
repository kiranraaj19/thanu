"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfessionMusicPlayerProps {
  autoPlay?: boolean;
}

export function ConfessionMusicPlayer({ autoPlay = false }: ConfessionMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Try to find the song file
  const songPath = "/music/our-song.mp3";

  useEffect(() => {
    const audio = new Audio(songPath);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      setHasError(false);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    audio.addEventListener("error", () => {
      setHasError(true);
    });

    // Auto-play when component mounts if requested
    if (autoPlay) {
      audio.play().catch(() => {
        // Auto-play blocked by browser, user needs to interact
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("ended", () => {});
      audio.removeEventListener("error", () => {});
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // If no song file exists, don't show the player
  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80",
          "bg-black/60 backdrop-blur-md rounded-2xl p-4",
          "border border-white/10",
          "flex items-center gap-3"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center">
          <Music size={20} className="text-amber-400/50" />
        </div>
        <div>
          <p className="text-amber-200/50 text-sm font-medium">No song added</p>
          <p className="text-amber-200/30 text-xs">Add our-song.mp3 to /music folder</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50",
        "bg-black/70 backdrop-blur-md rounded-2xl p-4",
        "border border-amber-500/30",
        "shadow-lg shadow-black/50"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center"
          >
            <Music size={16} className="text-white" />
          </motion.div>
          <div>
            <p className="text-amber-100 text-sm font-medium">Our Song</p>
            <p className="text-amber-200/50 text-xs">
              {isPlaying ? "Playing" : "Paused"}
            </p>
          </div>
        </div>

        {/* Volume Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="p-2 rounded-full bg-white/10 text-amber-200 hover:bg-white/20 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
        />
        <div className="flex justify-between text-xs text-amber-200/50 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={togglePlay}
        className={cn(
          "w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors",
          isPlaying
            ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
            : "bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-90"
        )}
      >
        {isPlaying ? (
          <>
            <Pause size={18} fill="currentColor" />
            Pause
          </>
        ) : (
          <>
            <Play size={18} fill="currentColor" />
            Play Our Song
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
