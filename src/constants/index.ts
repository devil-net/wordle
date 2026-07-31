import type { GameConfig, AppSettings, Difficulty } from '../types';

export const MAX_ATTEMPTS = 6;

export const KEYBOARD_LAYOUTS = {
  qwerty: [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ],
  dvorak: [
    ['P', 'Y', 'F', 'G', 'C', 'R', 'L'],
    ['A', 'O', 'E', 'U', 'I', 'D', 'H', 'T', 'N', 'S'],
    ['ENTER', 'Q', 'J', 'K', 'X', 'B', 'M', 'W', 'V', 'Z', 'BACKSPACE'],
  ],
  azerty: [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    ['ENTER', 'W', 'X', 'C', 'V', 'B', 'N', 'BACKSPACE'],
  ],
};

export const DIFFICULTY_CONFIG: Record<Difficulty, { wordLength: number; label: string }> = {
  easy: { wordLength: 4, label: 'Easy (4 letters)' },
  medium: { wordLength: 5, label: 'Medium (5 letters)' },
  hard: { wordLength: 6, label: 'Hard (6 letters)' },
  expert: { wordLength: Math.floor(Math.random() * 3) + 4, label: 'Expert (Random)' },
};

export const ANIMATION_DURATIONS = {
  slow: { flip: 600, pop: 200, shake: 500, bounce: 800 },
  normal: { flip: 400, pop: 120, shake: 300, bounce: 600 },
  fast: { flip: 200, pop: 60, shake: 150, bounce: 300 },
};

export const DEFAULT_CONFIG: GameConfig = {
  mode: 'unlimited',
  difficulty: 'medium',
  wordLength: 5,
  maxAttempts: MAX_ATTEMPTS,
  hintsEnabled: false,
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  animationSpeed: 'normal',
  soundEnabled: true,
  difficulty: 'medium',
  language: 'en',
  keyboardLayout: 'qwerty',
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
  colorblindMode: false,
};

export const GAME_MODES = [
  {
    id: 'daily' as const,
    label: 'Daily Challenge',
    description: 'One word every day — everyone gets the same puzzle.',
    iconName: 'Calendar' as const,
    color: '#d4af37',
  },
  {
    id: 'unlimited' as const,
    label: 'Unlimited',
    description: 'Infinite random puzzles. No waiting for tomorrow.',
    iconName: 'Infinity' as const,
    color: '#00a86b',
  },
  {
    id: 'practice' as const,
    label: 'Practice',
    description: 'Unlimited games with optional hints.',
    iconName: 'Target' as const,
    color: '#00e5ff',
  },
  {
    id: 'timed' as const,
    label: 'Timed Challenge',
    description: 'Race against the clock to solve the puzzle.',
    iconName: 'Clock' as const,
    color: '#ff6b35',
  },
  {
    id: 'custom' as const,
    label: 'Custom Game',
    description: 'Choose word length, difficulty, and time limit.',
    iconName: 'Sliders' as const,
    color: '#7c3aed',
  },
];

export const CONFETTI_COLORS = ['#d4af37', '#00a86b', '#00e5ff', '#7c3aed', '#ff6b35', '#e5a93c'];
