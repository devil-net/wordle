import { useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { getThemeById } from '../data/themes';

export function useTheme() {
  const themeId = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const theme = getThemeById(themeId);
    const root = document.documentElement;
    const c = theme.colors;

    root.style.setProperty('--bg-primary', c.bgPrimary);
    root.style.setProperty('--bg-secondary', c.bgSecondary);
    root.style.setProperty('--bg-tertiary', c.bgTertiary);
    root.style.setProperty('--text-primary', c.textPrimary);
    root.style.setProperty('--text-secondary', c.textSecondary);
    root.style.setProperty('--text-muted', c.textMuted);
    root.style.setProperty('--accent', c.accent);
    root.style.setProperty('--accent-hover', c.accentHover);
    root.style.setProperty('--correct', c.correct);
    root.style.setProperty('--present', c.present);
    root.style.setProperty('--absent', c.absent);
    root.style.setProperty('--tile-border', c.tileBorder);
    root.style.setProperty('--tile-empty', c.tileEmpty);
    root.style.setProperty('--key-bg', c.keyBg);
    root.style.setProperty('--key-text', c.keyText);
    root.style.setProperty('--key-special', c.keySpecial);
    root.style.setProperty('--key-special-text', c.keySpecialText || '#ffffff');
    root.style.setProperty('--card-bg', c.cardBg);
    root.style.setProperty('--card-border', c.cardBorder);
    root.style.setProperty('--nav-bg', c.navBg);
    root.style.setProperty('--modal-overlay', c.modalOverlay);
    root.style.setProperty('--shadow', c.shadow);
    root.style.setProperty('--gradient-1', c.gradient1);
    root.style.setProperty('--gradient-2', c.gradient2);

    // Update body gradient
    document.body.style.background = `linear-gradient(135deg, ${c.gradient1}, ${c.gradient2})`;
  }, [themeId]);

  return themeId;
}
