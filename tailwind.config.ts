import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Romantic pastel palette
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
        },
        blush: {
          50: "#fdf2f4",
          100: "#fce7eb",
          200: "#f8d0d9",
          300: "#f2a8ba",
          400: "#e97595",
          500: "#d64f77",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf9f3",
          200: "#faf3e7",
          300: "#f5e9d6",
        },
        lavender: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
        },
        warm: {
          beige: "#f5f0e8",
          sand: "#e8dfd1",
          tan: "#d4c4a8",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        handwritten: ["Dancing Script", "cursive"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "heart-beat": "heart-beat 1.5s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.05)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(251, 113, 133, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(251, 113, 133, 0.6)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "romantic-gradient": "linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #faf5ff 100%)",
        "warm-gradient": "linear-gradient(135deg, #fefdfb 0%, #fdf2f4 50%, #f5f0e8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
