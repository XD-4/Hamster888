'use client';

import { useEffect, useRef, useState } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Initialize YouTube Player
  useEffect(() => {
    let destroyed = false;

    const createPlayer = () => {
      if (destroyed || playerRef.current) return;
      const player = new window.YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: 'yJu4MD2hagI', // Terror Jr - 3 Strikes
        playerVars: {
          autoplay: 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: 'yJu4MD2hagI' // Needed for loop
        },
        events: {
          onReady: () => {
            console.log('YouTube Player Ready');
            playerRef.current = player;
            window.ytPlayerInstance = player; // Expose for SplashScreen
            // If the intro button was clicked before the player was ready
            if (window.__pendingMusicPlay) {
              window.__pendingMusicPlay = false;
              player.unMute();
              player.setVolume(100);
              player.playVideo();
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING == 1
            if (event.data === 1) {
              setIsPlaying(true);
              setShowHint(false);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      destroyed = true;
    };
  }, []);

  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
    if (playerRef.current && playerRef.current.getPlayerState) {
      const state = playerRef.current.getPlayerState();
      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  // Apple Siri-like Audio Visualization Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animFrame;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    let time = 0;

    // Elegant, subtle Apple-style colors for both themes
    const colors = [
      'rgba(142, 142, 147, 0.25)', // System Gray
      'rgba(0, 113, 227, 0.20)',   // Apple Blue
      'rgba(128, 128, 128, 0.15)', // Neutral Gray (visible on both)
      'rgba(174, 174, 178, 0.25)'  // Light Silver
    ];

    const draw = () => {
      // Clear canvas (no trail for Siri waves)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // We no longer fill with #fff here, allowing the CSS --bg to show through
      
      // Smooth, elegant speed
      let timeStep = isPlaying ? 0.015 : 0.005;
      time += timeStep;
      
      const cy = canvas.height / 2;
      
      // Smooth Audio reaction (no jerking)
      let beatAmplitude = 0;
      let speedMultiplier = 1;
      
      if (isPlaying) {
        // A very smooth, slow breathing pulse instead of a hard beat
        const smoothPulse = Math.sin(time * 2) * 0.5 + 0.5; // 0 to 1
        beatAmplitude = smoothPulse * 0.4; // Max 40% increase in height
        speedMultiplier = 1.2;
      }

      ctx.globalCompositeOperation = 'source-over'; // Normal blending for crisp lines

      // Draw multiple overlapping sine waves
      for (let i = 0; i < colors.length; i++) {
        ctx.beginPath();
        
        // Very wide, elegant curves (Increased amplitude for larger size)
        const frequency = 0.0015 + (i * 0.0003);
        const phase = time * (0.8 + i * 0.15) * speedMultiplier;
        const baseAmplitude = 180 + (i * 60); // Increased from 80 + (i*30)
        const currentAmplitude = baseAmplitude * (1 + beatAmplitude);
        
        ctx.moveTo(0, cy);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          // Smooth bell curve envelope so the waves taper elegantly at the edges
          const normalizedX = (x / canvas.width) * 2 - 1; // -1 to 1
          const envelope = Math.exp(-(normalizedX * normalizedX) * 1.8); // Softer taper (spreads wider across screen)
          
          const y = cy + Math.sin(x * frequency + phase) * currentAmplitude * envelope;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 4 + (i * 1.5); // Thicker, more prominent lines
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Very subtle glow to keep it clean
        ctx.shadowBlur = 12;
        ctx.shadowColor = colors[i];
        
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      }
      
      animFrame = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, [isPlaying]);

  return (
    <>
      <div id="yt-player" style={{ position: 'absolute', top: -9999, left: -9999, opacity: 0 }} />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none', // Allow clicking through to the UI
          backgroundColor: 'transparent'
        }}
      />
      
      {/* Floating Play/Pause Button */}
      <button
        id="music-toggle"
        onClick={togglePlayPause}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '36px',
          height: '36px',
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9000,
          boxShadow: isPlaying ? '0 0 18px rgba(0, 113, 227, 0.35)' : '0 4px 12px rgba(0,0,0,0.12)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>
    </>
  );
}
