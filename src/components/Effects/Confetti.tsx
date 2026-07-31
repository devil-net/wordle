import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONFETTI_COLORS } from '../../constants';

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  shape: 'square' | 'circle' | 'strip';
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    velocityX: (Math.random() - 0.5) * 40,
    velocityY: Math.random() * 60 + 40,
    shape: (['square', 'circle', 'strip'] as const)[Math.floor(Math.random() * 3)],
  }));
}

export default function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setParticles(generateParticles(60));
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 200,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: '-5%',
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            top: '110%',
            left: `${p.x + p.velocityX}%`,
            rotate: p.rotation + 720,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            ease: 'easeIn',
            delay: Math.random() * 0.5,
          }}
          style={{
            position: 'absolute',
            width: p.shape === 'strip' ? p.size * 0.4 : p.size,
            height: p.shape === 'strip' ? p.size * 2 : p.size,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'strip' ? '2px' : '2px',
          }}
        />
      ))}
    </div>
  );
}
