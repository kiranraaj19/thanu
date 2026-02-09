# 💕 Our Love Story - Valentine's Gift Website

A beautiful, romantic mini-games website built with Next.js, TypeScript, and Tailwind CSS. Each game celebrates special moments and memories in your relationship.

## ✨ Features

### 🧩 Crossword Puzzle
- Relationship-specific words with emotional meanings
- Interactive grid with smooth animations
- Romantic modals that appear when words are completed
- Progress tracking with beautiful visual feedback
- Touch-friendly and responsive design

### 🎨 Design
- Soft pastel color palette (rose, blush, cream, lavender)
- 3D card effects with perspective transforms
- Floating hearts background animation
- Glassmorphism UI elements
- Smooth micro-interactions throughout

### 🔮 Coming Soon
- Memory Box - Virtual gifts with special moments
- Our Playlist - Guess the songs from your love story
- Photo Quest - Scavenger hunt through favorite memories

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
valentine-gift/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & custom animations
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── CrosswordGame.tsx    # Crossword puzzle game
│   │   ├── ComingSoon.tsx       # Coming soon section
│   │   ├── Header.tsx           # Navigation header
│   │   ├── RomanticModal.tsx    # Word completion modal
│   │   └── FloatingHearts.tsx   # Background animation
│   ├── data/
│   │   └── crosswordWords.ts    # Crossword data (EASY TO EDIT)
│   ├── lib/
│   │   ├── utils.ts             # Utility functions
│   │   └── crosswordGenerator.ts # Crossword logic
│   └── types/
│       └── index.ts             # TypeScript types
├── tailwind.config.ts       # Tailwind with custom colors
└── next.config.mjs          # Next.js config
```

## 💌 Customizing the Crossword

The crossword words and meanings are stored in `src/data/crosswordWords.ts`. You can easily add, edit, or remove words without touching any UI code:

```typescript
export const crosswordWords: CrosswordWord[] = [
  {
    id: "unique-id",
    word: "YOURWORD",
    meaning: "The beautiful memory or meaning behind this word...",
    row: 0,        // Starting row (0-indexed)
    col: 0,        // Starting column (0-indexed)
    direction: "across" | "down",
    clue: "Hint for the player",
  },
  // Add more words...
];
```

### Tips for Creating Crosswords:
1. Words must intersect at matching letters
2. Keep the grid size in mind (default is 12x12)
3. Make sure words don't overlap incorrectly
4. Each word needs a unique ID

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the project
cd valentine-gift

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Building for Production

```bash
# Create optimized build
npm run build

# The static files will be in the `dist` folder
```

## 🎨 Customization Guide

### Colors
Edit `tailwind.config.ts` to change the color palette:
- `rose` - Primary romantic color
- `blush` - Soft pink tones
- `lavender` - Purple accents
- `cream` - Background tones

### Fonts
The site uses Google Fonts (loaded in globals.css):
- **Playfair Display** - Elegant serif for headings
- **Inter** - Clean sans-serif for UI
- **Dancing Script** - Handwritten for romantic touches

### Animations
All animations are defined in `globals.css` and use Framer Motion for component animations.

## 💝 Making It Yours

1. **Edit the crossword words** in `src/data/crosswordWords.ts`
2. **Change the color scheme** in `tailwind.config.ts`
3. **Add more games** by creating new components and adding them to the navigation
4. **Customize the copy** throughout the components to match your relationship

## 📱 Responsive Design

The website is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 License

This is a personal gift - feel free to use and modify for your loved ones! 💕

---

Made with endless love and a lot of code.
