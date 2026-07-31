import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Target, Flame, Trophy, Calendar, Infinity as InfinityIcon } from 'lucide-react';
import { useStatsStore } from '../store/statsStore';

function StatCard({ label, value, icon: Icon, color, delay }: {
  label: string; value: string | number; icon: any; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card"
      style={{ padding: '1rem', textAlign: 'center' }}
    >
      <Icon size={18} color={color} style={{ marginBottom: '0.3rem' }} />
      <div style={{
        fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color,
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </motion.div>
  );
}

export default function Statistics() {
  const stats = useStatsStore();
  const maxDist = Math.max(...stats.guessDistribution, 1);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--';
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800,
          textAlign: 'center', marginBottom: '0.3rem',
        }}>
          Statistics
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          Your game performance at a glance
        </p>

        {/* Main stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <StatCard label="Played" value={stats.gamesPlayed} icon={BarChart3} color="var(--accent)" delay={0.1} />
          <StatCard label="Win %" value={`${Math.round(stats.accuracy)}%`} icon={Target} color="var(--correct)" delay={0.15} />
          <StatCard label="Streak" value={stats.currentStreak} icon={Flame} color="#ff6b35" delay={0.2} />
          <StatCard label="Best Streak" value={stats.bestStreak} icon={Trophy} color="var(--present)" delay={0.25} />
          <StatCard label="Avg Guesses" value={stats.averageGuesses.toFixed(1)} icon={TrendingUp} color="#7c3aed" delay={0.3} />
          <StatCard label="Fastest" value={formatTime(stats.fastestWin)} icon={Clock} color="var(--accent)" delay={0.35} />
        </div>

        {/* Guess Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card"
          style={{ padding: '1.25rem', marginBottom: '1.5rem' }}
        >
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700,
            marginBottom: '1rem', color: 'var(--text-primary)',
          }}>
            Guess Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {stats.guessDistribution.map((count, i) => (
              <div key={`guess-dist-${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem',
                  width: '16px', textAlign: 'center', color: 'var(--text-secondary)',
                }}>
                  {i + 1}
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max((count / maxDist) * 100, count > 0 ? 8 : 2)}%` }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                  style={{
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    background: count > 0
                      ? 'linear-gradient(90deg, #d4af37, #00a86b)'
                      : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '0.5rem',
                    minWidth: '24px',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    fontSize: '0.75rem', color: count > 0 ? '#0b0f19' : 'var(--text-muted)',
                  }}>
                    {count}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mode-specific wins */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-card"
          style={{ padding: '1.25rem' }}
        >
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700,
            marginBottom: '1rem', color: 'var(--text-primary)',
          }}>
            Wins by Mode
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {[
              { label: 'Daily', value: stats.dailyWins, icon: Calendar, color: '#d4af37' },
              { label: 'Unlimited', value: stats.unlimitedWins, icon: InfinityIcon, color: '#00a86b' },
              { label: 'Practice', value: stats.practiceWins, icon: Target, color: '#00e5ff' },
              { label: 'Timed', value: stats.timedWins, icon: Clock, color: '#ff6b35' },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={`mode-win-${item.label}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      background: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={16} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
