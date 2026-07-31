import type { Achievement, AchievementId } from '../types';

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt' | 'isUnlocked'>[] = [
  {
    id: 'first_win',
    title: 'First Steps',
    description: 'Win your first game',
    icon: 'Trophy',
  },
  {
    id: 'ten_wins',
    title: 'Getting Started',
    description: 'Win 10 games',
    icon: 'Award',
  },
  {
    id: 'fifty_wins',
    title: 'Wordsmith',
    description: 'Win 50 games',
    icon: 'Crown',
  },
  {
    id: 'hundred_wins',
    title: 'Century Club',
    description: 'Win 100 games',
    icon: 'Sparkles',
  },
  {
    id: 'seven_day_streak',
    title: 'On Fire',
    description: 'Maintain a 7-day winning streak',
    icon: 'Flame',
  },
  {
    id: 'perfect_game',
    title: 'Perfect Game',
    description: 'Guess the word on your first try',
    icon: 'Zap',
  },
  {
    id: 'speed_runner',
    title: 'Speed Runner',
    description: 'Win a game in under 30 seconds',
    icon: 'Timer',
  },
  {
    id: 'word_master',
    title: 'Word Master',
    description: 'Win 25 games with no hints',
    icon: 'GraduationCap',
  },
  {
    id: 'legend',
    title: 'Legend',
    description: 'Reach a 30-day winning streak',
    icon: 'Crown',
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Win a game between midnight and 5 AM',
    icon: 'Moon',
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Win a game between 5 AM and 7 AM',
    icon: 'Sun',
  },
  {
    id: 'marathon',
    title: 'Marathon',
    description: 'Play 50 games in total',
    icon: 'Activity',
  },
  {
    id: 'timed_champion',
    title: 'Timed Champion',
    description: 'Win 10 timed challenge games',
    icon: 'Clock',
  },
];

export function getInitialAchievements(): Achievement[] {
  return ACHIEVEMENT_DEFINITIONS.map((def) => ({
    ...def,
    isUnlocked: false,
    unlockedAt: undefined,
  }));
}

export function getAchievementById(id: AchievementId): Achievement | undefined {
  const achievements = getInitialAchievements();
  return achievements.find((a) => a.id === id);
}
