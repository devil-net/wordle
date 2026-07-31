import { motion } from 'framer-motion';
import type { LetterState } from '../../types';

interface TileProps {
  letter: string;
  state: LetterState;
  position: { row: number; col: number };
  isRevealing: boolean;
  isActive: boolean;
}

export default function Tile({ letter, state, position, isRevealing, isActive }: TileProps) {
  const delay = position.col * 0.12;
  const hasLetter = letter !== '';
  const isEvaluated = state === 'correct' || state === 'present' || state === 'absent';

  const getBackground = () => {
    if (state === 'correct') return 'var(--correct)';
    if (state === 'present') return 'var(--present)';
    if (state === 'absent') return 'var(--absent)';
    return 'var(--tile-empty)';
  };

  const getTextColor = () => {
    if (state === 'correct') return '#ffffff';
    if (state === 'present') return '#0b0f19';
    if (state === 'absent') return 'var(--text-primary)';
    return 'var(--text-primary)';
  };

  const getBorder = () => {
    if (isEvaluated) return '1.5px solid transparent';
    if (hasLetter) return '2px solid var(--accent)';
    return '1.5px solid var(--tile-border)';
  };

  return (
    <motion.div
      className="tile-wrapper"
      style={{
        width: 'clamp(48px, 13vw, 64px)',
        height: 'clamp(48px, 13vw, 64px)',
        perspective: '600px',
      }}
      initial={false}
      animate={
        isActive && hasLetter
          ? { scale: [1, 1.08, 1] }
          : {}
      }
      transition={{ duration: 0.1 }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          textTransform: 'uppercase',
          borderRadius: 'var(--radius-md)',
          border: getBorder(),
          background: getBackground(),
          color: getTextColor(),
          boxShadow: isEvaluated
            ? '0 4px 14px var(--shadow)'
            : hasLetter
            ? '0 0 14px var(--shadow)'
            : 'none',
          cursor: 'default',
          userSelect: 'none',
          letterSpacing: '0.02em',
        }}
        initial={false}
        animate={
          isRevealing && isEvaluated
            ? {
                rotateX: [0, 90, 0],
                transition: {
                  duration: 0.4,
                  delay,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        aria-label={`${letter || 'empty'}, ${state}`}
        role="img"
      >
        {letter}
      </motion.div>
    </motion.div>
  );
}
