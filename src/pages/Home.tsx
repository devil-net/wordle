import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Sparkles, Zap, Star, Crown, Palette, Trophy, BarChart3 } from 'lucide-react';
import { useStatsStore } from '../store/statsStore';

export default function Home() {
  const navigate = useNavigate();
  const stats = useStatsStore();

  return (
    <div className="page-container wide">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          padding: '3rem 0 2rem',
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.2rem, 10vw, 5.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #d4af37, #f1f5f9, #d4af37, #00a86b)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '0.75rem',
          }}
        >
          LEXICA
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto 2.25rem',
            lineHeight: 1.6,
          }}
        >
          An exquisite word puzzle experience crafted with royal aesthetics and fluid precision.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/play')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2.75rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #d4af37, #aa820a)',
            color: '#0b0f19',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '0.04em',
            boxShadow: '0 4px 25px rgba(212, 175, 55, 0.25)',
            textTransform: 'uppercase',
          }}
        >
          <Gamepad2 size={22} />
          Start Playing
        </motion.button>
      </motion.div>

      {stats.gamesPlayed > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          {[
            { label: 'Played', value: stats.gamesPlayed, icon: Zap, color: 'var(--accent)' },
            { label: 'Win Rate', value: `${Math.round(stats.accuracy)}%`, icon: Star, color: 'var(--correct)' },
            { label: 'Streak', value: stats.currentStreak, icon: Sparkles, color: 'var(--present)' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="glass-card"
              style={{
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <item.icon size={18} color={item.color} style={{ marginBottom: '0.25rem' }} />
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: item.color,
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          paddingBottom: '2rem',
        }}
      >
        {[
          { icon: Crown, title: '5 Game Modes', desc: 'Daily, Unlimited, Practice, Timed, Custom' },
          { icon: Palette, title: '10 Royalty Themes', desc: 'From Midnight Gold to Deep Forest' },
          { icon: Trophy, title: 'Achievements', desc: 'Unlock 13 badges as you conquer words' },
          { icon: BarChart3, title: 'Rich Analytics', desc: 'Track accuracy, distribution, and streaks' },
        ].map((feature, i) => {
          const IconComp = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card"
              style={{ padding: '1.25rem' }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <IconComp size={20} color="#d4af37" />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                {feature.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {feature.desc}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
