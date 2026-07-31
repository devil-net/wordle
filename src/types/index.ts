// ========================
// Core Game Types
// ========================

export type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export interface TileData {
  letter: string;
  state: LetterState;
}

export type BoardRow = TileData[];

export type GameBoard = BoardRow[];

export type GameStatus = 'playing' | 'won' | 'lost';

export type GameMode = 'daily' | 'unlimited' | 'practice' | 'timed' | 'custom';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface GameConfig {
  mode: GameMode;
  difficulty: Difficulty;
  wordLength: number;
  maxAttempts: number;
  timeLimit?: number; // seconds, for timed mode
  hintsEnabled: boolean;
}

export interface GameState {
  board: GameBoard;
  currentRow: number;
  currentCol: number;
  targetWord: string;
  gameStatus: GameStatus;
  config: GameConfig;
  usedHints: number;
  startTime: number;
  endTime?: number;
}

// ========================
// Keyboard Types
// ========================

export type KeyState = LetterState | 'unused';

export interface KeyboardState {
  [key: string]: KeyState;
}

// ========================
// Statistics Types
// ========================

export interface GameStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  averageGuesses: number;
  fastestWin: number | null; // seconds
  longestGame: number | null; // seconds
  totalWordsSolved: number;
  accuracy: number; // percentage
  dailyWins: number;
  practiceWins: number;
  timedWins: number;
  unlimitedWins: number;
  guessDistribution: number[]; // index 0 = 1 guess, index 5 = 6 guesses
}

// ========================
// Achievement Types
// ========================

export type AchievementId =
  | 'first_win'
  | 'ten_wins'
  | 'fifty_wins'
  | 'hundred_wins'
  | 'seven_day_streak'
  | 'perfect_game'
  | 'speed_runner'
  | 'word_master'
  | 'legend'
  | 'night_owl'
  | 'early_bird'
  | 'marathon'
  | 'timed_champion';

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  isUnlocked: boolean;
}

// ========================
// Theme Types
// ========================

export type ThemeId =
  | 'dark'
  | 'light'
  | 'midnight'
  | 'forest'
  | 'ocean'
  | 'sunset'
  | 'neon'
  | 'cyberpunk'
  | 'minimal'
  | 'pastel';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  correct: string;
  present: string;
  absent: string;
  tileBorder: string;
  tileEmpty: string;
  keyBg: string;
  keyText: string;
  keySpecial: string;
  keySpecialText?: string;
  cardBg: string;
  cardBorder: string;
  navBg: string;
  modalOverlay: string;
  shadow: string;
  gradient1: string;
  gradient2: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  colors: ThemeColors;
}

// ========================
// Settings Types
// ========================

export interface AppSettings {
  theme: ThemeId;
  animationSpeed: 'slow' | 'normal' | 'fast';
  soundEnabled: boolean;
  difficulty: Difficulty;
  language: string;
  keyboardLayout: 'qwerty' | 'dvorak' | 'azerty';
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorblindMode: boolean;
}

// ========================
// Hint Types
// ========================

export type HintType = 'reveal_letter' | 'eliminate_wrong' | 'show_vowels' | 'position_hint';

export interface HintResult {
  type: HintType;
  data: string | string[] | number;
}

// ========================
// Daily Reward Types
// ========================

export interface DailyReward {
  day: number;
  type: 'theme' | 'confetti_style' | 'tile_animation' | 'badge' | 'keyboard_skin';
  id: string;
  name: string;
  description: string;
}

export interface DailyRewardState {
  currentStreak: number;
  lastClaimDate: string;
  claimedRewards: string[];
}

// ========================
// Navigation Types
// ========================

export type PageId = 'home' | 'play' | 'statistics' | 'achievements' | 'settings' | 'about' | 'how-to-play';
