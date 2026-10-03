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
    <header className="apple-nav">
      <div className="apple-nav__inner">
        {/* Brand / Logo */}
        <button
          type="button"
          id="nav-logo"
          className="apple-nav__logo"
          onClick={() => setActiveSection('products')}
          aria-label="find IOT หน้าแรก"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="14" x2="4" y2="14" />
          </svg>
          <span>find IOT</span>
        </button>

        {/* Navigation Links */}
        <nav className="apple-nav__links">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`apple-nav__link${activeSection === item.id ? ' is-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            id="nav-inform-payment"
            onClick={onOpenPaymentModal}
            className="apple-nav__link"
          >
            แจ้งชำระเงิน
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* User Profile / Login */}
          {user ? (
            <button
              type="button"
              className="apple-nav__icon"
              onClick={handleLogout}
              aria-label="ออกจากระบบ"
              title={`เข้าสู่ระบบด้วย ${user.email}`}
              style={{ fontSize: '0.8rem', fontWeight: 600, width: 'auto', padding: '0 10px', borderRadius: '16px' }}
            >
              ออก
            </button>
          ) : (
            <button
              type="button"
              className="apple-nav__icon"
              onClick={() => setIsAuthModalOpen(true)}
              aria-label="เข้าสู่ระบบ / สมัครสมาชิก"
              style={{ fontSize: '0.8rem', fontWeight: 600, width: 'auto', padding: '0 10px', borderRadius: '16px' }}
            >
              ล็อกอิน
            </button>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            className="apple-nav__icon"
            onClick={toggleTheme}
            aria-label="สลับโหมดมืด/สว่าง"
          >
            {isDarkMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Bag icon */}
          <button
            type="button"
            id="cart-button"
            className="apple-nav__icon"
            onClick={onOpenCart}
            aria-label={`ถุงสินค้า (${cartCount || 0})`}
          >
            <svg width="15" height="17" viewBox="0 0 15 17" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M1.5 5.5h12l-.8 10H2.3z" strokeLinejoin="round" />
              <path d="M4.8 5.5V4a2.7 2.7 0 0 1 5.4 0v1.5" />
            </svg>
            {cartCount > 0 && <span className="apple-nav__badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
    
    <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={(userData) => setUser(userData)}
    />
    </>
  );
}
