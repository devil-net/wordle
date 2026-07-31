import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Guess the Word',
    description: 'Type a valid English word and press Enter to submit your guess. You have 6 attempts.',
  },
  {
    title: 'Green = Correct Position',
    description: 'The letter is in the word AND in the exact correct position.',
  },
  {
    title: 'Gold = Wrong Position',
    description: 'The letter IS in the word but in a different position.',
  },
  {
    title: 'Slate = Absent',
    description: 'The letter is NOT in the word at all.',
  },
];

const example = { word: 'CRANE', states: ['correct', 'absent', 'present', 'absent', 'correct'] };

export default function HowToPlay() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800,
          textAlign: 'center', marginBottom: '0.3rem',
        }}>
          How to Play
        </h1>
        <p style={{
          textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.85rem',
        }}>
          Rules and gameplay mechanics
        </p>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card"
              style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #aa820a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9rem',
                color: '#0b0f19', flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem',
                  color: 'var(--text-primary)', marginBottom: '0.3rem',
                }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card"
          style={{ padding: '1.25rem', textAlign: 'center' }}
        >
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem',
            marginBottom: '1rem', color: 'var(--text-primary)',
          }}>
            Evaluated Example
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
            {example.word.split('').map((letter, i) => {
              const state = example.states[i];
              const bg = state === 'correct'
                ? 'linear-gradient(145deg, #00b050, #008a3e)'
                : state === 'present'
                ? 'linear-gradient(145deg, #d4af37, #b8860b)'
                : '#1f2738';
              const color = state === 'present' ? '#0b0f19' : '#fff';
              return (
                <motion.div
                  key={i}
                  initial={{ rotateX: 180, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  style={{
                    width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                    background: bg, color,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem',
                  }}
                >
                  {letter}
                </motion.div>
              );
            })}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong>C</strong> is correct in position 1, <strong>A</strong> is in the word but wrong spot,{' '}
            <strong>R</strong>, <strong>N</strong> are absent, and <strong>E</strong> is correct in position 5.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
