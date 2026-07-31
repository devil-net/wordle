import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Zap, Unlock } from 'lucide-react';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function About() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '0.3rem',
          }}
        >
          About Lexica
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            fontSize: '0.85rem',
          }}
        >
          A next-generation word puzzle game experience
        </p>

        {/* Creator Note */}
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.08), rgba(18, 24, 38, 0.9))',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#d4af37',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Unlock size={20} color="#d4af37" />
            Why Lexica Was Built
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.65, fontWeight: 500 }}>
            I created Lexica so everyone can enjoy endless word puzzles completely free — without intrusive ads, without waiting 24 hours for the next puzzle, and without any premium paywalls. Play as much as you like and enjoy the experience!
          </p>
        </div>

        {/* Vision */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--accent)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Sparkles size={20} />
            Our Design Philosophy
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Lexica was created to redefine browser-based word puzzle games with a distinct focus on aesthetic polish, fluid micro-interactions, high-speed responsiveness, and rich customization options.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Designed with royal gold accents, frosted glass cards, dynamic themes, and precision letter animation, Lexica brings an elevated, luxury feel to word challenges.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <Zap size={22} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              60 FPS Animations
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Powered by Framer Motion for buttery-smooth 3D tile flips, spring physics keypresses, and particle celebrations.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <ShieldCheck size={22} color="var(--correct)" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Privacy & Local First
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              All progress, streaks, achievements, and statistics stay securely in your browser's local storage.
            </p>
          </div>
        </div>

        {/* Footer & GitHub Link */}
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>Built with</span>
            <Heart size={16} color="#ff6b6b" fill="#ff6b6b" />
            <span>by</span>
            <a
              href="https://github.com/devil-net"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#d4af37',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <GithubIcon size={16} />
              devil-net
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
