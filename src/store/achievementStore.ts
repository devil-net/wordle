import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Achievement, AchievementId, GameStats } from '../types';
import { ACHIEVEMENT_DEFINITIONS } from '../data/achievements';

interface AchievementStore {
  achievements: Achievement[];
  checkAchievements: (stats: GameStats) => void;
  unlockAchievement: (id: AchievementId) => void;
}

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENT_DEFINITIONS.map((def) => ({
        ...def,
        isUnlocked: false,
      })),

      checkAchievements: (stats: GameStats) => {
        const { unlockAchievement } = get();

        if (stats.wins >= 1) unlockAchievement('first_win');
        if (stats.wins >= 10) unlockAchievement('ten_wins');
        if (stats.wins >= 50) unlockAchievement('fifty_wins');
        if (stats.wins >= 100) unlockAchievement('hundred_wins');
        if (stats.bestStreak >= 7) unlockAchievement('seven_day_streak');
        if (stats.bestStreak >= 30) unlockAchievement('legend');
        if (stats.gamesPlayed >= 50) unlockAchievement('marathon');
        if (stats.timedWins >= 10) unlockAchievement('timed_champion');
      },

      unlockAchievement: (id: AchievementId) => {
        set({
          achievements: get().achievements.map((a) =>
            a.id === id && !a.isUnlocked
              ? { ...a, isUnlocked: true, unlockedAt: Date.now() }
              : a
          ),
        });
      },
    }),
    {
      name: 'lexica-achievements',
    }
  )
);
