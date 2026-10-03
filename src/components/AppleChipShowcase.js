'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Zap, ShieldCheck, Wifi, Layers } from 'lucide-react';

export default function AppleChipShowcase() {
  const containerRef = useRef(null);
  const chipRef = useRef(null);
  const layersRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Apple-style timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Scale down hero text and reveal chip
      tl.to(titleRef.current, {
        opacity: 0.15,
        scale: 0.85,
        duration: 0.6,
      })
      .fromTo(
        chipRef.current,
        { scale: 0.7, opacity: 0.3, rotateX: 25 },
        { scale: 1.15, opacity: 1, rotateX: 0, duration: 1 },
        '<'
      )
      // 2. Exploded layer separation (Apple Silicon Architecture reveal)
      .to('.silicon-layer-1', { y: -50, opacity: 1, duration: 0.8 }, '+=0.2')
      .to('.silicon-layer-2', { y: 50, opacity: 1, duration: 0.8 }, '<')
      .to('.spec-callout', { opacity: 1, scale: 1, stagger: 0.15, duration: 0.6 }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(41, 151, 255, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Text */}
      <div ref={titleRef} style={{ textAlign: 'center', zIndex: 2, marginBottom: '20px' }}>
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(41, 151, 255, 0.12)',
            border: '1px solid rgba(41, 151, 255, 0.3)',
            padding: '4px 14px',
            borderRadius: '980px',
            color: '#70b7ff',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '12px',
          }}
        >
          <Cpu size={14} /> ARCHITECTURE SPOTLIGHT
        </div>
        <h2
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            background: 'linear-gradient(180deg, #ffffff 0%, #86868b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}
        >
          Inside the Silicon.
        </h2>
        <p style={{ color: 'var(--apple-text-secondary)', fontSize: '1.1rem', marginTop: '8px' }}>
          เลื่อนเพื่อสัมผัสการผ่าโครงสร้างฮาร์ดแวร์ชิปประมวลผลระดับ 32-bit AI Core
        </p>
      </div>

      {/* Central Interactive Chip Container */}
      <div
        style={{
          position: 'relative',
          width: '360px',
          height: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
        }}
      >
        {/* The Chip Base */}
        <div
          ref={chipRef}
          style={{
            width: '260px',
            height: '260px',
            borderRadius: '28px',
            background: 'linear-gradient(145deg, #18181c, #0a0a0d)',
            border: '2px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(41, 151, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {/* Micro-pins around border */}
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '34px',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2997ff, #004fb0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(41, 151, 255, 0.6)',
              marginBottom: '12px',
            }}
          >
            <Cpu size={32} color="#fff" />
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            ESP32-S3 PRO
          </div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#70b7ff', marginTop: '2px' }}>
            DUAL-CORE XTENSA &bull; 240MHz
          </div>
        </div>

        {/* Exploded Silicon Layer 1 (Top Floating Component) */}
        <div
          className="silicon-layer-1"
          style={{
            position: 'absolute',
            top: '0',
            background: 'rgba(22, 22, 28, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(41, 151, 255, 0.4)',
            borderRadius: '14px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            opacity: 0,
            boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
            zIndex: 4,
          }}
        >
          <Zap size={16} color="#30d158" />
          <span>Vector AI Neural Engine (TinyML Acceleration)</span>
        </div>

        {/* Exploded Silicon Layer 2 (Bottom Floating Component) */}
        <div
          className="silicon-layer-2"
          style={{
            position: 'absolute',
            bottom: '0',
            background: 'rgba(22, 22, 28, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '14px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            opacity: 0,
            boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
            zIndex: 4,
          }}
        >
          <Wifi size={16} color="#2997ff" />
          <span>Wi-Fi 4 + Bluetooth 5 (LE) Mesh Co-processor</span>
        </div>
      </div>

      {/* Floating Specs Callouts */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginTop: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '850px',
        }}
      >
        {[
          { label: 'Clock Speed', val: '240 MHz', sub: 'Max frequency dual-core' },
          { label: 'AI Acceleration', val: 'Vector ML', sub: 'Face & Gesture recognition' },
          { label: 'Memory Architecture', val: '8MB PSRAM', sub: 'High bandwidth cache' },
          { label: 'Security Hardware', val: 'RSA-3072', sub: 'Cryptographic boot' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="spec-callout"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px 20px',
              borderRadius: '16px',
              textAlign: 'center',
              minWidth: '170px',
              opacity: 0,
              transform: 'scale(0.9)',
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{item.val}</div>
            <div style={{ fontSize: '0.82rem', color: '#70b7ff', fontWeight: 600, marginTop: '2px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--apple-text-tertiary)', marginTop: '2px' }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
