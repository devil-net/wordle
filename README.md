# Lexica — Royal Word Puzzle Game

Lexica is a modern, high-performance browser-based word puzzle game built with React 19, TypeScript, Framer Motion, and Tailwind CSS. It features a luxury visual aesthetic, 60 FPS 3D tile animations, 10 contrast-tuned color themes, and local analytics tracking.

Created to provide an unrestricted word puzzle experience — completely free, ad-free, with no daily wait times or paywalls.

---

## Features

- **Game Modes**:
  - **Daily Challenge**: Date-seeded puzzle shared deterministically across all players globally.
  - **Unlimited Mode**: Infinite random word puzzles with instant replay.
  - **Practice Mode**: Casual practice games with hint capabilities.
  - **Timed Challenge**: Real-time countdown timer with visual alert thresholds.
  - **Custom Game**: Configurable word length (4 to 6 letters) and custom timer durations.

- **Strict Dictionary Validation**:
  - Validates input against an extensive English word list.
  - Rejects non-words or invalid character sequences with immediate feedback notifications.

- **Visual Design & Themes**:
  - Metallic gold accents, royal navy backgrounds, emerald success states, and amber present states.
  - 10 contrast-compliant color themes: *Royal Dark, Royal Light, Midnight Gold, Emerald Forest, Sapphire Ocean, Imperial Sunset, Neon Cyber, Cyber Gold, Pure Ivory, Soft Rose*.

- **Achievements System**:
  - 13 unlockable achievement badges tracking game milestones, speed records, and winning streaks.

- **Player Analytics**:
  - LocalStorage-persisted analytics including guess distribution charts, win accuracy percentages, streak counters, average guesses, and fastest completion times.

- **Keyboard & Accessibility**:
  - Physical hardware keyboard support plus responsive touch keyboard supporting QWERTY, Dvorak, and AZERTY layouts.
  - High contrast options, reduced motion preferences, and font scaling settings.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Typography & Styling**: CSS Variables, Tailwind CSS, Google Fonts (*Outfit* and *Space Grotesk*)

---

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/devil-net/wordle.git
   cd wordle
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## Author

Created by **[devil-net](https://github.com/devil-net)**.
