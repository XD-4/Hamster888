'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Volume2, FastForward } from 'lucide-react';

function triggerMusicPlay() {
  if (typeof window === 'undefined') return;
  const player = window.ytPlayerInstance;
  if (player && typeof player.playVideo === 'function') {
    player.unMute();
    player.setVolume(100);
    player.playVideo();
  } else {
    window.__pendingMusicPlay = true;
  }
}

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const masterTimeline = useRef(null);

  // Background star/particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.35 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Entrance animation on initial mount
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.7, y: -20, filter: 'blur(15px)' },
      { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 25, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      );
  }, []);

  // Start the 20-Second Cinematic Keynote Sequence
  const handleStart = () => {
    if (hasStarted) return;
    setHasStarted(true);

    triggerMusicPlay();

    // Fade out start button
    gsap.to(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    const master = gsap.timeline({
      onUpdate: () => {
        const prog = Math.round((master.time() / 20) * 100);
        setProgress(Math.min(100, prog));
      },
      onComplete: () => {
        finishIntro();
      },
    });

    masterTimeline.current = master;

    // Helper to animate text chapters smoothly
    const animateChapter = (badgeText, titleText, subText, accentColor) => {
      const ch = gsap.timeline();
      ch.to([badgeRef.current, titleRef.current, subRef.current], {
        opacity: 0,
        y: -15,
        filter: 'blur(8px)',
        duration: 0.45,
        ease: 'power2.in',
      })
        .call(() => {
          if (badgeRef.current) badgeRef.current.innerText = badgeText;
          if (titleRef.current) titleRef.current.innerText = titleText;
          if (subRef.current) subRef.current.innerText = subText;
          if (logoRef.current && accentColor) {
            logoRef.current.style.boxShadow = `0 20px 60px ${accentColor}66, inset 0 0 30px rgba(255,255,255,0.05)`;
          }
        })
        .fromTo(
          [badgeRef.current, titleRef.current, subRef.current],
          { opacity: 0, y: 20, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, stagger: 0.1, ease: 'power2.out' }
        );
      return ch;
    };

    // ── 20-Second Presentation Chapters ──

    // Chapter 1: 0s - 4.5s (Silicon & Neural Core)
    master.add(
      animateChapter(
        '✦ PHASE 1 : SILICON & NEURAL CORE ✦',
        'Dual-Core Xtensa LX7 240MHz',
        'ชิปสถาปัตยกรรม Vector Machine สำหรับ AI TinyML & Vision บน Edge',
        '#0071e3'
      ),
      0.5
    );

    // Chapter 2: 4.5s - 9s (Sensors & Vision)
    master.add(
      animateChapter(
        '✦ PHASE 2 : SENSORS & VISION ✦',
        'Ultra High-Precision Sensors',
        '360° LiDAR ToF • BME688 AI Gas Sensor • LoRaWAN 15km Node',
        '#30d158'
      ),
      4.5
    );

    // Chapter 3: 9s - 13.5s (GaN Power & BMS)
    master.add(
      animateChapter(
        '✦ PHASE 3 : POWER & RELIABILITY ✦',
        'Industrial Grade GaN Power',
        '65W GaN PD Fast Charge • Smart 4S LiFePO4 BMS • ESD Safe Package',
        '#ff9f0a'
      ),
      9.0
    );

    // Chapter 4: 13.5s - 17.5s (Enterprise & Tax Invoice)
    master.add(
      animateChapter(
        '✦ PHASE 4 : ENTERPRISE READY ✦',
        'find IOT Pro Ecosystem',
        'ออกใบกำกับภาษีเต็มรูปแบบ 100% • จัดส่งด่วน 1-2 วันทั่วประเทศ',
        '#bf5af2'
      ),
      13.5
    );

    // Chapter 5: 17.5s - 20s (Hyper-Drive Portal Zoom Out)
    master.to(
      logoRef.current,
      {
        scale: 14,
        opacity: 0,
        filter: 'blur(40px)',
        duration: 2.2,
        ease: 'expo.inOut',
      },
      17.5
    );

    master.to(
      contentRef.current,
      {
        opacity: 0,
        scale: 1.3,
        filter: 'blur(15px)',
        duration: 1.8,
        ease: 'power2.in',
      },
      17.8
    );
  };

  const finishIntro = () => {
    masterTimeline.current?.kill();
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });
  };

  const handleSkip = () => {
    triggerMusicPlay();
    finishIntro();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030305',
        color: '#fff',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.2) 0%, rgba(142,68,173,0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      {/* ── Top Bar: Prominent Skip Button & 20s Progress Bar ── */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
          <span style={{ color: '#0071e3' }}>●</span> find IOT 20s Keynote
        </div>

        {/* Skip Button with Glowing Ring */}
        <button
          type="button"
          id="intro-skip-btn"
          onClick={handleSkip}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '0.88rem',
            fontWeight: 600,
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '980px',
            backdropFilter: 'blur(16px)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.borderColor = '#0071e3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          }}
        >
          <span>ข้ามอินโทร (Skip Intro)</span>
          <FastForward size={15} />
        </button>
      </div>

      {/* Progress Line Bar (top edge) */}
      {hasStarted && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)', zIndex: 40 }}>
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0071e3, #30d158, #bf5af2)',
              boxShadow: '0 0 12px #0071e3',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      )}

      {/* ── Main Layout Stack ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '680px',
          padding: '0 24px',
        }}
      >
        {/* ── Silicon Chip Glass Tile ── */}
        <div
          ref={logoRef}
          style={{
            width: '136px',
            height: '136px',
            borderRadius: '34px',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.85) 70%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderTop: '1px solid rgba(255, 255, 255, 0.55)',
            boxShadow: '0 20px 60px rgba(0,113,227,0.4), inset 0 0 30px rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '36px',
            position: 'relative',
            backdropFilter: 'blur(20px)',
            transition: 'box-shadow 0.6s ease',
          }}
        >
          {/* Rotating Aurora Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '40px',
              background: 'conic-gradient(from 0deg, transparent 0%, #0071e3 30%, #bf5af2 60%, #30d158 85%, transparent 100%)',
              animation: 'spinRing 5s linear infinite',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
              opacity: 0.9,
            }}
          />

          {/* Chip Silicon Core */}
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: '#09090c',
              border: '1px solid rgba(41, 151, 255, 0.6)',
              boxShadow: '0 0 25px rgba(0, 113, 227, 0.8), inset 0 0 10px rgba(41, 151, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '5px',
                background: '#0071e3',
                boxShadow: '0 0 18px #0071e3',
              }}
            />
          </div>
        </div>

        {/* ── Dynamic Text Content Block (Animated per Chapter) ── */}
        <div ref={contentRef} style={{ marginBottom: '32px', minHeight: '140px' }}>
          <div
            ref={badgeRef}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.75)',
              padding: '6px 16px',
              borderRadius: '980px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '16px',
            }}
          >
            <span>✦</span> FIND IOT ECOSYSTEM <span>✦</span>
          </div>

          <h1
            ref={titleRef}
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 14px',
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.75) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 40px rgba(0,113,227,0.3)',
            }}
          >
            Pro Performance.
          </h1>

          <p
            ref={subRef}
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.65)',
              margin: '0 auto',
              fontWeight: 400,
              lineHeight: 1.55,
              maxWidth: '520px',
            }}
          >
            สัมผัสประสบการณ์ชิปเซต & อุปกรณ์ IoT ระดับมืออาชีพ
          </p>
        </div>

        {/* ── Start Button (Disappears when presentation starts) ── */}
        {!hasStarted && (
          <div ref={buttonRef} style={{ position: 'relative' }}>
            <button
              type="button"
              id="intro-start-btn"
              onClick={handleStart}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 38px',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(135deg, #0071e3 0%, #004499 100%)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '980px',
                cursor: 'pointer',
                boxShadow: '0 12px 35px rgba(0, 113, 227, 0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 113, 227, 0.7), inset 0 1px 0 rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 113, 227, 0.5), inset 0 1px 0 rgba(255,255,255,0.4)';
              }}
            >
              <Play size={18} fill="#fff" />
              <span>เริ่มการนำเสนอ 20 วินาที (Enter Keynote)</span>
              <Volume2 size={16} style={{ opacity: 0.75, marginLeft: '4px' }} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
