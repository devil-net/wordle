import { motion } from 'framer-motion';
import { Palette, Gauge, Accessibility } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { themes } from '../data/themes';
import type { ThemeId, Difficulty } from '../types';

function SettingRow({ label, description, children }: {
  label: string; description?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.85rem 0', borderBottom: '1px solid var(--card-border)',
    }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{label}</div>
        {description && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{description}</div>
        )}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <motion.button
      onClick={onChange}
      style={{
        width: '44px', height: '24px', borderRadius: '12px',
        background: checked ? 'var(--accent)' : 'var(--absent)',
        position: 'relative', padding: 0, flexShrink: 0,
        transition: 'background 0.2s ease',
      }}
      aria-checked={checked}
      role="switch"
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: '20px', height: '20px', borderRadius: '50%',
          background: '#fff', position: 'absolute', top: '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </motion.button>
  );
}

export default function Settings() {
  const settings = useSettingsStore();
  const updateSetting = useSettingsStore((s) => s.updateSetting);

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800,
          textAlign: 'center', marginBottom: '1.5rem',
        }}>
          Settings
        </h1>

        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem',
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}>
            <Palette size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Appearance
          </h3>

          <SettingRow label="Theme">
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value as ThemeId)}
              style={{
                padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--key-bg)', color: 'var(--text-primary)',
                border: '1px solid var(--tile-border)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </SettingRow>

          <SettingRow label="Animation Speed">
            <select
              value={settings.animationSpeed}
              onChange={(e) => updateSetting('animationSpeed', e.target.value as 'slow' | 'normal' | 'fast')}
              style={{
                padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--key-bg)', color: 'var(--text-primary)',
                border: '1px solid var(--tile-border)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </SettingRow>

          <SettingRow label="Font Size">
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value as 'small' | 'medium' | 'large')}
              style={{
                padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--key-bg)', color: 'var(--text-primary)',
                border: '1px solid var(--tile-border)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </SettingRow>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem',
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}>
            <Gauge size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Gameplay
          </h3>

          <SettingRow label="Difficulty">
            <select
              value={settings.difficulty}
              onChange={(e) => updateSetting('difficulty', e.target.value as Difficulty)}
              style={{
                padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--key-bg)', color: 'var(--text-primary)',
                border: '1px solid var(--tile-border)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              <option value="easy">Easy (4 letters)</option>
              <option value="medium">Medium (5 letters)</option>
              <option value="hard">Hard (6 letters)</option>
              <option value="expert">Expert (Random)</option>
            </select>
          </SettingRow>

          <SettingRow label="Keyboard Layout">
            <select
              value={settings.keyboardLayout}
              onChange={(e) => updateSetting('keyboardLayout', e.target.value as 'qwerty' | 'dvorak' | 'azerty')}
              style={{
                padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)',
                background: 'var(--key-bg)', color: 'var(--text-primary)',
                border: '1px solid var(--tile-border)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              <option value="qwerty">QWERTY</option>
              <option value="dvorak">Dvorak</option>
              <option value="azerty">AZERTY</option>
            </select>
          </SettingRow>

          <SettingRow label="Sound Effects">
            <Toggle
              checked={settings.soundEnabled}
              onChange={() => updateSetting('soundEnabled', !settings.soundEnabled)}
            />
          </SettingRow>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem',
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}>
            <Accessibility size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Accessibility
          </h3>

          <SettingRow label="High Contrast" description="Improve letter visibility">
            <Toggle
              checked={settings.highContrast}
              onChange={() => updateSetting('highContrast', !settings.highContrast)}
            />
          </SettingRow>

          <SettingRow label="Reduced Motion" description="Minimize animations">
            <Toggle
              checked={settings.reducedMotion}
              onChange={() => updateSetting('reducedMotion', !settings.reducedMotion)}
            />
          </SettingRow>

          <SettingRow label="Colorblind Mode" description="Use distinct patterns">
            <Toggle
              checked={settings.colorblindMode}
              onChange={() => updateSetting('colorblindMode', !settings.colorblindMode)}
            />
          </SettingRow>
        </div>
      </motion.div>
    </div>
  );
}
