import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Gamepad2,
  BarChart3,
  Trophy,
  Settings,
  Info,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/play', label: 'Play', icon: Gamepad2 },
  { path: '/statistics', label: 'Stats', icon: BarChart3 },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/how-to-play', label: 'How to Play', icon: HelpCircle },
  { path: '/about', label: 'About', icon: Info },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--card-border)',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em',
              }}
            >
              LEXICA
            </motion.div>
          </NavLink>

          {/* Desktop Nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      background: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <item.icon size={16} />
                    <span className="nav-label">{item.label}</span>
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              padding: '0.5rem',
              color: 'var(--text-primary)',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Slide-out Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: '60px',
            right: 0,
            bottom: 0,
            width: '260px',
            background: 'var(--bg-primary)',
            borderLeft: '1px solid var(--card-border)',
            zIndex: 99,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: '-4px 0 30px var(--shadow)',
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                  }}
                >
                  <item.icon size={20} />
                  {item.label}
                </motion.div>
              )}
            </NavLink>
          ))}
        </motion.div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: '60px',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 98,
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .nav-label { display: none; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .nav-label { display: none; }
        }
      `}</style>
    </>
  );
}
