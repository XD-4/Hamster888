'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AuthModal from './AuthModal';
export default function AppleNavbar({ activeSection, setActiveSection, cartCount, onOpenCart, onOpenPaymentModal }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newDark = !prev;
      if (newDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newDark;
    });
  };

  const navItems = [
    { id: 'products', label: 'สินค้าทั้งหมด' },
    { id: 'order_payment', label: 'สั่งซื้อ & แจ้งโอน' },
    { id: 'contact_tax', label: 'ติดต่อ & ใบกำกับภาษี' },
  ];

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px 16px', position: 'fixed', top: 0, zIndex: 1000, pointerEvents: 'none' }}>
      <header 
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px', 
          background: isDarkMode ? 'rgba(25, 25, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '9999px',
          boxShadow: isDarkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '100%', maxWidth: '900px',
          pointerEvents: 'auto',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => setActiveSection('products')}
          aria-label="find IOT หน้าแรก"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
        >
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'rotate(10deg) scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="6" height="6" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>find IOT</span>
        </button>

        {/* Navigation Links (Desktop) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: 600,
                color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => { if (activeSection !== item.id) e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenPaymentModal}
            style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            แจ้งชำระเงิน
          </button>
        </nav>

        {/* Actions (Login, Theme, Cart) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              title={`เข้าสู่ระบบด้วย ${user.email}`}
              style={{ fontSize: '0.85rem', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
            >
              ออก
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              style={{ fontSize: '0.85rem', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', background: isDarkMode ? '#fff' : '#000', color: isDarkMode ? '#000' : '#fff', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              ล็อกอิน
            </button>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'background 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {isDarkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          {/* Bag icon */}
          <button
            type="button"
            onClick={onOpenCart}
            style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', position: 'relative', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <svg width="18" height="20" viewBox="0 0 15 17" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1.5 5.5h12l-.8 10H2.3z" strokeLinejoin="round" />
              <path d="M4.8 5.5V4a2.7 2.7 0 0 1 5.4 0v1.5" />
            </svg>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: 0, right: 0, background: '#FF3B30', color: '#fff', fontSize: '0.65rem', fontWeight: 800, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </div>
    
    <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={(userData) => setUser(userData)}
    />
    </>
  );
}
