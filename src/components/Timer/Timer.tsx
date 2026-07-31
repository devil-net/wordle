import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon, Pause, Play } from 'lucide-react';

interface TimerProps {
  timeLimit: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

export default function Timer({ timeLimit, isRunning, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (!isRunning || isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / timeLimit;
  const isLow = timeLeft <= 30;
  const isCritical = timeLeft <= 10;

  const getColor = () => {
    if (isCritical) return '#ff4444';
    if (isLow) return '#ffd166';
    return 'var(--accent)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isCritical ? 'rgba(255,68,68,0.3)' : 'var(--card-border)'}`,
      }}
    >
      <TimerIcon size={18} color={getColor()} />

      <motion.span
        key={timeLeft}
        initial={{ scale: 1.2, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: getColor(),
          fontVariantNumeric: 'tabular-nums',
          minWidth: '60px',
          textAlign: 'center',
        }}
      >
        {minutes}:{seconds.toString().padStart(2, '0')}
      </motion.span>

      <div
        style={{
          width: '60px',
          height: '4px',
          borderRadius: '2px',
          background: 'var(--tile-empty)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
            borderRadius: '2px',
            background: getColor(),
          }}
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPaused(!isPaused)}
        style={{
          padding: '4px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
        }}
      >
        {isPaused ? <Play size={14} /> : <Pause size={14} />}
      </motion.button>
    </motion.div>
  );
}
