'use client';

import { useState } from 'react';

export default function SupabaseGuide({ supabaseStatus, checkConnection }) {
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlCode = `-- SQL สำหรับสร้างตาราง hamster_players ใน Supabase
create table if not exists public.hamster_players (
  id uuid default gen_random_uuid() primary key,
  username text not null unique,
  coins bigint default 888,
  coins_per_hour integer default 0,
  level integer default 1,
  energy integer default 1000,
  max_energy integer default 1000,
  last_active timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.hamster_players enable row level security;

create policy "Allow public access" 
  on public.hamster_players 
  for all 
  using (true) 
  with check (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: '8px' }}>
          🔑 สถานะและการจัดการ Supabase API
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          ระบบพร้อมเชื่อมต่อกับฐานข้อมูล Cloud ของคุณ
        </p>
      </div>

      {/* Connection Card */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={`pulse-dot ${supabaseStatus === 'success' ? 'online' : 'pending'}`}></span>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {supabaseStatus === 'success' ? '✅ เชื่อมต่อ Supabase API สำเร็จ (Online)' : 'กำลังตรวจสอบการเชื่อมต่อ...'}
            </span>
          </div>
          <button onClick={checkConnection} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            🔄 ตรวจสอบอีกครั้ง
          </button>
        </div>

        <div style={{ background: 'var(--bg-elevated)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.9rem' }}>
          <div style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>Project URL ที่เชื่อมต่อ:</div>
          <code style={{ color: '#38bdf8' }}>https://sxvbdquxjsqugoaysbdj.supabase.co</code>
        </div>
      </div>

      {/* Database Setup Guide */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fbbf24' }}>
            ⚡ สร้างตารางในฐานข้อมูล (Supabase SQL Editor)
          </h3>
          <button onClick={copySql} className="btn-gold" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            {copiedSql ? '✓ คัดลอกแล้ว!' : '📋 คัดลอก SQL'}
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          คัดลอกโค้ด SQL ด้านล่างนี้ ไปวางในเมนู <strong>SQL Editor</strong> ที่แดชบอร์ด Supabase ของคุณแล้วกด <strong>Run</strong> เพื่อเปิดใช้งานระบบ Leaderboard และจัดเก็บข้อมูลผู้เล่นจริง:
        </p>

        <div className="code-box">
          <pre>{sqlCode}</pre>
        </div>
      </div>
    </div>
  );
}
