"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Fish, MousePointer2, Home, Gamepad2, Music, Film } from "lucide-react";
import { cn } from "@/lib/utils";

// Voxel colors
const COLORS = {
  orange: "#F4A460",
  orangeDark: "#D2691E",
  white: "#FFFAF0",
  pink: "#FFB6C1",
  black: "#2C2C2C",
  eye: "#4A90E2",
  nose: "#FF69B4",
};

interface Voxel {
  x: number;
  y: number;
  z: number;
  color: string;
}

interface OurBabyProps {
  onSectionChange?: (section: string) => void;
}

export function OurBaby({ onSectionChange }: OurBabyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPetting, setIsPetting] = useState(false);
  const [happiness, setHappiness] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [catState, setCatState] = useState<"idle" | "happy" | "sleepy">("idle");
  const [message, setMessage] = useState("Pet me! 🐱");
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const catRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const voxelsRef = useRef<Voxel[]>([]);
  const rotationRef = useRef(0);
  const bounceRef = useRef(0);

  // Build voxel cat data
  const buildCat = useCallback(() => {
    const voxels: Voxel[] = [];
    
    // Helper to add voxel
    const add = (x: number, y: number, z: number, color: string) => {
      voxels.push({ x, y, z, color });
    };

    // Body (orange with white belly)
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 1; y++) {
        for (let z = -1; z <= 2; z++) {
          const isBelly = y === -2 && Math.abs(x) <= 1 && z >= 0;
          add(x, y, z, isBelly ? COLORS.white : COLORS.orange);
        }
      }
    }

    // Head
    for (let x = -2; x <= 2; x++) {
      for (let y = 2; y <= 4; y++) {
        for (let z = -1; z <= 2; z++) {
          add(x, y, z, COLORS.orange);
        }
      }
    }

    // Ears
    const ears = [
      { x: -2, y: 5 },
      { x: 2, y: 5 },
    ];
    ears.forEach((ear) => {
      add(ear.x, ear.y, 0, COLORS.orange);
      add(ear.x, ear.y, 1, COLORS.orange);
      add(ear.x, ear.y + 1, 0, COLORS.orangeDark);
      add(ear.x, ear.y + 1, 1, COLORS.pink);
    });

    // Eyes
    add(-1, 3, 2, COLORS.white);
    add(1, 3, 2, COLORS.white);
    add(-1, 3, 3, COLORS.eye);
    add(1, 3, 3, COLORS.eye);
    add(-1, 3, 3.1, COLORS.black); // pupil
    add(1, 3, 3.1, COLORS.black);

    // Nose
    add(0, 2, 3, COLORS.nose);

    // Whiskers
    add(-2, 2, 2, COLORS.black);
    add(-3, 2, 2, COLORS.black);
    add(2, 2, 2, COLORS.black);
    add(3, 2, 2, COLORS.black);

    // Legs
    const legs = [
      { x: -2, z: 2 },
      { x: 2, z: 2 },
      { x: -2, z: -1 },
      { x: 2, z: -1 },
    ];
    legs.forEach((leg) => {
      add(leg.x, -3, leg.z, COLORS.orange);
      add(leg.x, -4, leg.z, COLORS.white); // paws
    });

    // Tail
    for (let i = 0; i < 5; i++) {
      add(0, -1 + i * 0.5, -2 - i, COLORS.orange);
    }
    add(0, 1, -6, COLORS.white); // tail tip

    return voxels;
  }, []);

  // Initialize voxels
  useEffect(() => {
    voxelsRef.current = buildCat();
  }, [buildCat]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Clear canvas
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update cat position (follow mouse slowly)
      const cat = catRef.current;
      cat.x += (cat.targetX - cat.x) * 0.05;
      cat.y += (cat.targetY - cat.y) * 0.05;

      // Update rotation based on movement
      rotationRef.current = cat.x * 0.001;

      // Bounce animation when happy
      if (catState === "happy") {
        bounceRef.current = Math.sin(Date.now() * 0.01) * 5;
      } else {
        bounceRef.current = Math.sin(Date.now() * 0.002) * 2;
      }

      // Center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Sort voxels by Z for proper depth
      const sortedVoxels = [...voxelsRef.current].sort((a, b) => {
        const rot = rotationRef.current;
        const za = a.z * Math.cos(rot) - a.x * Math.sin(rot);
        const zb = b.z * Math.cos(rot) - b.x * Math.sin(rot);
        return za - zb;
      });

      // Draw voxels
      const voxelSize = 20;
      const spacing = 22;

      sortedVoxels.forEach((voxel) => {
        const rot = rotationRef.current;
        const rx = voxel.x * Math.cos(rot) - voxel.z * Math.sin(rot);
        const rz = voxel.x * Math.sin(rot) + voxel.z * Math.cos(rot);

        const x = centerX + rx * spacing + cat.x;
        const y = centerY - voxel.y * spacing + cat.y + bounceRef.current;
        const scale = 1 + rz * 0.02;

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(
          x - (voxelSize * scale) / 2 + 3,
          y - (voxelSize * scale) / 2 + 3,
          voxelSize * scale,
          voxelSize * scale
        );

        // Voxel
        ctx.fillStyle = voxel.color;
        ctx.fillRect(
          x - (voxelSize * scale) / 2,
          y - (voxelSize * scale) / 2,
          voxelSize * scale,
          voxelSize * scale
        );

        // Highlight
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fillRect(
          x - (voxelSize * scale) / 2,
          y - (voxelSize * scale) / 2,
          voxelSize * scale * 0.5,
          voxelSize * scale * 0.5
        );
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [catState]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;

    mouseRef.current = { x, y };
    catRef.current.targetX = x * 0.3;
    catRef.current.targetY = y * 0.3;

    // Check if petting (mouse near cat)
    const dist = Math.sqrt(x * x + y * y);
    if (dist < 100 && !isPetting) {
      setIsPetting(true);
      setHappiness((prev) => Math.min(prev + 10, 100));
      setShowHeart(true);
      setCatState("happy");
      setMessage("Purr... ❤️");
      
      setTimeout(() => {
        setShowHeart(false);
        setCatState("idle");
        setMessage("Pet me! 🐱");
      }, 1000);
    } else if (dist >= 100) {
      setIsPetting(false);
    }
  }, [isPetting]);

  // Handle click (feed fish)
  const handleClick = useCallback(() => {
    setHappiness((prev) => Math.min(prev + 20, 100));
    setCatState("happy");
    setMessage("Yum! 🐟");
    
    setTimeout(() => {
      setCatState("idle");
      setMessage("Pet me! 🐱");
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900 text-white">
      {/* Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-lg">Our Baby</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: "crossword", icon: Gamepad2, label: "Crossword" },
              { id: "confession", icon: Film, label: "Confession" },
              { id: "music", icon: Music, label: "Music" },
              { id: "coming-soon", icon: Home, label: "Home" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange?.(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
              >
                <item.icon size={14} />
                <span className="hidden sm:inline">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-yellow-400" size={24} />
            <Heart className="text-pink-400 fill-pink-400" size={32} />
            <Sparkles className="text-yellow-400" size={24} />
          </motion.div>
          
          <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-pink-300 mb-2">
            Our Baby
          </h1>
          <p className="text-purple-200 text-lg">
            Meet our virtual fur baby 💕
          </p>
        </motion.div>

        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Canvas Container */}
          <div 
            className={cn(
              "relative rounded-3xl overflow-hidden cursor-pointer",
              "bg-gradient-to-b from-indigo-900/50 to-purple-900/50",
              "border-4 border-pink-400/30",
              "shadow-2xl shadow-pink-500/20"
            )}
            onClick={handleClick}
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full max-w-2xl mx-auto block"
              onMouseMove={handleMouseMove}
            />

            {/* Floating Hearts */}
            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -50 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <Heart size={48} className="text-pink-400 fill-pink-400" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message Bubble */}
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 text-purple-900 px-4 py-2 rounded-full font-medium text-sm"
            >
              {message}
            </motion.div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-purple-200"
          >
            <div className="flex items-center gap-2">
              <MousePointer2 size={20} />
              <span className="text-sm">Move mouse to look</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-pink-400" />
              <span className="text-sm">Hover to pet</span>
            </div>
            <div className="flex items-center gap-2">
              <Fish size={20} className="text-orange-400" />
              <span className="text-sm">Click to feed</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Happiness Meter */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-pink-300 font-medium">Happiness</span>
              <span className="text-2xl font-bold">{happiness}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: `${happiness}%` }}
                transition={{ type: "spring", damping: 20 }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <span className="text-pink-300 font-medium block mb-2">Status</span>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: catState === "happy" ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: catState === "happy" ? Infinity : 0 }}
                className={cn(
                  "w-4 h-4 rounded-full",
                  catState === "happy" ? "bg-green-400" : 
                  catState === "sleepy" ? "bg-blue-400" : "bg-yellow-400"
                )}
              />
              <span className="text-xl capitalize">
                {catState === "idle" ? "Waiting for pets" : catState}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Love Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="font-handwritten text-2xl text-pink-300">
            &ldquo;Just like this little kitty, our love is playful and sweet&rdquo; 💕
          </p>
        </motion.div>
      </div>
    </div>
  );
}
