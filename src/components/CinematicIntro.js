'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Volume2 } from 'lucide-react';

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);

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

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.3 + 0.1,
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

  // Entrance animation on mount
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

  // Launch transition sequence when user clicks "Enter Experience"
  const handleStart = () => {
    if (isLaunching) return;
    setIsLaunching(true);

    // Audio playback trigger
    const player = typeof window !== 'undefined' ? window.ytPlayerInstance : null;
    if (player && typeof player.playVideo === 'function') {
      player.unMute();
      player.setVolume(100);
      player.playVideo();
    } else if (typeof window !== 'undefined') {
      window.__pendingMusicPlay = true;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // 1. Button shrinks away
    tl.to(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    });

    // 2. Text fades out
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -30,
        filter: 'blur(12px)',
        duration: 0.5,
        ease: 'power2.in',
      },
      '-=0.2'
    );

    // 3. Logo expands into camera with light burst
    tl.to(logoRef.current, {
      scale: 14,
      opacity: 0,
      filter: 'blur(40px)',
      duration: 1.4,
      ease: 'expo.inOut',
    });

    // 4. Container fades out to reveal website
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.5'
    );
  };

  const handleSkip = () => {
    const player = typeof window !== 'undefined' ? window.ytPlayerInstance : null;
    if (player && typeof player.playVideo === 'function') {
      player.unMute();
      player.setVolume(100);
      player.playVideo();
    } else if (typeof window !== 'undefined') {
      window.__pendingMusicPlay = true;
    }

    setIsVisible(false);
    onComplete?.();
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
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.18) 0%, rgba(142,68,173,0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      {/* Main Layout Stack */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '620px',
          padding: '0 24px',
        }}
      >
        {/* ── Silicon Chip Glass Tile ── */}
        <div
          ref={logoRef}
          style={{
            width: '128px',
            height: '128px',
            borderRadius: '32px',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.8) 70%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderTop: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 20px 60px rgba(0,113,227,0.35), inset 0 0 30px rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '36px',
            position: 'relative',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Rotating Aurora Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '38px',
              background: 'conic-gradient(from 0deg, transparent 0%, #0071e3 30%, #bf5af2 60%, #30d158 85%, transparent 100%)',
              animation: 'spinRing 6s linear infinite',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
              opacity: 0.85,
            }}
          />

          {/* Chip Silicon Core */}
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
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
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: '#0071e3',
                boxShadow: '0 0 15px #0071e3',
              }}
            />
          </div>
        </div>

        {/* ── Typography & Subtitle ── */}
        <div ref={contentRef} style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              padding: '6px 14px',
              borderRadius: '980px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '16px',
            }}
          >
            <span>✦</span> FIND IOT ECOSYSTEM <span>✦</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 14px',
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 40px rgba(0,113,227,0.3)',
            }}
          >
            Pro Performance.
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.55)',
              margin: 0,
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: '440px',
            }}
          >
            สัมผัสประสบการณ์ชิปเซต & อุปกรณ์ IoT ระดับมืออาชีพ
          </p>
        </div>

        {/* ── Primary CTA Button (Positioned Cleanly Below Text) ── */}
        <div ref={buttonRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={handleStart}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
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
            <span>Enter Experience</span>
            <Volume2 size={16} style={{ opacity: 0.75, marginLeft: '4px' }} />
          </button>
        </div>
      </div>

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '36px',
          zIndex: 20,
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.85rem',
          cursor: 'pointer',
          textDecoration: 'underline',
          transition: 'color 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
      >
        ข้ามอินโทร (Skip Intro)
      </button>

      <style>{`
        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
