"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gift, Music, Camera, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const upcomingGames = [
  { icon: Gift, title: "Memory Box", description: "Open virtual gifts that hold our special moments", color: "from-rose-300 to-rose-400", bgColor: "bg-rose-50" },
  { icon: Music, title: "Our Playlist", description: "Guess the songs that soundtrack our love story", color: "from-lavender-300 to-lavender-400", bgColor: "bg-lavender-50" },
  { icon: Camera, title: "Photo Quest", description: "A scavenger hunt through our favorite memories", color: "from-amber-300 to-amber-400", bgColor: "bg-amber-50" },
];

export function ComingSoon() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
        <motion.div className="inline-flex items-center justify-center mb-4 sm:mb-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <div className="relative">
            <Sparkles size={isMobile ? 36 : 48} className="text-lavender-400 absolute -top-3 -left-3 sm:-top-4 sm:-left-4" />
            <div className={cn("rounded-full bg-gradient-to-br from-rose-100 to-lavender-100 flex items-center justify-center shadow-lg shadow-rose-200/50", isMobile ? "w-16 h-16" : "w-20 sm:w-24 h-20 sm:h-24")}>
              <Lock size={isMobile ? 32 : 40} className="text-rose-400" />
            </div>
            <Sparkles size={isMobile ? 28 : 36} className="text-rose-400 absolute -bottom-2 -right-2 sm:-bottom-2 sm:-right-2" />
          </div>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold gradient-text mb-3 sm:mb-4">
          More Surprises Await
        </h2>
        <p className="text-rose-950/70 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed px-2">
          Just like our love story, this gift keeps growing. More little pieces of us are coming soon. 💕
        </p>
      </motion.div>

      {/* Upcoming Games Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
        {upcomingGames.map((game, index) => {
          const Icon = game.icon;
          return (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -8, rotateY: 5 }}
              className={cn("relative group cursor-pointer perspective-1000", "rounded-xl sm:rounded-2xl p-5 sm:p-6", "bg-white/80 backdrop-blur-sm", "border border-white/60", "shadow-lg shadow-rose-100/50", "transition-all duration-300")}
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="bg-white/90 rounded-full p-2 sm:p-3 shadow-lg">
                  <Lock size={isMobile ? 20 : 24} className="text-rose-400" />
                </motion.div>
              </div>

              <div className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-gradient-to-br shadow-md", game.color)}>
                <Icon size={isMobile ? 24 : 28} className="text-white" />
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-semibold text-rose-800 mb-1.5 sm:mb-2">
                {game.title}
              </h3>
              <p className="text-rose-950/60 text-xs sm:text-sm leading-relaxed">
                {game.description}
              </p>

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20">
                <Heart size={isMobile ? 16 : 20} className="text-rose-300" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Love Note */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="relative max-w-2xl mx-auto">
        <div className={cn("relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl", "bg-gradient-to-br from-rose-50 via-white to-lavender-50", "border border-white/80", "shadow-xl shadow-rose-200/30")}>
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-rose-200 rounded-tl-lg" />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-rose-200 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-rose-200 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-rose-200 rounded-br-lg" />

          <motion.div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Heart size={isMobile ? 20 : 24} className="text-rose-400 fill-rose-400" />
          </motion.div>

          <blockquote className="text-center">
            <p className="font-handwritten text-lg sm:text-2xl md:text-3xl text-rose-800 leading-relaxed mb-3 sm:mb-4">
              &ldquo;Every love story is beautiful, but ours is my favorite.&rdquo;
            </p>
            <footer className="text-rose-950/60 text-xs sm:text-sm font-sans">
              — And this is just the beginning of our digital love letter
            </footer>
          </blockquote>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4 sm:mt-6 text-center">
            <p className="font-handwritten text-base sm:text-xl text-rose-500">
              With all my love 💕
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {[...Array(7)].map((_, i) => (
          <motion.div key={i} initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}>
            <Heart size={isMobile ? 12 : 16 + (i % 3) * 4} className={cn("opacity-40", i % 2 === 0 ? "text-rose-300" : "text-lavender-300")} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
