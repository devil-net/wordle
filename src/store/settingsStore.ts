import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, ThemeId } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

interface SettingsStore extends AppSettings {
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
  toggleTheme: () => void;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      updateSetting: (key, value) =>
        set((state) => ({ ...state, [key]: value })),

      resetSettings: () => set({ ...DEFAULT_SETTINGS }),

      toggleTheme: () =>
        set((state) => ({
          theme: (state.theme === 'dark' ? 'light' : 'dark') as ThemeId,
        })),

      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        })),
    }),
    {
      name: 'lexica-settings',
    }
  )
);
