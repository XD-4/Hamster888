'use client';

import { useEffect, useRef, useState } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Fade out on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Fade out from scrollY 0 to 400
      const newOpacity = Math.max(0, 1 - window.scrollY / 400);
      setScrollOpacity(newOpacity);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Apple Siri-like GLSL WebGL Shaders
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const VERTEX_SHADER = `attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.0,1.0); }`;
    const WAVE_SHADER = `precision highp float;
uniform vec2 iResolution; uniform float iTime; uniform float iIntensity;
const float PI = 3.14159265359;
const float AMPLITUDE   = 0.32;
const float FREQ        = 1.1;
const float ABER_FREQ   = 1.0;
const float SPEED       = 2.4;
const float WAVE_SCALE  = 0.6;
const float ABERRATION  = 2.6;
const float THICKNESS   = 3.0;
const float INTENSITY   = 2.;
const float FALLOFF     = 1.7;
const float EDGE_MASK   = 0.4;
const float EDGE_INSET  = 0.0;
const float BAND_FILL   = 30000.0;
const float BAND_THICK  = 0.08;
const float SOFTNESS    = 2.5;
const float LOW_AMP     = 6.0;
const float LOW_INT     = 1.5;
const float MID_ABER    = 0.8;
const float MID_ABAMP   = 0.05;
const float MID_BAND    = 20.0;
const float MID_SOFT    = 0.4;
const float HIGH_ABER   = 0.5;
const float HIGH_ABAMP  = 0.06;
const float RESOLVED    = 1.0;
const float UNRES_SCALE = 0.14;

vec3 spectral4(int s){
    float x = float(s);
    return clamp(vec3(abs(x-3.0)-1.0, 2.0-abs(x-2.0), 2.0-abs(x-4.0)), 0.0, 1.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 R = iResolution.xy;
    float aspect = R.x / R.y;
    vec2 p = (fragCoord + 0.5) * 2.0 / R - 1.0;
    p.x *= aspect;
    float yScreen = p.y;
    p /= max(WAVE_SCALE, 0.1);

    float t   = iTime;
    float low  = clamp(0.45 + 0.45*sin(t*0.8)*sin(t*0.37+1.0), 0.0, 1.0);
    float mid  = clamp(0.40 + 0.40*sin(t*1.7+2.0)*sin(t*0.53), 0.0, 1.0);
    float high = clamp(0.30 + 0.30*sin(t*2.9+4.0)*sin(t*0.71+2.0), 0.0, 1.0);

    float res   = clamp(RESOLVED, 0.0, 1.0);
    float drift = mod(t, 20.0*PI) * SPEED;

    float xN  = p.x / max(aspect, 1.0);
    float env = cos(PI*0.5 * min(abs(0.9*xN), 1.0));
    env *= env;

    // React to audio intensity
    float A1    = (AMPLITUDE + 0.01*low*LOW_AMP) * (1.0 + iIntensity);
    float A2    = A1 + mid*MID_ABAMP + high*HIGH_ABAMP;
    float AB    = (ABERRATION + mid*MID_ABER + high*HIGH_ABER)*res;
    float th    = mix(0.1, 0.01*THICKNESS, res);
    float inten = mix(0.1, 0.01*(INTENSITY + low*LOW_INT), res);
    float soft  = 0.01*res*max(0.0, SOFTNESS + mid*MID_SOFT);

    float dUnres = max(length(p) - mix(0.14, UNRES_SCALE, res), 0.0);
    float yMain = A1 * env * res * sin(p.x*FREQ + drift);

    float bandFillTh = max(BAND_THICK, 1e-4);
    float bandAmt    = 1e-4 * BAND_FILL * inten;
    vec3 num = vec3(0.0), den = vec3(0.0);
    for(int s = 0; s < 4; s++){
        vec3 hue = mix(vec3(1.0), spectral4(s), res);
        den += hue;
        float ab = mix(-AB, AB, float(s)/3.0);
        float yL = A2 * env * res * sin(p.x*ABER_FREQ + drift + ab);
        float d   = mix(dUnres, abs(p.y - yL), res);
        float lor = mix(1.0/(1.0 + (0.02*d)*(0.02*d)), 1.0, res);
        float line = inten / (sqrt(d*d + soft*soft) + th);
        float lo = min(yMain, yL), hi = max(yMain, yL);
        float dBand = max(0.0, max(p.y - hi, lo - p.y));
        float band  = bandAmt / (dBand + bandFillTh);
        num += hue * lor * (line + band);
    }
    vec3 col = num / den;

    float dM    = mix(dUnres, abs(p.y - yMain), res);
    float lorM  = mix(1.0/(1.0 + (0.02*dM)*(0.02*dM)), 1.0, res);
    float boost = (1.0 - res) * (14.0*low + 4.0);
    col += 0.5 * inten * (lorM + boost) / (sqrt(dM*dM + soft*soft) + th);

    col = pow(max(col, 0.0), vec3(1.5));
    float emT = clamp((abs(yScreen) - 1.0 + EDGE_INSET) / (-max(EDGE_MASK, 1e-4)), 0.0, 1.0);
    float em  = emT*emT*(3.0 - 2.0*emT);
    float gauss = exp(-pow(xN*FALLOFF, 2.0));
    col *= mix(1.0, em*gauss, res);
    col *= res;
    
    // Calculate alpha based on color intensity so the black background becomes transparent
    float maxCol = max(col.r, max(col.g, col.b));
    float alpha = min(maxCol * 2.0, 1.0);
    
    fragColor = vec4(col, alpha);
}
void main(){ mainImage(gl_FragColor, gl_FragCoord.xy); }`;

    const compile = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, WAVE_SHADER);
    if (!vs || !fs) return;
    
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uIntensity = gl.getUniformLocation(program, "iIntensity");

    let animFrame;
    const renderScale = 1.0;
    
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * renderScale;
      canvas.height = h * renderScale;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resize);
    resize();

    const start = performance.now();
    let smoothedIntensity = 0;

    const frame = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      
      // Simulate real audio frequency bands (smoother and less erratic)
      let targetIntensity = 0;
      if (isPlaying) {
        // Use slower, smoother sine waves to mimic a relaxed ambient beat
        const bass = Math.pow(Math.sin(t * 1.5) * 0.5 + 0.5, 2); // Smooth, deep breathing bass
        const mid = Math.sin(t * 3.2) * 0.5 + 0.5;
        
        // Very subtle random variation instead of sharp spikes
        const organicFlow = Math.sin(t * 0.5) * 0.5 + 0.5;
        
        // Aggregate intensity (more focus on the slow bass)
        targetIntensity = (bass * 0.7) + (mid * 0.2) + (organicFlow * 0.2);
        // Scale it down to avoid huge jumps
        targetIntensity *= 0.6;
      }
      
      // Much smoother attack and decay (fluid motion)
      if (targetIntensity > smoothedIntensity) {
        smoothedIntensity += (targetIntensity - smoothedIntensity) * 0.08; // Gentle attack
      } else {
        smoothedIntensity += (targetIntensity - smoothedIntensity) * 0.04; // Very slow decay
      }

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * (1.0 + smoothedIntensity * 0.2)); // Speed up slightly on beats
      gl.uniform1f(uIntensity, smoothedIntensity);
      
      // Clear with transparent so background shows through
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Blend mode to allow transparency if desired, though shader outputs solid colors.
      // If we want it to blend gracefully over our site background:
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animFrame = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [isPlaying]);

  return (
    <>
      <div id="yt-player" style={{ position: 'absolute', top: -9999, left: -9999, opacity: 0 }} />
      <style>{`
        html:not(.dark) .siri-canvas {
          filter: invert(1) hue-rotate(180deg) saturate(1.5) contrast(1.2);
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="siri-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          backgroundColor: 'transparent',
          opacity: scrollOpacity,
          transition: 'opacity 0.1s ease-out',
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
