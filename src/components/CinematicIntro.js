'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return; // Don't start animation until button is clicked

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    });

    // 1. Start completely black
    tl.set(containerRef.current, { backgroundColor: '#000' });
    tl.set(logoRef.current, { opacity: 0, scale: 0.8, filter: 'blur(20px)' });
    tl.set(textRef.current, { opacity: 0, y: 20, filter: 'blur(10px)' });

    // 2. Slow fade in the glowing logo (Apple Pro Titanium style)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 5, // Extended
      ease: 'power2.inOut'
    });

    // 3. Fade in text
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 4, // Extended
      ease: 'power2.out'
    }, "-=2.0");

    // 4. Hold for a long moment (Ambient glow state) to reach ~30s total
    tl.to({}, { duration: 17 }); // Hold for 17 seconds

    // 5. Massive scale up and fade out to reveal the real website
    tl.to(logoRef.current, {
      scale: 10,
      opacity: 0,
      filter: 'blur(30px)',
      duration: 4, // Extended scale out
      ease: 'expo.in'
    }, "outro");

    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(10px)',
      duration: 3,
      ease: 'power2.in'
    }, "outro");

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 3,
      ease: 'power2.inOut'
    }, "outro+=1.0");

    return () => {
      tl.kill();
    };
  }, [hasStarted, onComplete]);

  const handleStart = () => {
    // Start music immediately within the user gesture (required by autoplay policy)
    const player = typeof window !== 'undefined' ? window.ytPlayerInstance : null;
    if (player && typeof player.playVideo === 'function') {
      player.unMute();
      player.setVolume(100);
      player.playVideo();
    } else if (typeof window !== 'undefined') {
      // Player not ready yet — play as soon as it is
      window.__pendingMusicPlay = true;
    }

    gsap.to(buttonRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      onComplete: () => setHasStarted(true)
    });
  };

  const handleSkip = () => {
    // Start music if not started
    const player = typeof window !== 'undefined' ? window.ytPlayerInstance : null;
    if (player && typeof player.playVideo === 'function') {
      player.unMute();
      player.setVolume(100);
      player.playVideo();
    } else if (typeof window !== 'undefined') {
      window.__pendingMusicPlay = true;
    }
    
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        pointerEvents: 'auto'
      }}
    >
      {!hasStarted && (
        <button
          ref={buttonRef}
          onClick={handleStart}
          style={{
            position: 'absolute',
            zIndex: 10,
            padding: '16px 48px',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '100px',
            backdropFilter: 'blur(20px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          Enter Experience
        </button>
      )}

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '40px',
          zIndex: 20,
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.9rem',
          cursor: 'pointer',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textDecoration: 'underline',
          transition: 'color 0.3s ease',
          pointerEvents: 'auto'
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
      >
        Skip Intro
      </button>
      <div 
        ref={logoRef}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.1), rgba(0,0,0,1) 60%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderTop: '1px solid rgba(255, 255, 255, 0.6)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 80px rgba(41, 151, 255, 0.3), inset 0 0 40px rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Abstract Chip Core */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: '#000',
          border: '1px solid rgba(41, 151, 255, 0.4)',
          boxShadow: '0 0 20px rgba(41, 151, 255, 0.8)'
        }} />

        {/* Siri-like Glow Overlay */}
        <div style={{
          position: 'absolute',
          inset: '-50%',
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(41,151,255,0.4) 25%, rgba(191,90,242,0.4) 50%, rgba(48,209,88,0.4) 75%, transparent 100%)',
          animation: 'spin 4s linear infinite',
          mixBlendMode: 'screen',
          filter: 'blur(10px)',
          opacity: 0.6
        }} />
      </div>

      <div 
        ref={textRef}
        style={{
          color: '#fff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center'
        }}
      >
        <div style={{ 
          fontSize: '1.2rem', 
          letterSpacing: '0.4em', 
          fontWeight: 600, 
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #888, #fff, #888)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          find IOT
        </div>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          letterSpacing: '-0.02em',
          textShadow: '0 10px 30px rgba(0,0,0,0.8)'
        }}>
          Pro Performance.
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
