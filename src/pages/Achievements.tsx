import { motion } from 'framer-motion';
import { Trophy, Award, Crown, Sparkles, Flame, Zap, Timer, GraduationCap, Moon, Sun, Activity, Clock, Check } from 'lucide-react';
import { useAchievementStore } from '../store/achievementStore';

const iconMap: Record<string, any> = {
  Trophy,
  Award,
  Crown,
  Sparkles,
  Flame,
  Zap,
  Timer,
  GraduationCap,
  Moon,
  Sun,
  Activity,
  Clock,
};

export default function Achievements() {
  const achievements = useAchievementStore((s) => s.achievements);
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800,
          textAlign: 'center', marginBottom: '0.3rem',
        }}>
          Achievements
        </h1>
        <p style={{
          textAlign: 'center', color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.85rem',
        }}>
          {unlockedCount} of {achievements.length} Unlocked
        </p>

        {/* Progress bar */}
        <div style={{
          width: '100%', height: '6px', borderRadius: '3px',
          background: 'rgba(255, 255, 255, 0.05)', marginBottom: '1.5rem', overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              height: '100%', borderRadius: '3px',
              background: 'linear-gradient(90deg, #d4af37, #00a86b)',
            }}
          />
        </div>

        {/* Achievement grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {achievements.map((achievement, i) => {
            const IconComp = iconMap[achievement.icon] || Trophy;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.01, x: 3 }}
                className="glass-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: achievement.isUnlocked ? 1 : 0.45,
                  border: achievement.isUnlocked
                    ? '1px solid rgba(212, 175, 55, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{
                  width: '44px', height: '44px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: achievement.isUnlocked
                    ? 'rgba(212, 175, 55, 0.15)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: achievement.isUnlocked
                    ? '1px solid rgba(212, 175, 55, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  flexShrink: 0,
                }}>
                  <IconComp size={22} color={achievement.isUnlocked ? '#d4af37' : 'var(--text-muted)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem',
                    color: 'var(--text-primary)', marginBottom: '0.15rem',
                  }}>
                    {achievement.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {achievement.description}
                  </div>
                </div>
                {achievement.isUnlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.65rem', color: '#00a86b', fontWeight: 800,
                      padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)',
                      background: 'rgba(0, 168, 107, 0.12)',
                      border: '1px solid rgba(0, 168, 107, 0.25)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <Check size={12} />
                    Unlocked
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
