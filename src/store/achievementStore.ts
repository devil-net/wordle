import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Achievement, AchievementId, GameStats } from '../types';
import { ACHIEVEMENT_DEFINITIONS } from '../data/achievements';
import { showToast } from '../components/ui/Toast';

interface ExtraGameContext {
  won: boolean;
  guesses: number;
  time: number;
}

interface AchievementStore {
  achievements: Achievement[];
  checkAchievements: (stats: GameStats, ctx?: ExtraGameContext) => void;
  unlockAchievement: (id: AchievementId) => void;
}

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENT_DEFINITIONS.map((def) => ({
        ...def,
        isUnlocked: false,
      })),

      checkAchievements: (stats: GameStats, ctx?: ExtraGameContext) => {
        const { unlockAchievement } = get();

        if (stats.wins >= 1) unlockAchievement('first_win');
        if (stats.wins >= 10) unlockAchievement('ten_wins');
        if (stats.wins >= 50) unlockAchievement('fifty_wins');
        if (stats.wins >= 100) unlockAchievement('hundred_wins');
        if (stats.bestStreak >= 7) unlockAchievement('seven_day_streak');
        if (stats.bestStreak >= 30) unlockAchievement('legend');
        if (stats.gamesPlayed >= 50) unlockAchievement('marathon');
        if (stats.timedWins >= 10) unlockAchievement('timed_champion');

        if (ctx && ctx.won) {
          if (ctx.guesses === 1) unlockAchievement('perfect_game');
          if (ctx.time > 0 && ctx.time < 30) unlockAchievement('speed_runner');

          const hour = new Date().getHours();
          if (hour >= 0 && hour < 5) unlockAchievement('night_owl');
          if (hour >= 5 && hour < 7) unlockAchievement('early_bird');
        }
      },

      unlockAchievement: (id: AchievementId) => {
        const target = get().achievements.find((a) => a.id === id);
        if (target && !target.isUnlocked) {
          set({
            achievements: get().achievements.map((a) =>
              a.id === id ? { ...a, isUnlocked: true, unlockedAt: Date.now() } : a
            ),
          });
          showToast(`Achievement Unlocked: ${target.title}`, 'success');
        }
      },
    }),
    {
      name: 'lexica-achievements',
    }
  )
);
