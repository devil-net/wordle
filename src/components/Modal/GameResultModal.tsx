import { motion } from 'framer-motion';
import { Crown, AlertCircle, RotateCcw, Share2, Clock, Target } from 'lucide-react';
import Modal from './Modal';
import { useGameStore } from '../../store/gameStore';

interface GameResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
}

export default function GameResultModal({ isOpen, onClose, onPlayAgain }: GameResultModalProps) {
  const gameStatus = useGameStore((s) => s.gameStatus);
  const targetWord = useGameStore((s) => s.targetWord);
  const currentRow = useGameStore((s) => s.currentRow);
  const startTime = useGameStore((s) => s.startTime);
  const endTime = useGameStore((s) => s.endTime);

  const won = gameStatus === 'won';
  const timeTaken = endTime && startTime ? Math.round((endTime - startTime) / 1000) : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const handleShare = () => {
    const board = useGameStore.getState().board;
    const emojiGrid = board
      .slice(0, currentRow)
      .map((row) =>
        row
          .map((tile) => {
            if (tile.state === 'correct') return '🟩';
            if (tile.state === 'present') return '🟨';
            return '⬛';
          })
          .join('')
      )
      .join('\n');

    const text = `Lexica ${won ? currentRow : 'X'}/6\n\n${emojiGrid}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={won ? 'VICTORY' : 'PUZZLE COMPLETE'}>
      <div style={{ textAlign: 'center' }}>
        {/* Emblem Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: won
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(0, 200, 83, 0.2))'
              : 'rgba(255, 255, 255, 0.05)',
            border: won
              ? '1px solid rgba(212, 175, 55, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: won
              ? '0 0 25px rgba(212, 175, 55, 0.25)'
              : 'none',
          }}
        >
          {won ? (
            <Crown size={30} color="#d4af37" />
          ) : (
            <AlertCircle size={30} color="var(--text-muted)" />
          )}
        </motion.div>

        {/* Word Display */}
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {won ? 'Solved Target Word' : 'The Correct Word Was'}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.2rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: won ? '#d4af37' : 'var(--text-primary)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          {targetWord}
        </motion.div>

        {/* Stats Summary */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: won ? '1fr 1fr' : '1fr',
            gap: '0.75rem',
            marginBottom: '1.75rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {won && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Target size={12} color="var(--accent)" />
                Attempts
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginTop: '0.15rem',
                }}
              >
                {currentRow} / 6
              </div>
            </div>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Clock size={12} color="var(--accent)" />
              Duration
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: '0.15rem',
              }}
            >
              {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayAgain}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #d4af37, #aa820a)',
              color: '#0b0f19',
              fontWeight: 800,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.03em',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
              textTransform: 'uppercase',
            }}
          >
            <RotateCcw size={15} />
            Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            <Share2 size={15} />
            Share
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
