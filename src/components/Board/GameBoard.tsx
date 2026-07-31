import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import Tile from './Tile';

export default function GameBoard() {
  const board = useGameStore((s) => s.board);
  const currentRow = useGameStore((s) => s.currentRow);
  const gameStatus = useGameStore((s) => s.gameStatus);

  const revealingRow = currentRow > 0 ? currentRow - 1 : -1;

  const shakeVariants: Variants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  const bounceVariants: Variants = {
    bounce: (col: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 0.4,
        delay: col * 0.08,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(4px, 1vw, 8px)',
        padding: '1rem 0',
      }}
      role="grid"
      aria-label="Game board"
    >
      {board.map((row, rowIdx) => {
        const isCurrentRow = rowIdx === currentRow;
        const isRevealedRow = rowIdx === revealingRow;
        const isWinRow = gameStatus === 'won' && rowIdx === currentRow - 1;

        return (
          <motion.div
            key={rowIdx}
            style={{
              display: 'flex',
              gap: 'clamp(4px, 1vw, 8px)',
            }}
            role="row"
            aria-label={`Row ${rowIdx + 1}`}
            variants={shakeVariants}
          >
            {row.map((tile, colIdx) => (
              <motion.div
                key={colIdx}
                variants={bounceVariants}
                custom={colIdx}
                animate={isWinRow ? 'bounce' : undefined}
              >
                <Tile
                  letter={tile.letter}
                  state={tile.state}
                  position={{ row: rowIdx, col: colIdx }}
                  isRevealing={isRevealedRow}
                  isActive={isCurrentRow}
                />
              </motion.div>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
