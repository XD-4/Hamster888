'use client';

import { sound } from '@/lib/sound';

export default function UpgradeMarket({
  coins,
  setCoins,
  coinsPerHour,
  setCoinsPerHour,
  multitap,
  setMultitap,
  maxEnergy,
  setMaxEnergy,
  upgrades,
  setUpgrades
}) {
  const handleBuyCard = (card) => {
    if (coins < card.cost) return;

    sound.playUpgrade();
    setCoins((prev) => prev - card.cost);
    setCoinsPerHour((prev) => prev + card.pphGain);

    setUpgrades((prev) =>
      prev.map((item) =>
        item.id === card.id
          ? {
              ...item,
              level: item.level + 1,
              cost: Math.round(item.cost * 1.6),
              totalPph: item.totalPph + item.pphGain,
            }
          : item
      )
    );
  };

  const handleBuyMultitap = () => {
    const cost = multitap * 500;
    if (coins < cost) return;

    sound.playUpgrade();
    setCoins((prev) => prev - cost);
    setMultitap((prev) => prev + 1);
  };

  const handleBuyEnergy = () => {
    const cost = Math.round((maxEnergy / 1000) * 1200);
    if (coins < cost) return;

    sound.playUpgrade();
    setCoins((prev) => prev - cost);
    setMaxEnergy((prev) => prev + 500);
  };

  const multitapCost = multitap * 500;
  const energyCost = Math.round((maxEnergy / 1000) * 1200);

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: '8px' }}>
          ⚡ ตลาดอัปเกรด & ขุดอัตโนมัติ
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          อัปเกรดการ์ดเพื่อเพิ่มเหรียญที่ขุดได้ต่อชั่วโมง (Profit Per Hour) แม้ขณะที่คุณไม่ได้คลิก!
        </p>
      </div>

      {/* Boosters Section */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🚀 บูสเตอร์พลังคลิกและพลังงาน
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        
        {/* Multitap */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              👆
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>มัลติแท็ป (Multitap)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+1 เหรียญต่อคลิก (ปัจจุบัน: +{multitap})</div>
              <div style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700, marginTop: '4px' }}>
                🪙 {multitapCost.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            onClick={handleBuyMultitap}
            disabled={coins < multitapCost}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            อัปเกรด
          </button>
        </div>

        {/* Max Energy */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              🔋
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>ถังพลังงาน (Energy Tank)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+500 ความจุ (ปัจจุบัน: {maxEnergy})</div>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700, marginTop: '4px' }}>
                🪙 {energyCost.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            onClick={handleBuyEnergy}
            disabled={coins < energyCost}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            อัปเกรด
          </button>
        </div>

      </div>

      {/* Mining Tech Cards Grid */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ⛏️ การ์ดเทคโนโลยีขุดเหมือง (Mining Tech Cards)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
        {upgrades.map((card) => {
          const canAfford = coins >= card.cost;
          return (
            <div
              key={card.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: card.bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                  }}>
                    {card.icon}
                  </div>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Lv.{card.level}
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {card.description}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px 12px', borderRadius: '10px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                    <span>ขุดเพิ่มขึ้น:</span>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>+{card.pphGain.toLocaleString()} / ชม.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    <span>สร้างรายได้แล้ว:</span>
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>{card.totalPph.toLocaleString()} / ชม.</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleBuyCard(card)}
                  disabled={!canAfford}
                  className="btn-gold"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <span>🪙 {card.cost.toLocaleString()}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>&bull; ซื้อการ์ด</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
