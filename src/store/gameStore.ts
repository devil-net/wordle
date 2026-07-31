import { create } from 'zustand';
import type { GameState, GameConfig, KeyboardState, GameBoard, LetterState, BoardRow, GameStatus } from '../types';
import { getRandomWord, isValidWord, getDailyWord } from '../data/words';
import { DEFAULT_CONFIG } from '../constants';
import { showToast } from '../components/ui/Toast';

interface GameStore extends GameState {
  keyboardState: KeyboardState;
  initGame: (config?: GameConfig) => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
}

const getEmptyBoard = (maxAttempts: number, wordLength: number): GameBoard => {
  return Array.from({ length: maxAttempts }, () =>
    Array.from({ length: wordLength }, () => ({ letter: '', state: 'empty' }))
  );
};

export const useGameStore = create<GameStore>((set, get) => ({
  board: getEmptyBoard(DEFAULT_CONFIG.maxAttempts, DEFAULT_CONFIG.wordLength),
  currentRow: 0,
  currentCol: 0,
  targetWord: getRandomWord(5).toUpperCase(),
  gameStatus: 'playing',
  config: DEFAULT_CONFIG,
  usedHints: 0,
  startTime: Date.now(),
  keyboardState: {},

  initGame: (config) => {
    const activeConfig = config || DEFAULT_CONFIG;
    const word = activeConfig.mode === 'daily' ? getDailyWord() : getRandomWord(activeConfig.wordLength);

    set({
      config: activeConfig,
      targetWord: word.toUpperCase(),
      board: getEmptyBoard(activeConfig.maxAttempts, activeConfig.wordLength),
      currentRow: 0,
      currentCol: 0,
      gameStatus: 'playing',
      usedHints: 0,
      startTime: Date.now(),
      keyboardState: {},
      endTime: undefined,
    });
  },

  addLetter: (letter: string) => {
    const { board, currentRow, currentCol, config, gameStatus } = get();

    if (gameStatus !== 'playing' || currentCol >= config.wordLength) return;

    const newBoard = board.map((row, rIdx) => {
      if (rIdx !== currentRow) return row;
      return row.map((tile, cIdx) => {
        if (cIdx === currentCol) return { letter: letter.toUpperCase(), state: 'tbd' as LetterState };
        return tile;
      });
    });

    set({ board: newBoard, currentCol: currentCol + 1 });
  },

  removeLetter: () => {
    const { board, currentRow, currentCol, gameStatus } = get();

    if (gameStatus !== 'playing' || currentCol <= 0) return;

    const newBoard = board.map((row, rIdx) => {
      if (rIdx !== currentRow) return row;
      return row.map((tile, cIdx) => {
        if (cIdx === currentCol - 1) return { letter: '', state: 'empty' as LetterState };
        return tile;
      });
    });

    set({ board: newBoard, currentCol: currentCol - 1 });
  },

  submitGuess: () => {
    const { board, currentRow, currentCol, config, targetWord, gameStatus, keyboardState } = get();

    if (gameStatus !== 'playing') return;

    if (currentCol < config.wordLength) {
      showToast('Not enough letters', 'warning');
      return;
    }

    const row = board[currentRow];
    const guess = row.map((t) => t.letter).join('');

    if (!isValidWord(guess, config.wordLength)) {
      showToast('Not in word list', 'error');
      return;
    }

    // Create fresh immutable copies of tile objects
    const newRow: BoardRow = row.map((tile) => ({ ...tile }));
    const targetLetters = targetWord.split('');
    const newKeyboardState = { ...keyboardState };

    // First pass: Find correct letters (green)
    newRow.forEach((tile, i) => {
      if (tile.letter === targetLetters[i]) {
        tile.state = 'correct';
        targetLetters[i] = '' as any;
        newKeyboardState[tile.letter] = 'correct';
      }
    });

    // Second pass: Find present letters (yellow) and absent letters (gray)
    newRow.forEach((tile) => {
      if (tile.state !== 'correct') {
        const targetIndex = targetLetters.indexOf(tile.letter);
        if (targetIndex !== -1 && targetLetters[targetIndex] !== '') {
          tile.state = 'present';
          targetLetters[targetIndex] = '' as any;
          if (newKeyboardState[tile.letter] !== 'correct') {
            newKeyboardState[tile.letter] = 'present';
          }
        } else {
          tile.state = 'absent';
          if (newKeyboardState[tile.letter] !== 'correct' && newKeyboardState[tile.letter] !== 'present') {
            newKeyboardState[tile.letter] = 'absent';
          }
        }
      }
    });

    const newBoard = board.map((r, idx) => (idx === currentRow ? newRow : r));

    let newStatus: GameStatus = gameStatus;
    let endTime: number | undefined;

    if (guess === targetWord) {
      newStatus = 'won';
      endTime = Date.now();
    } else if (currentRow + 1 >= config.maxAttempts) {
      newStatus = 'lost';
      endTime = Date.now();
    }

    set({
      board: newBoard,
      currentRow: currentRow + 1,
      currentCol: 0,
      keyboardState: newKeyboardState,
      gameStatus: newStatus,
      ...(endTime && { endTime }),
    });
  },

  resetGame: () => {
    const { config } = get();
    get().initGame(config);
  },
}));
