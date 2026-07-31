import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';
import { KEYBOARD_LAYOUTS } from '../../constants';
import type { KeyState } from '../../types';

export default function Keyboard() {
  const addLetter = useGameStore((s) => s.addLetter);
  const removeLetter = useGameStore((s) => s.removeLetter);
  const submitGuess = useGameStore((s) => s.submitGuess);
  const keyboardState = useGameStore((s) => s.keyboardState);
  const gameStatus = useGameStore((s) => s.gameStatus);
  const keyboardLayout = useSettingsStore((s) => s.keyboardLayout);

  const rows = KEYBOARD_LAYOUTS[keyboardLayout] || KEYBOARD_LAYOUTS.qwerty;

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== 'playing') return;
      if (key === 'ENTER') {
        submitGuess();
      } else if (key === 'BACKSPACE') {
        removeLetter();
      } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
      }
    },
    [addLetter, removeLetter, submitGuess, gameStatus]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === 'ENTER') {
        e.preventDefault();
        handleKeyPress('ENTER');
      } else if (key === 'BACKSPACE') {
        e.preventDefault();
        handleKeyPress('BACKSPACE');
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyPress]);

  const getKeyState = (key: string): KeyState => {
    if (key === 'ENTER' || key === 'BACKSPACE') return 'unused';
    return (keyboardState[key] as KeyState) || 'unused';
  };

  const getKeyColors = (key: string, state: KeyState) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return {
        bg: 'var(--key-special)',
        text: 'var(--key-special-text)',
        border: 'var(--key-special)',
      };
    }
    if (state === 'correct') {
      return { bg: 'var(--correct)', text: '#ffffff', border: 'var(--correct)' };
    }
    if (state === 'present') {
      return { bg: 'var(--present)', text: '#0b0f19', border: 'var(--present)' };
    }
    if (state === 'absent') {
      return { bg: 'var(--absent)', text: 'var(--text-muted)', border: 'transparent' };
    }
    return {
      bg: 'var(--key-bg)',
      text: 'var(--key-text)',
      border: 'var(--tile-border)',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '0.5rem 0',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
      }}
      role="group"
      aria-label="Keyboard"
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: 'flex',
            gap: '5px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {row.map((key) => {
            const state = getKeyState(key);
            const colors = getKeyColors(key, state);
            const isSpecial = key === 'ENTER' || key === 'BACKSPACE';

            return (
              <motion.button
                key={key}
                onClick={() => handleKeyPress(key)}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  minWidth: isSpecial ? 'clamp(52px, 12vw, 72px)' : 'clamp(28px, 7.5vw, 44px)',
                  height: 'clamp(42px, 10vw, 54px)',
                  borderRadius: 'var(--radius-sm)',
                  background: colors.bg,
                  color: colors.text,
                  fontSize: isSpecial ? 'clamp(0.6rem, 2vw, 0.75rem)' : 'clamp(0.85rem, 2.5vw, 1.1rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                  userSelect: 'none',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 6px var(--shadow)',
                }}
                aria-label={key === 'BACKSPACE' ? 'Delete' : key}
              >
                {key === 'BACKSPACE' ? <Delete size={18} /> : key}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
