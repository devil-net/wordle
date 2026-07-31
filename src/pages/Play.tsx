import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Infinity as InfinityIcon, Target, Clock, Sliders, Settings2 } from 'lucide-react';
import GameBoard from '../components/Board/GameBoard';
import Keyboard from '../components/Keyboard/Keyboard';
import Timer from '../components/Timer/Timer';
import Confetti from '../components/Effects/Confetti';
import GameResultModal from '../components/Modal/GameResultModal';
import { showToast } from '../components/ui/Toast';
import { useGameStore } from '../store/gameStore';
import { useStatsStore } from '../store/statsStore';
import { useSettingsStore } from '../store/settingsStore';
import { GAME_MODES, DIFFICULTY_CONFIG } from '../constants';
import type { GameMode, GameConfig } from '../types';

const modeIcons: Record<string, any> = {
  Calendar,
  Infinity: InfinityIcon,
  Target,
  Clock,
  Sliders,
};

export default function Play() {
  const [searchParams] = useSearchParams();
  const modeParam = (searchParams.get('mode') as GameMode) || 'unlimited';

  const gameStatus = useGameStore((s) => s.gameStatus);
  const initGame = useGameStore((s) => s.initGame);
  const currentRow = useGameStore((s) => s.currentRow);
  const startTime = useGameStore((s) => s.startTime);
  const endTime = useGameStore((s) => s.endTime);
  const config = useGameStore((s) => s.config);
  const recordGame = useStatsStore((s) => s.recordGame);
  const difficulty = useSettingsStore((s) => s.difficulty);

  const [showResult, setShowResult] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [selectedMode, setSelectedMode] = useState<GameMode>(modeParam);
  const [customLength, setCustomLength] = useState(5);
  const [customTime, setCustomTime] = useState(120);

  const recordedGameRef = useRef(false);

  const startGame = useCallback(
    (mode: GameMode) => {
      const diffConfig = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.medium;
      const gameConfig: GameConfig = {
        mode,
        difficulty,
        wordLength: mode === 'custom' ? customLength : (mode === 'timed' ? 5 : diffConfig.wordLength),
        maxAttempts: 6,
        timeLimit: mode === 'timed' ? customTime : undefined,
        hintsEnabled: mode === 'practice',
      };
      recordedGameRef.current = false;
      initGame(gameConfig);
      setShowModeSelector(false);
      setShowResult(false);
    },
    [initGame, difficulty, customLength, customTime]
  );

  useEffect(() => {
    if (!config || !config.mode || config.mode !== modeParam) {
      startGame(modeParam);
    }
  }, [modeParam, startGame]);

  useEffect(() => {
    if ((gameStatus === 'won' || gameStatus === 'lost') && !recordedGameRef.current) {
      recordedGameRef.current = true;
      const timer = setTimeout(() => {
        setShowResult(true);
        const timeTaken = endTime && startTime ? (endTime - startTime) / 1000 : 0;
        recordGame(gameStatus === 'won', currentRow, timeTaken, config.mode);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, endTime, startTime, currentRow, config.mode, recordGame]);

  const handleTimeUp = useCallback(() => {
    showToast('Time expired', 'error');
    const store = useGameStore.getState();
    if (store.gameStatus === 'playing') {
      setShowResult(true);
    }
  }, []);

  if (showModeSelector) {
    return (
      <div className="page-container wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Select Game Mode
          </h1>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              fontSize: '0.85rem',
            }}
          >
            Choose your preferred challenge style
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {GAME_MODES.map((mode, i) => {
              const IconComp = modeIcons[mode.iconName] || Calendar;
              const isSelected = selectedMode === mode.id;

              return (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedMode(mode.id);
                    if (mode.id !== 'custom') {
                      startGame(mode.id);
                    }
                  }}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: isSelected ? `1.5px solid ${mode.color}` : '1px solid var(--card-border)',
                    boxShadow: isSelected ? `0 4px 20px ${mode.color}25` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-sm)',
                      background: `${mode.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                      border: `1px solid ${mode.color}30`,
                    }}
                  >
                    <IconComp size={20} color={mode.color} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {mode.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {mode.description}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selectedMode === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass-card"
              style={{ padding: '1.5rem', marginBottom: '1.5rem' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: 'var(--text-primary)',
                }}
              >
                Custom Puzzle Parameters
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Word Length: <strong style={{ color: '#d4af37' }}>{customLength} Letters</strong>
                  <input
                    type="range"
                    min={4}
                    max={6}
                    value={customLength}
                    onChange={(e) => setCustomLength(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '0.5rem', accentColor: '#d4af37' }}
                  />
                </label>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Time Limit: <strong style={{ color: '#d4af37' }}>{customTime} Seconds</strong>
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={30}
                    value={customTime}
                    onChange={(e) => setCustomTime(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '0.5rem', accentColor: '#d4af37' }}
                  />
                </label>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startGame('custom')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, #d4af37, #aa820a)',
                    color: '#0b0f19',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Launch Custom Game
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Confetti isActive={gameStatus === 'won'} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          textAlign: 'center',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {GAME_MODES.find((m) => m.id === config.mode)?.label || 'Playing'}
        </span>
        {config.mode === 'timed' && config.timeLimit && (
          <Timer
            timeLimit={config.timeLimit}
            isRunning={gameStatus === 'playing'}
            onTimeUp={handleTimeUp}
          />
        )}
      </motion.div>

      <GameBoard />

      <div style={{ marginTop: 'auto', paddingBottom: '1rem' }}>
        <Keyboard />
      </div>

      <div style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModeSelector(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Settings2 size={13} />
          Change Mode
        </motion.button>
      </div>

      <GameResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        onPlayAgain={() => startGame(config.mode)}
      />
    </div>
  );
}
