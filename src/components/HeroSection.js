'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExploreProducts, onExploreHowToOrder }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const bentoRef = useRef(null);
  const bentoCardsRef = useRef([]);

  useEffect(() => {
    // 1. Initial Load Animations (Hero Fade In)
    const tl = gsap.timeline();
    tl.fromTo(headlineRef.current, 
      { opacity: 0, y: 100, scale: 0.95, filter: 'blur(10px)' }, 
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      "-=0.6"
    );

    // 2. Scroll Animations (Bento Box Reveal)
    if (bentoRef.current && bentoCardsRef.current.length > 0) {
      gsap.fromTo(bentoCardsRef.current, 
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bentoRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'calc(44px + 4rem)',
        paddingBottom: '60px',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* ── Abstract Background Glow ── */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '120vw', height: '80vh',
        background: 'radial-gradient(ellipse at top, rgba(0,113,227,0.06) 0%, rgba(142,68,173,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* ── Hero Content (Typography) ── */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 940, width: '100%', marginBottom: '3.8rem' }}>
        
        {/* Main Headline (Apple.com proportions) */}
        <h1 
          ref={headlineRef}
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.1rem)',
            fontWeight: 600, 
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            marginBottom: '0.8rem',
            color: 'var(--text-primary)',
            opacity: 0,
          }}
        >
          <span style={{ display: 'block' }}>Internet</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(110deg, #1d1d1f 0%, #6e6e73 35%, #0071e3 60%, #1d1d1f 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shine 6s linear infinite'
          }}>
            of Things.
          </span>
        </h1>


        {/* CTA Buttons */}
        <div 
          ref={ctaRef}
          style={{
            display: 'flex', gap: '14px', justifyContent: 'center',
            alignItems: 'center', flexWrap: 'wrap',
            opacity: 0
          }}
        >
          <button
            id="hero-shop-btn"
            onClick={onExploreProducts}
            className="liquid-metal-btn"
          >
            <span className="liquid-metal-inner">
              เลือกซื้ออุปกรณ์
            </span>
          </button>

          <button
            id="hero-howto-btn"
            onClick={onExploreHowToOrder}
            className="liquid-metal-btn"
          >
            <span className="liquid-metal-inner">
              วิธีสั่งซื้อ
            </span>
          </button>
        </div>
      </div>

        {/* ── Bento Grid Reveal on Scroll ── */}
        <div 
          ref={bentoRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            maxWidth: 1020,
            width: '100%',
            padding: '0 22px',
            marginTop: '18vh',
            boxSizing: 'border-box',
            zIndex: 10
          }}
        >
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              ),
              title: 'ออกบิล VAT ได้ 100%',
              desc: 'รองรับการเบิกจ่ายสำหรับหน่วยงานราชการ มหาวิทยาลัย และบริษัทเอกชน เอกสารครบถ้วน',
              accent: '#2997ff'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              ),
              title: 'จัดส่งด่วนทันใจ',
              desc: 'แจ้งโอนก่อน 14:00 น. จัดส่งวันเดียวกันผ่าน Flash, Kerry, EMS ถึงมือใน 1-2 วัน',
              accent: '#30d158'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9f0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              ),
              title: 'แพ็คเกจ ESD Safe',
              desc: 'บรรจุหีบห่อกันกระแทก ป้องกันไฟฟ้าสถิต เกรดอุตสาหกรรม และส่งฟรีเมื่อครบ 1,500 บาท',
              accent: '#ff9f0a'
            },
          ].map((card, i) => (
            <div
              key={i}
              ref={el => (bentoCardsRef.current[i] = el)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                padding: '28px 24px',
                textAlign: 'left',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                transition: 'transform 0.4s ease, border-color 0.4s ease',
                opacity: 0 // hidden initially for GSAP
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = `${card.accent}60`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ marginBottom: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '12px', background: `${card.accent}15` }}>
                {card.icon}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.01em', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                {card.title}
              </div>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-tertiary)', lineHeight: 1.55, margin: 0 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        color: 'var(--text-tertiary)', fontSize: '0.72rem',
        letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
        animation: 'fadeInUp 1.2s 0.6s ease both',
        fontFamily: 'var(--font-mono)',
      }}>
        <span>เลื่อนลง</span>
        <div style={{
          width: 1, height: 36,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
          animation: 'scrollHintDrop 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}
