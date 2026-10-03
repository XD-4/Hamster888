'use client';

import { useState, useEffect, useRef } from 'react';
import { getProductImage } from '@/data/productImages';

// Map category to SVG icon
const CATEGORY_ICONS = {
  mcu: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="55" width="90" height="90" rx="14" stroke="#2997ff" strokeWidth="3" fill="rgba(0,113,227,0.06)"/>
      <rect x="75" y="75" width="50" height="50" rx="8" fill="rgba(0,113,227,0.15)" stroke="#2997ff" strokeWidth="2"/>
      <line x1="55" y1="80" x2="30" y2="80" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="55" y1="100" x2="30" y2="100" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="55" y1="120" x2="30" y2="120" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="145" y1="80" x2="170" y2="80" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="145" y1="100" x2="170" y2="100" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="145" y1="120" x2="170" y2="120" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="80" y1="55" x2="80" y2="30" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="100" y1="55" x2="100" y2="30" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="120" y1="55" x2="120" y2="30" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="80" y1="145" x2="80" y2="170" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="100" y1="145" x2="100" y2="170" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="120" y1="145" x2="120" y2="170" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="100" cy="100" r="12" fill="#2997ff" opacity="0.8"/>
    </svg>
  ),
  sensor: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="25" fill="rgba(48,209,88,0.2)" stroke="#30d158" strokeWidth="2.5"/>
      <circle cx="100" cy="100" r="8" fill="#30d158"/>
      <path d="M 70 100 A 30 30 0 0 1 130 100" stroke="#30d158" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M 55 100 A 45 45 0 0 1 145 100" stroke="#30d158" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M 40 100 A 60 60 0 0 1 160 100" stroke="#30d158" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3"/>
      <line x1="100" y1="30" x2="100" y2="50" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="62" y1="42" x2="70" y2="58" stroke="#30d158" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="138" y1="42" x2="130" y2="58" stroke="#30d158" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  wireless: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="135" r="8" fill="#bf5af2"/>
      <path d="M 76 111 A 34 34 0 0 1 124 111" stroke="#bf5af2" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 58 93 A 59 59 0 0 1 142 93" stroke="#bf5af2" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M 40 75 A 84 84 0 0 1 160 75" stroke="#bf5af2" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
      <line x1="100" y1="143" x2="100" y2="175" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  power: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="50" width="80" height="110" rx="10" stroke="#ff9f0a" strokeWidth="2.5" fill="rgba(255,159,10,0.06)"/>
      <rect x="80" y="40" width="40" height="14" rx="4" fill="#ff9f0a" opacity="0.7"/>
      <path d="M 108 90 L 90 115 H 102 L 92 140 L 116 108 H 102 Z" fill="#ff9f0a"/>
    </svg>
  ),
  robotics: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="65" y="80" width="70" height="70" rx="12" stroke="#ff375f" strokeWidth="2.5" fill="rgba(255,55,95,0.06)"/>
      <rect x="80" y="55" width="40" height="28" rx="8" stroke="#ff375f" strokeWidth="2" fill="rgba(255,55,95,0.1)"/>
      <circle cx="88" cy="95" r="7" fill="#ff375f" opacity="0.85"/>
      <circle cx="112" cy="95" r="7" fill="#ff375f" opacity="0.85"/>
      <path d="M 88 115 Q 100 125 112 115" stroke="#ff375f" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="100" y1="55" x2="100" y2="40" stroke="#ff375f" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="100" cy="36" r="5" fill="#ff375f" opacity="0.6"/>
      <line x1="65" y1="110" x2="45" y2="110" stroke="#ff375f" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="135" y1="110" x2="155" y2="110" stroke="#ff375f" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
};

function getProductVisual(product) {
  return CATEGORY_ICONS[product.category] || CATEGORY_ICONS['mcu'];
}

function getAccentColor(category) {
  const map = { mcu: '#0071e3', sensor: '#30d158', wireless: '#bf5af2', power: '#ff9f0a', robotics: '#ff375f' };
  return map[category] || '#0071e3';
}

function getGlowColor(category) {
  const map = { mcu: 'rgba(0,113,227,0.18)', sensor: 'rgba(48,209,88,0.15)', wireless: 'rgba(191,90,242,0.15)', power: 'rgba(255,159,10,0.15)', robotics: 'rgba(255,55,95,0.15)' };
  return map[category] || 'rgba(0,113,227,0.18)';
}

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('esp32');
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    setQty(1);
    setAdded(false);
    setScrolled(false);
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  const handleScroll = (e) => {
    setScrolled(e.target.scrollTop > 60);
  };

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => { setAdded(false); }, 2000); // Show success state for 2s, but don't auto-close
  };

  if (!product) return null;

  const accent = getAccentColor(product.category);
  const glow = getGlowColor(product.category);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPct = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        ref={overlayRef}
        onScroll={handleScroll}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          overflow: 'hidden auto',
          animation: 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.18)',
          border: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="ปิด"
          style={{
            position: 'sticky', top: 16, left: '100%', zIndex: 20,
            display: 'block', marginLeft: 'auto', marginRight: 16,
            width: 34, height: 34,
            background: 'rgba(0,0,0,0.12)',
            backdropFilter: 'blur(12px)',
            border: 'none', borderRadius: '50%',
            color: 'var(--text-primary)', fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.12)'}
        >
          ✕
        </button>

        {/* ── HERO SECTION ── */}
        <div style={{ position: 'relative', width: '100%', minHeight: '400px', overflow: 'hidden', marginTop: '-34px', flexShrink: 0 }}>
          {/* BG Gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 80% 70% at 50% 30%, ${glow} 0%, transparent 65%), #f5f5f7`,
          }} />

          {/* Glow orb */}
          <div style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -55%)',
            animation: 'pdpGlowPulse 4s ease-in-out infinite',
            pointerEvents: 'none',
          }} />

          {/* Product visual — realistic render if available, else SVG icon */}
          {getProductImage(product.id) ? (
            <div style={{
              position: 'absolute',
              top: '46%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(340px, 62%)',
              aspectRatio: '1 / 1',
              animation: 'pdpFloat 6s ease-in-out infinite',
              pointerEvents: 'none',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getProductImage(product.id)}
                alt={product.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  borderRadius: 28,
                  boxShadow: `0 30px 80px -20px ${accent}66, 0 12px 30px rgba(0,0,0,0.25)`,
                }}
              />
            </div>
          ) : (
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(260px, 55%)',
              height: 'min(260px, 55%)',
              animation: 'pdpFloat 6s ease-in-out infinite',
              filter: `drop-shadow(0 0 40px ${accent}44)`,
              pointerEvents: 'none',
            }}>
              {getProductVisual(product)}
            </div>
          )}

          {/* Badge top-left */}
          {product.badge && (
            <div style={{ position: 'absolute', top: 52, left: 24 }}>
              <span className={`badge-${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Hero text overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 28px 28px',
            background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.7) 50%, transparent 100%)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: accent, marginBottom: 8,
            }}>
              {product.chip}
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.6rem)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 1.08, color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
            }}>
              {product.name}
            </h2>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: '0 28px 0', flex: 1 }}>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', margin: '24px 0 20px' }}>
            <span style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              ฿{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.05rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
            {savings > 0 && (
              <span style={{
                fontSize: '0.78rem', fontWeight: 700,
                background: 'rgba(48,209,88,0.12)', color: '#30d158',
                padding: '3px 10px', borderRadius: 6,
                border: '1px solid rgba(48,209,88,0.22)',
              }}>
                ประหยัด {savingsPct}%
              </span>
            )}
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              color: '#30d158', marginLeft: 'auto',
            }}>
              ✓ รวม VAT 7% แล้ว
            </span>
          </div>

          {/* Highlight Banner */}
          <div style={{
            background: `linear-gradient(135deg, ${accent}14, ${accent}06)`,
            border: `1px solid ${accent}30`,
            borderRadius: 14, padding: '14px 18px',
            color: accent === '#0071e3' ? '#0066cc' : accent,
            fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.6,
            marginBottom: 28, display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ flexShrink: 0, marginTop: 1 }}>✦</span>
            <span>{product.highlight}</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
            {product.description}
          </p>

          {/* Specs */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 12 }}>
              Technical Specifications
            </div>
            <div style={{ display: 'grid', gap: 1, background: 'rgba(0,0,0,0.05)', borderRadius: 14, overflow: 'hidden' }}>
              {product.specs.map((spec, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 18px', background: '#f5f5f7',
                  transition: 'background 0.2s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ededf0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f5f5f7'}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{spec.label}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
            <div style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 14, padding: '18px 18px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>คลังสินค้า</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: product.stock > 20 ? '#30d158' : '#ff9f0a', letterSpacing: '-0.02em' }}>{product.stock}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: 2 }}>ชิ้นพร้อมส่ง</div>
            </div>
            {product.rating && (
              <div style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 14, padding: '18px 18px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>คะแนน</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff9f0a', letterSpacing: '-0.02em' }}>{product.rating} ★</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{product.reviewsCount} รีวิว</div>
              </div>
            )}
          </div>

          {/* Spacer for sticky bar */}
          <div style={{ height: 40 }} />

          {/* ── CODE EXAMPLES ── */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 16 }}>
              Code Examples & Setup
            </div>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
              
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
                <button
                  onClick={() => setActiveCodeTab('esp32')}
                  style={{
                    flex: 1, padding: '12px 0', border: 'none', background: activeCodeTab === 'esp32' ? 'var(--bg-elevated)' : 'transparent',
                    color: activeCodeTab === 'esp32' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: activeCodeTab === 'esp32' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer',
                    borderBottom: activeCodeTab === 'esp32' ? `2px solid ${accent}` : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ESP32 (C++)
                </button>
                <button
                  onClick={() => setActiveCodeTab('arduino')}
                  style={{
                    flex: 1, padding: '12px 0', border: 'none', background: activeCodeTab === 'arduino' ? 'var(--bg-elevated)' : 'transparent',
                    color: activeCodeTab === 'arduino' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: activeCodeTab === 'arduino' ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer',
                    borderBottom: activeCodeTab === 'arduino' ? `2px solid ${accent}` : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Arduino (C++)
                </button>
              </div>

              {/* Code Editor Mockup */}
              <div style={{ padding: '20px', background: '#1e1e1e', overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#d4d4d4', lineHeight: 1.6 }}>
                  {activeCodeTab === 'esp32' ? (
`#include <WiFi.h>
// Setup for ${product.name} on ESP32

void setup() {
  Serial.begin(115200);
  Serial.println("Initializing ${product.name}...");
  // Connect pins according to ESP32 pinout
  // SDA -> GPIO 21, SCL -> GPIO 22
}

void loop() {
  // Read sensor data or control logic
  delay(1000);
}`
                  ) : (
`#include <Wire.h>
// Setup for ${product.name} on Arduino Uno/Mega

void setup() {
  Serial.begin(9600);
  Serial.println("Initializing ${product.name}...");
  // Connect pins to I2C (A4, A5 on Uno)
  Wire.begin();
}

void loop() {
  // Simple loop execution
  delay(1000);
}`
                  )}
                </pre>
              </div>
            </div>
          </div>

          <div style={{ height: 100 }} />
        </div>

        {/* ── STICKY BUY BAR ── */}
        <div style={{
          position: 'sticky', bottom: 0, left: 0, right: 0,
          padding: '14px 28px',
          background: 'rgba(8,8,8,0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 14, flexWrap: 'wrap',
          zIndex: 10,
        }}>
          {/* Price mini */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 2 }}>รวม {qty} ชิ้น</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              ฿{(product.price * qty).toLocaleString()}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Qty Stepper */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(0,0,0,0.08)',
              borderRadius: 'var(--r-pill)', padding: '3px',
            }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ width: 36, height: 36, border: 'none', background: 'transparent', color: 'var(--text-primary)', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >−</button>
              <span style={{ width: 38, textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                style={{ width: 36, height: 36, border: 'none', background: 'transparent', color: 'var(--text-primary)', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >+</button>
            </div>

            {/* Add to cart CTA */}
            <button
              onClick={handleAdd}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: added ? '#30d158' : accent,
                color: '#fff',
                border: 'none', borderRadius: 'var(--r-pill)',
                padding: '13px 28px',
                fontSize: '1rem', fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: added ? '0 4px 20px rgba(48,209,88,0.4)' : `0 4px 20px ${accent}44`,
                minWidth: 180,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { if (!added) e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {added ? (
                <>✓ เพิ่มใส่ตะกร้าแล้ว!</>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  หยิบใส่ตะกร้า ({qty})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
