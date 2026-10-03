'use client';

export default function Navbar({ activeTab, setActiveTab, soundEnabled, setSoundEnabled, supabaseStatus }) {
  const tabs = [
    { id: 'mine', label: 'ขุดเหรียญ', icon: '🐹' },
    { id: 'market', label: 'อัปเกรด', icon: '⚡' },
    { id: 'lucky', label: 'วงล้อ 888', icon: '🎰' },
    { id: 'leaderboard', label: 'อันดับผู้เล่น', icon: '🏆' },
    { id: 'guide', label: 'Supabase API', icon: '🔑' },
  ];

  return (
    <nav className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      marginBottom: '28px',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #fbbf24, #b45309)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)'
        }}>
          🐹
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fbbf24' }}>
              HAMSTER 888
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span className={`pulse-dot ${supabaseStatus === 'success' ? 'online' : 'pending'}`} style={{ width: '7px', height: '7px' }}></span>
            <span>{supabaseStatus === 'success' ? 'Supabase Connected' : 'Checking Cloud...'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '16px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            id={`nav-tab-${tab.id}`}
          >
            <span style={{ fontSize: '1.15rem' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="btn-outline"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          title={soundEnabled ? 'ปิดเสียง' : 'เปิดเสียง'}
          id="sound-toggle-btn"
        >
          {soundEnabled ? '🔊 เสียงเปิด' : '🔇 เสียงปิด'}
        </button>
      </div>
    </nav>
  );
}
