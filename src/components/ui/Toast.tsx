import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

let toastId = 0;

// Global toast listener set — ensures unique callback registration
const toastListeners = new Set<(toast: Toast) => void>();

export function showToast(message: string, type: Toast['type'] = 'info') {
  const toast: Toast = { id: ++toastId, message, type };
  toastListeners.forEach((fn) => fn(toast));
}

const typeStyles: Record<Toast['type'], { bg: string; border: string }> = {
  info: { bg: 'var(--bg-tertiary)', border: 'var(--accent)' },
  success: { bg: 'var(--bg-tertiary)', border: 'var(--correct)' },
  error: { bg: 'var(--bg-tertiary)', border: '#ff4444' },
  warning: { bg: 'var(--bg-tertiary)', border: 'var(--present)' },
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => {
      // Avoid duplicate identical active messages
      if (prev.some((t) => t.message === toast.message)) {
        return prev;
      }
      return [...prev, toast];
    });

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 2500);
  }, []);

  useEffect(() => {
    toastListeners.add(addToast);
    return () => {
      toastListeners.delete(addToast);
    };
  }, [addToast]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '72px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: typeStyles[toast.type].bg,
              border: `1px solid ${typeStyles[toast.type].border}`,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '0.85rem',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 30px var(--shadow)',
              pointerEvents: 'auto',
            }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
