'use client';

import { useState } from 'react';
import { sound } from '@/lib/sound';

export default function AppleDeviceShowcase({ onAddToCart }) {
  const [activeFeature, setActiveFeature] = useState('color');
  const [selectedColor, setSelectedColor] = useState('titanium-desert');

  const colors = [
    { id: 'titanium-desert', name: 'Desert Titanium', hex: '#634b46', border: '#8b6962', glow: 'rgba(139, 105, 98, 0.4)' },
    { id: 'titanium-black', name: 'Space Black', hex: '#202022', border: '#3a3a3e', glow: 'rgba(60, 60, 65, 0.4)' },
    { id: 'titanium-white', name: 'White Titanium', hex: '#e3e4e6', border: '#ffffff', glow: 'rgba(255, 255, 255, 0.3)' },
    { id: 'titanium-natural', name: 'Natural Titanium', hex: '#9a958e', border: '#bfbbb5', glow: 'rgba(191, 187, 181, 0.35)' },
  ];

  const currentColor = colors.find((c) => c.id === selectedColor) || colors[0];

  const features = [
    {
      id: 'color',
      type: 'color_picker',
      label: 'สีไทเทเนียม',
      title: 'ไทเทเนียมเกรด 5 แข็งแกร่งและเบาอย่างเหลือเชื่อ',
      description: 'พื้นผิวขัดเงาแบบ Micro-blasted พร้อมขอบโค้งมนที่จับสบายมือที่สุด',
    },
    {
      id: 'sizes',
      label: 'สองขนาดหน้าจอ',
      title: 'จอภาพ Super Retina XDR ขนาด 6.3 นิ้ว และ 6.9 นิ้ว',
      description: 'ขอบจอบางลงยิ่งขึ้น พร้อมเทคโนโลยี ProMotion 120Hz แบบ Always-On Display',
    },
    {
      id: 'camera',
      label: 'กล้องหลัก Fusion 48MP',
      title: 'เซนเซอร์ Quad-Pixel เร็วขึ้น 2 เท่า',
      description: 'บันทึกวิดีโอ 4K 120 fps ในแบบ Dolby Vision และเลนส์ Ultra Wide 48MP เก็บรายละเอียดระดับมาโคร',
    },
    {
      id: 'island',
      label: 'Dynamic Island ที่ออกแบบใหม่',
      title: 'การแจ้งเตือนและกิจกรรมสดที่กลมกลืนเป็นหนึ่งเดียว',
      description: 'แสดงสถานะการสั่งซื้อ พัสดุที่กำลังจัดส่ง และเครื่องเล่นเพลงแบบเรียลไทม์',
    },
    {
      id: 'durability',
      label: 'ความทนทาน Ceramic Shield',
      title: 'กระจกด้านหน้าที่แข็งแกร่งกว่ากระจกสมาร์ตโฟนทั่วไป',
      description: 'ทนน้ำและฝุ่นที่ระดับ IP68 พร้อมโครงสร้างระบายความร้อนกราไฟต์รีไซเคิล 100%',
    },
    {
      id: 'control',
      label: 'ตัวควบคุมกล้อง (Camera Control)',
      title: 'เข้าถึงเครื่องมือถ่ายภาพได้รวดเร็วเพียงปลายนิ้ว',
      description: 'สวิตช์สัมผัสคาปาซิทีฟพร้อมเซนเซอร์วัดแรงกด และแฮปติกตอบสนองอย่างเป็นธรรมชาติ',
    },
    {
      id: 'action',
      label: 'ปุ่มแอ็คชั่น (Action Button)',
      title: 'ทางลัดสู่ฟังก์ชันโปรดของคุณในพริบตา',
      description: 'เปิดกล้อง บันทึกเสียง แปลภาษา หรือเชื่อมต่ออุปกรณ์ IoT ในบ้านได้ด้วยการกดค้าง',
    },
  ];

  const currentFeatureInfo = features.find((f) => f.id === activeFeature) || features[0];

  const handleSelectFeature = (id) => {
    sound.playUpgrade();
    setActiveFeature(id);
  };

  const handleSelectColor = (colorId, e) => {
    e.stopPropagation();
    sound.playCoin();
    setSelectedColor(colorId);
    setActiveFeature('color');
  };

  return (
    <section style={{ background: '#000000', color: '#fff', padding: '0 0 100px', position: 'relative' }}>
      
      {/* Apple Sub-Navbar */}
      <div style={{
        position: 'sticky',
        top: '64px',
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 24px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
              iPhone 18 Pro
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--apple-text-secondary)' }}>
              Pro. Beyond.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => setActiveFeature('camera')}
              className="btn-apple-secondary"
              style={{ padding: '6px 16px', fontSize: '0.82rem' }}
            >
              ดูข้อมูล
            </button>
            <button
              onClick={() => {
                sound.playCoin();
                if (onAddToCart) {
                  onAddToCart({
                    id: 'iphone-18-pro',
                    name: `iPhone 18 Pro (${currentColor.name})`,
                    category: 'flagship',
                    price: 43900,
                    chip: 'A19 Pro 2nm Silicon',
                    qty: 1,
                  });
                }
              }}
              className="btn-apple-primary"
              style={{ padding: '6px 18px', fontSize: '0.82rem' }}
            >
              ซื้อ
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div style={{
        maxWidth: '1240px',
        margin: '50px auto 0',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 440px) 1fr',
        gap: '40px',
        alignItems: 'center',
        minHeight: '620px',
      }}>
        
        {/* Left Side: Interactive Hotspot Pill Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((item) => {
            const isActive = activeFeature === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleSelectFeature(item.id)}
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.06)',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '980px',
                    padding: item.id === 'color' ? '6px 18px 6px 12px' : '10px 22px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: isActive ? '#ffffff' : '#a1a1a6',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
                  }}
                >
                  {/* Plus Icon or Color Swatches */}
                  {item.id === 'color' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: currentColor.hex,
                          border: `2px solid ${currentColor.border}`,
                          boxShadow: `0 0 10px ${currentColor.glow}`,
                          display: 'inline-block',
                        }}
                      />
                      <span>สี</span>
                    </div>
                  ) : (
                    <>
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 300,
                        transform: isActive ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}>
                        +
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </button>

                {/* Sub Color Swatch Bar when 'Color' is active */}
                {item.id === 'color' && isActive && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px', marginLeft: '12px', animation: 'fadeIn 0.2s ease' }}>
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={(e) => handleSelectColor(c.id, e)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: c.hex,
                          border: selectedColor === c.id ? '2px solid #2997ff' : `2px solid ${c.border}`,
                          boxShadow: selectedColor === c.id ? '0 0 14px #2997ff' : 'none',
                          cursor: 'pointer',
                          transform: selectedColor === c.id ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.2s ease',
                        }}
                        title={c.name}
                      />
                    ))}
                  </div>
                )}

                {/* Active Feature Expansion Card */}
                {isActive && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderLeft: '3px solid var(--apple-blue)',
                    animation: 'fadeIn 0.25s ease',
                  }}>
                    <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--apple-text-secondary)', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Realistic Apple 3D Perspective Device Mockup */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          perspective: '1200px',
        }}>
          {/* Ambient Glow behind phone */}
          <div style={{
            position: 'absolute',
            width: '380px',
            height: '620px',
            borderRadius: '50px',
            background: currentColor.glow,
            filter: 'blur(70px)',
            opacity: 0.6,
            transition: 'background 0.5s ease',
          }} />

          {/* 3D Angled Phone Body */}
          <div
            style={{
              width: '310px',
              height: '620px',
              borderRadius: '48px',
              background: '#0c0c0e',
              border: `6px solid ${currentColor.border}`,
              boxShadow: `
                0 30px 80px rgba(0, 0, 0, 0.95),
                0 0 30px ${currentColor.glow},
                inset 0 0 0 3px #000,
                inset 0 0 10px rgba(255, 255, 255, 0.15)
              `,
              position: 'relative',
              overflow: 'hidden',
              transform: 'rotateY(-12deg) rotateX(4deg)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
            }}
          >
            {/* Screen Wallpaper / UI */}
            <div style={{
              width: '100%',
              height: '100%',
              background: `radial-gradient(ellipse at 50% 30%, ${currentColor.hex} 0%, #000000 70%)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px 18px 20px',
              boxSizing: 'border-box',
              position: 'relative',
            }}>
              
              {/* Dynamic Island Pill Cutout */}
              <div style={{
                margin: '0 auto 16px',
                width: activeFeature === 'island' ? '140px' : '90px',
                height: '28px',
                borderRadius: '16px',
                background: '#000',
                border: activeFeature === 'island' ? '1px solid rgba(41, 151, 255, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: activeFeature === 'island' ? '0 0 20px rgba(41, 151, 255, 0.6)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                transition: 'all 0.3s ease',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30d158' }}></span>
                {activeFeature === 'island' && (
                  <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 600 }}>
                    ⚡ 888 Audio Pro
                  </span>
                )}
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0a0a0c' }}></span>
              </div>

              {/* Status Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                <span>9:41</span>
                <span>5G &bull; 100%</span>
              </div>

              {/* Camera Highlight Indicator */}
              {activeFeature === 'camera' && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  border: '1px solid #2997ff',
                  borderRadius: '16px',
                  padding: '12px',
                  textAlign: 'center',
                  animation: 'fadeIn 0.2s ease',
                  zIndex: 20,
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#70b7ff', fontWeight: 700 }}>
                    📸 48MP FUSION CAMERA ACTIVE
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--apple-text-secondary)', marginTop: '2px' }}>
                    Quad-Pixel Sensor &bull; Zero Shutter Lag
                  </div>
                </div>
              )}

              {/* App Icons Grid (Apple Grid Aesthetics) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', margin: 'auto 0' }}>
                {[
                  { icon: '🕒', label: 'Clock' },
                  { icon: '📷', label: 'Camera' },
                  { icon: '⚡', label: 'IoT Hub' },
                  { icon: '📡', label: 'LoRaWAN' },
                  { icon: '🧭', label: 'Compass' },
                  { icon: '🔋', label: 'Power' },
                  { icon: '📁', label: 'Files' },
                  { icon: '🎵', label: 'Music' },
                  { icon: '⚙️', label: 'Sensors' },
                  { icon: '📈', label: 'Analytics' },
                  { icon: '🛡️', label: 'Security' },
                  { icon: '🛒', label: 'Store' },
                ].map((app, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      margin: '0 auto 4px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    }}>
                      {app.icon}
                    </div>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.8)' }}>{app.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Dock */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '8px 14px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '20px' }}>📞</span>
                <span style={{ fontSize: '20px' }}>💬</span>
                <span style={{ fontSize: '20px' }}>🌐</span>
                <span style={{ fontSize: '20px' }}>🛍️</span>
              </div>

              {/* Home Indicator Bar */}
              <div style={{
                width: '120px',
                height: '4px',
                background: 'var(--bg-card)',
                borderRadius: '2px',
                margin: '10px auto 0',
                opacity: 0.8,
              }} />

            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
