"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate random hearts
    const generatedHearts: HeartParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 15 + Math.random() * 25,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: -50,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, 360],
            x: [0, Math.sin(heart.id) * 50, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            size={heart.size}
            className="text-rose-300"
            style={{ opacity: heart.opacity }}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}
