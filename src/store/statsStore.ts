import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameStats, GameMode } from '../types';

interface StatsStore extends GameStats {
  recordGame: (won: boolean, guesses: number, time: number, mode: GameMode) => void;
  resetStats: () => void;
}

const defaultStats: GameStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0,
  averageGuesses: 0,
  fastestWin: null,
  longestGame: null,
  totalWordsSolved: 0,
  accuracy: 0,
  dailyWins: 0,
  practiceWins: 0,
  timedWins: 0,
  unlimitedWins: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
};

export const useStatsStore = create<StatsStore>()(
  persist(
    (set, get) => ({
      ...defaultStats,
      recordGame: (won: boolean, guesses: number, time: number, mode: GameMode) => {
        const state = get();

        const newWins = state.wins + (won ? 1 : 0);
        const newLosses = state.losses + (won ? 0 : 1);
        const newGamesPlayed = state.gamesPlayed + 1;
        const newCurrentStreak = won ? state.currentStreak + 1 : 0;
        const newBestStreak = Math.max(state.bestStreak, newCurrentStreak);
        const newTotalWordsSolved = state.totalWordsSolved + (won ? 1 : 0);

        const newDailyWins = state.dailyWins + (won && mode === 'daily' ? 1 : 0);
        const newPracticeWins = state.practiceWins + (won && mode === 'practice' ? 1 : 0);
        const newTimedWins = state.timedWins + (won && mode === 'timed' ? 1 : 0);
        const newUnlimitedWins = state.unlimitedWins + (won && mode === 'unlimited' ? 1 : 0);

        const newAccuracy = (newWins / newGamesPlayed) * 100;
        const currentTotalGuesses = state.averageGuesses * state.wins;
        const newAverageGuesses = won ? (currentTotalGuesses + guesses) / newWins : state.averageGuesses;

        let newFastestWin = state.fastestWin;
        if (won && (state.fastestWin === null || time < state.fastestWin)) {
          newFastestWin = time;
        }

        let newLongestGame = state.longestGame;
        if (state.longestGame === null || time > state.longestGame) {
          newLongestGame = time;
        }

        const newGuessDistribution = [...state.guessDistribution];
        if (won && guesses >= 1 && guesses <= 6) {
          newGuessDistribution[guesses - 1] += 1;
        }

        set({
          gamesPlayed: newGamesPlayed,
          wins: newWins,
          losses: newLosses,
          currentStreak: newCurrentStreak,
          bestStreak: newBestStreak,
          averageGuesses: newAverageGuesses,
          fastestWin: newFastestWin,
          longestGame: newLongestGame,
          totalWordsSolved: newTotalWordsSolved,
          accuracy: newAccuracy,
          dailyWins: newDailyWins,
          practiceWins: newPracticeWins,
          timedWins: newTimedWins,
          unlimitedWins: newUnlimitedWins,
          guessDistribution: newGuessDistribution,
        });
      },
      resetStats: () => set({ ...defaultStats }),
    }),
    {
      name: 'lexica-stats',
    }
  )
);
