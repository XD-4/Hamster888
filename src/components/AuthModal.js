'use client';

import { useEffect } from 'react';
import SignInCard from './SignInCard';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        padding: '24px 16px',
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        overflowY: 'auto',
      }}
    >
      {/* margin:auto = "safe" centering: centered when it fits, scrollable when taller than the screen */}
      <div style={{ margin: 'auto', width: '100%', maxWidth: 420 }}>
        <SignInCard
          onClose={onClose}
          onSuccess={(user) => {
            onLoginSuccess?.(user);
            onClose?.();
          }}
        />
      </div>
    </div>
  );
}
