'use client';

import { useState } from 'react';
import { sound } from '@/lib/sound';

export default function LuckyWheel({ coins, setCoins, energy, setEnergy, maxEnergy }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeResult, setPrizeResult] = useState(null);
  const [freeSpins, setFreeSpins] = useState(3);

  const segments = [
    { label: '888 เหรียญ', value: 888, type: 'coins', color: '#f59e0b', textcolor: 'var(--text-primary)' },
    { label: '1,888 เหรียญ', value: 1888, type: 'coins', color: '#3b82f6', textColor: '#fff' },
    { label: '+500 พลังงาน', value: 500, type: 'energy', color: '#10b981', textColor: '#fff' },
    { label: '8,888 เหรียญ!', value: 8888, type: 'coins', color: '#ec4899', textColor: '#fff' },
    { label: '500 เหรียญ', value: 500, type: 'coins', color: '#6366f1', textColor: '#fff' },
    { label: '2,888 เหรียญ', value: 2888, type: 'coins', color: '#8b5cf6', textColor: '#fff' },
    { label: '👑 88,888 JACKPOT', value: 88888, type: 'jackpot', color: '#fbbf24', textcolor: 'var(--text-primary)' },
    { label: '🔋 ฟื้นฟูเต็ม 100%', value: 'full', type: 'energy_full', color: '#06b6d4', textcolor: 'var(--text-primary)' },
  ];

  const spinCost = 1000;

  const handleSpin = () => {
    if (spinning) return;
    if (freeSpins <= 0 && coins < spinCost) return;

    if (freeSpins > 0) {
      setFreeSpins((prev) => prev - 1);
    } else {
      setCoins((prev) => prev - spinCost);
    }

    setSpinning(true);
    setPrizeResult(null);

    // Pick random segment
    const targetIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    // 5 to 8 full rotations + target angle offset
    const randomRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    const finalAngle = randomRotations + (360 - targetIndex * segmentAngle - segmentAngle / 2);

    const newTotalRotation = rotation + finalAngle;
    setRotation(newTotalRotation);

    // Play ticking sounds during spin
    const interval = setInterval(() => {
      sound.playWheelTick();
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      const wonPrize = segments[targetIndex];
      setPrizeResult(wonPrize);

      if (wonPrize.type === 'jackpot') {
        sound.playJackpot();
        setCoins((prev) => prev + wonPrize.value);
      } else if (wonPrize.type === 'coins') {
        sound.playCoin();
        setCoins((prev) => prev + wonPrize.value);
      } else if (wonPrize.type === 'energy') {
        sound.playUpgrade();
        setEnergy((prev) => Math.min(maxEnergy, prev + wonPrize.value));
      } else if (wonPrize.type === 'energy_full') {
        sound.playUpgrade();
        setEnergy(maxEnergy);
      }
    }, 4500);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          🎰 วงล้อนำโชค HAMSTER 888
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          หมุนรับรางวัลใหญ่ โบนัสเหรียญ และแจ็กพอตสูงสุด 88,888 เหรียญ!
        </p>
      </div>

      {/* Spin Ticket / Cost Indicator */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '8px 24px', borderRadius: '30px', marginBottom: '32px' }}>
        <span style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>
          🎟️ สิทธิ์หมุนฟรี: {freeSpins} ครั้ง
        </span>
        <span style={{ color: 'var(--text-dim)' }}>|</span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ค่าหมุนปกติ: 🪙 {spinCost.toLocaleString()}
        </span>
      </div>

      {/* Wheel Container */}
      <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto 36px' }}>
        
        {/* Pointer Arrow */}
        <div style={{
          position: 'absolute',
          top: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '16px solid transparent',
          borderRight: '16px solid transparent',
          borderTop: '28px solid #ef4444',
          zIndex: 10,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))'
        }} />

        {/* The Wheel */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '8px solid #d97706',
            boxShadow: '0 0 35px rgba(245, 158, 11, 0.4), inset 0 0 20px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden',
            transition: spinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            transform: `rotate(${rotation}deg)`
          }}
        >
          {segments.map((seg, i) => {
            const angle = (360 / segments.length) * i;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  width: '50%',
                  height: '50%',
                  transformOrigin: '0% 100%',
                  transform: `rotate(${angle}deg) skewY(${90 - 360 / segments.length}deg)`,
                  background: seg.color,
                  border: '1px solid rgba(0,0,0,0.15)',
                }}
              />
            );
          })}

          {/* Center Hub */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '4px solid #fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            boxShadow: '0 0 20px rgba(0,0,0,0.8)',
            zIndex: 5
          }}>
            🐹
          </div>
        </div>

      </div>

      {/* Prize Announcement */}
      {prizeResult && (
        <div className="glass-panel" style={{
          padding: '20px',
          marginBottom: '28px',
          background: prizeResult.type === 'jackpot' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.2)',
          border: prizeResult.type === 'jackpot' ? '2px solid #fbbf24' : '1px solid #10b981',
          animation: 'hamsterAura 2s infinite'
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: prizeResult.type === 'jackpot' ? '#fbbf24' : '#34d399' }}>
            🎉 คุณได้รับ: {prizeResult.label}!
          </div>
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={spinning || (freeSpins <= 0 && coins < spinCost)}
        className="btn-gold"
        style={{ padding: '16px 48px', fontSize: '1.25rem', minWidth: '240px' }}
        id="spin-wheel-button"
      >
        {spinning ? 'กำลังหมุนวงล้อ...' : freeSpins > 0 ? `หมุนฟรี (${freeSpins})` : `หมุนเลย (🪙 ${spinCost.toLocaleString()})`}
      </button>

    </div>
  );
}
