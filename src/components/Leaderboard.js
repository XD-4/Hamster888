'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Leaderboard({ coins, coinsPerHour, level, username, setUsername }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [tableExists, setTableExists] = useState(true);

  const defaultMock = [
    { username: 'GoldenHamster888', coins: 888888, coins_per_hour: 50000, level: 10 },
    { username: 'CryptoCheeks', coins: 450000, coins_per_hour: 25000, level: 8 },
    { username: 'SunflowerKing', coins: 210000, coins_per_hour: 12000, level: 6 },
    { username: 'CyberMochi', coins: 95000, coins_per_hour: 5500, level: 4 },
  ];

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('hamster_players')
        .select('*')
        .order('coins', { ascending: false })
        .limit(10);

      if (error) {
        // Table might not be created in Supabase yet
        setTableExists(false);
        setPlayers(defaultMock);
      } else if (data && data.length > 0) {
        setTableExists(true);
        setPlayers(data);
      } else {
        setTableExists(true);
        setPlayers(defaultMock);
      }
    } catch (err) {
      setTableExists(false);
      setPlayers(defaultMock);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setSubmitting(true);
    setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('hamster_players')
        .upsert(
          {
            username: username.trim(),
            coins: coins,
            coins_per_hour: coinsPerHour,
            level: level,
            last_active: new Date().toISOString(),
          },
          { onConflict: 'username' }
        );

      if (error) {
        setMessage('⚠️ ยังไม่ได้สร้างตารางใน Supabase: ' + error.message);
      } else {
        setMessage('✅ อัปเดตอันดับขึ้น Supabase สำเร็จแล้ว!');
        fetchLeaderboard();
      }
    } catch (err) {
      setMessage('⚠️ ข้อผิดพลาด: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: '8px' }}>
          🏆 ตารางจัดอันดับ HAMSTER 888 (Leaderboard)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          ข้อมูลซิงก์เรียลไทม์ผ่านตาราง <code style={{ color: '#fbbf24' }}>hamster_players</code> ในฐานข้อมูล Supabase
        </p>
      </div>

      {/* Submit / Link Nickname Card */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
          📝 ลงทะเบียนคะแนนของคุณบน Cloud
        </h3>
        <form onSubmit={handleSubmitScore} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ตั้งชื่อผู้เล่นของคุณ (เช่น HamsterPro88)"
            style={{
              flex: '1',
              minWidth: '220px',
              padding: '12px 18px',
              borderRadius: '12px',
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold"
            style={{ padding: '12px 24px' }}
          >
            {submitting ? 'กำลังส่ง...' : '🚀 อัปเดตคะแนนขึ้น Cloud'}
          </button>
        </form>
        {message && (
          <div style={{ marginTop: '12px', fontSize: '0.85rem', color: message.includes('✅') ? '#34d399' : '#fbbf24' }}>
            {message}
          </div>
        )}
      </div>

      {/* SQL Setup Notice if table doesn't exist */}
      {!tableExists && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', border: '1px solid rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.08)' }}>
          <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '6px' }}>
            💡 คำแนะนำ: ต้องการบันทึกข้อมูลจริงลงตารางใน Supabase หรือไม่?
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            เราได้เตรียมไฟล์คำสั่ง SQL ไว้ให้ที่ <strong><code>supabase/schema.sql</code></strong> คุณสามารถนำไปกด Run ในเมนู <strong>SQL Editor</strong> บน Supabase Dashboard ได้ทันทีครับ
          </p>
        </div>
      )}

      {/* Rankings List */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>TOP 10 มหาเศรษฐีแฮมสเตอร์</span>
          <button onClick={fetchLeaderboard} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            🔄 รีเฟรช
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
            กำลังดึงข้อมูลอันดับ...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {players.map((p, idx) => {
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div
                  key={p.username || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: idx < 3 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
                    border: idx < 3 ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ fontSize: '1.3rem', width: '28px', textAlign: 'center', fontWeight: 900, color: idx < 3 ? '#fbbf24' : 'var(--text-dim)' }}>
                      {medals[idx] || `#${idx + 1}`}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {p.username}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Lv.{p.level || 1} &bull; +{(p.coins_per_hour || 0).toLocaleString()} PPH
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fbbf24' }}>
                      🪙 {(p.coins || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
