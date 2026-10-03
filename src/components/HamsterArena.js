'use client';

import { useState } from 'react';
import { sound } from '@/lib/sound';

export default function HamsterArena({
  coins,
  setCoins,
  energy,
  setEnergy,
  maxEnergy,
  coinsPerHour,
  multitap,
  level,
  onSyncCloud,
  syncing,
  cloudMessage,
}) {
  const [particles, setParticles] = useState([]);
  const [tapScale, setTapScale] = useState(1);

  const levels = [
    { lvl: 1, title: 'Bronze Hamster', minCoins: 0, maxCoins: 5000 },
    { lvl: 2, title: 'Silver Digger', minCoins: 5000, maxCoins: 25000 },
    { lvl: 3, title: 'Gold Miner', minCoins: 25000, maxCoins: 100000 },
    { lvl: 4, title: 'Diamond CEO', minCoins: 100000, maxCoins: 500000 },
    { lvl: 5, title: 'Lord of 888', minCoins: 500000, maxCoins: 2000000 },
  ];

  const currentLevelInfo = levels.find((l) => l.lvl === level) || levels[levels.length - 1];
  const progressPercent = Math.min(100, Math.max(0, ((coins - currentLevelInfo.minCoins) / (currentLevelInfo.maxCoins - currentLevelInfo.minCoins)) * 100));

  const handleTap = (e) => {
    if (energy < multitap) return;

    sound.playCoin();
    setCoins((prev) => prev + multitap);
    setEnergy((prev) => Math.max(0, prev - multitap));

    // Particle effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

    const id = Date.now() + Math.random();
    setParticles((prev) => [...prev, { id, x, y, text: `+${multitap}` }]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 800);

    setTapScale(0.92);
    setTimeout(() => setTapScale(1), 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      
      {/* Top Stats Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', width: '100%', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ขุดได้ต่อชั่วโมง (PPH)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
            <span>⚡</span> +{coinsPerHour.toLocaleString()}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>พลังคลิก (Tap Boost)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
            <span>👆</span> +{multitap} / คลิก
          </div>
        </div>
      </div>

      {/* Main Coin Display */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ยอดเหรียญสะสม
        </div>
        <div style={{
          fontSize: '3.4rem',
          fontWeight: 900,
          background: 'linear-gradient(to bottom, #fff, #fbbf24 60%, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
          margin: '4px 0 8px',
          textShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
        }}>
          {coins.toLocaleString()}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600 }}>
          <span>👑 Lv.{level} {currentLevelInfo.title}</span>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div style={{ width: '100%', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '6px' }}>
          <span>ความก้าวหน้าสู่เลเวลถัดไป</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            borderRadius: '6px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Interactive Hamster Tap Arena */}
      <div style={{ position: 'relative', margin: '10px 0 30px', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleTap}
          className="hamster-tap-target"
          style={{ transform: `scale(${tapScale})` }}
          id="hamster-tap-button"
          aria-label="คลิกเพื่อขุดเหรียญ Hamster"
        >
          {/* Animated 3D-feeling Mascot SVG & Emoji */}
          <div style={{
            fontSize: '110px',
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            🐹
          </div>

          {/* Golden Badge overlay on Hamster */}
          <div style={{
            position: 'absolute',
            bottom: '15px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '2px solid #fbbf24',
            borderRadius: '9999px',
            padding: '4px 12px',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#fbbf24',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}>
            888 VIP
          </div>
        </button>

        {/* Floating Tap Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="floating-text"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Energy Bar */}
      <div className="glass-panel" style={{ width: '100%', padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>⚡ พลังงานขุด (Energy)</span>
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: energy < 50 ? '#ef4444' : '#fbbf24' }}>
            {energy} / {maxEnergy}
          </div>
        </div>
        <div style={{ width: '100%', height: '12px', background: '#0b1120', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            width: `${(energy / maxEnergy) * 100}%`,
            height: '100%',
            background: energy < 100 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            borderRadius: '8px',
            transition: 'width 0.2s ease'
          }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px' }}>
          * ฟื้นฟูอัตโนมัติ +3 หน่วยต่อวินาที
        </div>
      </div>

      {/* Cloud Sync Status */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {cloudMessage && (
          <div style={{
            padding: '10px 16px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            textAlign: 'center',
            background: cloudMessage.includes('สำเร็จ') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: cloudMessage.includes('สำเร็จ') ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            color: cloudMessage.includes('สำเร็จ') ? '#34d399' : '#fbbf24'
          }}>
            {cloudMessage}
          </div>
        )}
        <button
          onClick={onSyncCloud}
          disabled={syncing}
          className="btn-gold"
          style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          id="sync-cloud-btn"
        >
          {syncing ? '⏳ กำลังบันทึกลง Supabase...' : '☁️ บันทึกสถิติไปที่ Supabase Cloud'}
        </button>
      </div>

    </div>
  );
}
