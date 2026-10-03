'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, RoundedBox, MeshTransmissionMaterial, Html } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { IOT_PRODUCTS } from '../data/products';

// Premium Particle Swarm / Siri-like AI Core
function ParticleCore({ powerState }) {
  const pointsRef = useRef();
  const coreRef = useRef();
  const groupRef = useRef();

  // Generate particles for the glowing ring
  const particleCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + (Math.random() * 0.4 - 0.2); // Ring radius ~2.5
      
      // Flatten into a disk/ring shape rather than a full sphere
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // Thin height
      pos[i * 3 + 2] = r * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Gentle floating up and down
      groupRef.current.position.y = Math.sin(time * 2) * 0.2;
    }

    if (pointsRef.current && coreRef.current) {
      if (powerState === 0) {
        // Idle - Slow rotation
        pointsRef.current.rotation.y += delta * 0.3;
        pointsRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
        coreRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.2;
      } else if (powerState === 1) {
        // Powering up (Implosion) - Fast spin, intense glow, shrinking
        pointsRef.current.rotation.y += delta * 5.0;
        pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, 0, 0.1);
        pointsRef.current.scale.lerp(new THREE.Vector3(0.3, 0.3, 0.3), 0.1); // Implode tightly
        
        coreRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(coreRef.current.material.emissiveIntensity, 10.0, 0.1);
        coreRef.current.material.color.lerp(new THREE.Color('#00ffff'), 0.1);
      } else if (powerState === 2) {
        // Exploding - Massive scale, ultra speed
        pointsRef.current.rotation.y += delta * 15.0;
        pointsRef.current.scale.lerp(new THREE.Vector3(25, 25, 25), 0.1);
        coreRef.current.scale.lerp(new THREE.Vector3(20, 20, 20), 0.1);
        coreRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(coreRef.current.material.emissiveIntensity, 20.0, 0.2);
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* The Particle Ring */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#2997ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* The Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          emissive="#2997ff" 
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          toneMapped={false} 
        />
      </mesh>
      
      {powerState > 0 && (
        <Sparkles count={200} scale={10} size={10} speed={2} color="#00ffff" />
      )}
    </group>
  );
}

// Procedural Abstract Models for Products
function ProceduralProduct({ id }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    if(group.current) {
      group.current.rotation.y += delta * 0.5;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  switch (id) {
    case 'esp32-s3-pro':
    case 'arduino-giga-wifi':
    case 'rpi5-8gb':
      // Mini MCU Board
      return (
        <group ref={group}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.05, 2]} />
            <meshStandardMaterial color={id === 'arduino-giga-wifi' ? "#0066cc" : "#1a3b22"} metalness={0.2} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.05, 0.5]}>
            <boxGeometry args={[0.6, 0.1, 0.6]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0, 0.05, -0.5]}>
            <boxGeometry args={[0.8, 0.15, 0.8]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      );
    case 'lidar-tof-matrix':
      // Spinning Radar Cylinder
      return (
        <group ref={group}>
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1, 0.2, 1]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.6, 32]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.3, 0.4]}>
            <boxGeometry args={[0.2, 0.2, 0.1]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
          </mesh>
        </group>
      );
    case 'bme688-ai-env':
      // Tiny Sensor Module
      return (
        <group ref={group}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.05, 0.8]} />
            <meshStandardMaterial color="#4a148c" metalness={0.2} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.3]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      );
    default:
      return (
        <group ref={group}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
      );
  }
}

// Floating Digital Gallery Inside the Memory
function MemoryGallery({ isVisible }) {
  // We'll arrange the first 5 products in a 3D tunnel
  const products = IOT_PRODUCTS.slice(0, 5);
  
  if (!isVisible) return null;

  return (
    <group>
      {/* Deep Cyber Grid Background */}
      <mesh position={[0, -2, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.1} />
      </mesh>

      {products.map((p, i) => (
        <Float key={p.id} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={[
            i % 2 === 0 ? -2.5 : 2.5, // Zig-zag left and right (wider to make room for 3D model)
            Math.sin(i) * 1.5,        // Varying height
            -5 - (i * 4)              // Deep down the Z axis
          ]}>
            {/* Holographic Glowing Base */}
            <mesh>
              <planeGeometry args={[3, 4]} />
              <meshBasicMaterial color="#000" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[3.1, 4.1]} />
              <meshBasicMaterial color="#00ffff" wireframe />
            </mesh>
            
            {/* 3D Procedural Model of the Product */}
            <group position={[0, 0.8, 0.5]} scale={[0.6, 0.6, 0.6]}>
              <ProceduralProduct id={p.id} />
            </group>
            
            {/* 3D HTML UI Card */}
            <Html transform distanceFactor={5} position={[0, -0.8, 0.1]}>
              <div style={{
                width: '320px',
                padding: '24px',
                background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.7), rgba(5, 5, 8, 0.9))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderTop: '1px solid rgba(0, 255, 255, 0.5)',
                borderRadius: '16px',
                color: '#fff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Tech Accent Line */}
                <div style={{ position: 'absolute', top: 0, left: '20px', width: '40px', height: '2px', background: '#00ffff', boxShadow: '0 0 10px #00ffff' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    color: '#00ffff', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px',
                    background: 'rgba(0, 255, 255, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {p.badge}
                  </div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ffff', boxShadow: '0 0 8px #00ffff' }} />
                </div>
                
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontWeight: 700, lineHeight: '1.3', letterSpacing: '-0.02em' }}>{p.name}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#a0a0a5', marginBottom: '24px', lineHeight: '1.5' }}>{p.chip}</p>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.03em' }}>
                    <span style={{ fontSize: '1rem', color: '#888', marginRight: '4px' }}>฿</span>
                    {p.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#555', letterSpacing: '1px' }}>IN STOCK</div>
                </div>
              </div>
            </Html>
          </group>
        </Float>
      ))}
      
      {/* Lots of Data Particles inside the memory */}
      <Sparkles count={500} scale={20} size={5} speed={1} color="#00ffff" />
    </group>
  );
}

// Hyper-Realistic Procedural ESP32 Model (Apple Event Quality)
function ESP32Model({ groupRef }) {
  return (
    <group ref={groupRef} visible={false}>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        {/* PCB Board - Deep Space Black with subtle metallic flake */}
        <RoundedBox args={[2.8, 0.08, 4.2]} radius={0.02} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#080808" 
            metalness={0.4} 
            roughness={0.6}
            clearcoat={0.1}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>
        
        {/* Wi-Fi Shield - Brushed Titanium / Silver */}
        <RoundedBox args={[1.6, 0.18, 1.4]} radius={0.05} smoothness={4} position={[0, 0.1, -1.2]}>
          <meshPhysicalMaterial 
            color="#e0e0e0" 
            metalness={1} 
            roughness={0.25} 
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Shield Engraving / Glowing Logo (Simulated) */}
        <mesh position={[0, 0.2, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
        
        {/* ESP32 Core CPU Silicon - Glassy dark crystal with glowing traces inside */}
        <RoundedBox args={[1.0, 0.1, 1.0]} radius={0.02} smoothness={4} position={[0, 0.08, 0.6]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.8}
            anisotropy={0.5}
            distortion={0.1}
            color="#111"
            roughness={0.1}
            metalness={0.9}
          />
        </RoundedBox>

        {/* Glowing CPU Inner Core */}
        <mesh position={[0, 0.09, 0.6]}>
          <boxGeometry args={[0.6, 0.02, 0.6]} />
          <meshStandardMaterial color="#0a0a0a" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>

        {/* Surrounding Micro-components (Capacitors / Resistors) */}
        {[...Array(20)].map((_, i) => (
          <mesh 
            key={`comp-${i}`} 
            position={[
              (Math.random() - 0.5) * 1.8, 
              0.06, 
              (Math.random() - 0.5) * 1.5 + 0.8
            ]}
          >
            <boxGeometry args={[0.1 + Math.random()*0.1, 0.05, 0.1 + Math.random()*0.1]} />
            <meshPhysicalMaterial 
              color={Math.random() > 0.5 ? "#b0b0b0" : "#222"} 
              metalness={Math.random() > 0.5 ? 1 : 0.2} 
              roughness={0.2} 
            />
          </mesh>
        ))}

        {/* Gold Pins Left Edge */}
        {[...Array(19)].map((_, i) => (
          <RoundedBox key={`pin-l-${i}`} args={[0.15, 0.1, 0.1]} radius={0.02} smoothness={2} position={[-1.35, 0, -1.8 + (i * 0.2)]}>
            <meshPhysicalMaterial color="#ffcc00" metalness={1} roughness={0.15} clearcoat={1} />
          </RoundedBox>
        ))}
        
        {/* Gold Pins Right Edge */}
        {[...Array(19)].map((_, i) => (
          <RoundedBox key={`pin-r-${i}`} args={[0.15, 0.1, 0.1]} radius={0.02} smoothness={2} position={[1.35, 0, -1.8 + (i * 0.2)]}>
            <meshPhysicalMaterial color="#ffcc00" metalness={1} roughness={0.15} clearcoat={1} />
          </RoundedBox>
        ))}
      </Float>
    </group>
  );
}

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null);
  const btnRef = useRef(null);
  const sparksRef = useRef([]);
  const flashOverlayRef = useRef(null);
  const shockwaveRef = useRef(null);
  const particleGroupRef = useRef(null);
  const esp32GroupRef = useRef(null);
  const cameraGroupRef = useRef(null); // Used to fly through the memory

  const [hasStarted, setHasStarted] = useState(false);
  const [powerState, setPowerState] = useState(0); // 0=idle, 1=powering, 2=exploding
  const [showGallery, setShowGallery] = useState(false); // Controls MemoryGallery rendering

  // Sequence: Button Clicked -> Entire Cinematic (with music)
  const startExperience = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const ytPlayer = window.ytPlayerInstance;
    if (ytPlayer && ytPlayer.playVideo) {
      ytPlayer.playVideo();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
          onComplete: () => onComplete()
        });
      }
    });

    // 1. Button pulse and shoot sparks
    tl.to(btnRef.current, {
      scale: 0.9,
      boxShadow: '0 0 40px rgba(229, 57, 53, 1), inset 0 0 20px rgba(0,0,0,0.8)',
      duration: 0.1,
      yoyo: true,
      repeat: 1
    }, 0);

    tl.to(sparksRef.current, {
      opacity: 1,
      scaleX: 5,
      x: (i) => Math.cos(i * (Math.PI * 2 / 8)) * 300,
      y: (i) => Math.sin(i * (Math.PI * 2 / 8)) * 300,
      duration: 0.5,
      ease: 'power3.out'
    }, 0.1);

    tl.to(sparksRef.current, {
      opacity: 0,
      duration: 0.2
    }, 0.4);

    // 2. Fade out button
    tl.to(btnRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        if(btnRef.current) btnRef.current.style.display = 'none';
      }
    }, 0.5);

    // 3. Energy Shockwave & Implosion
    tl.to(shockwaveRef.current, {
      opacity: 0.5,
      scale: 20,
      duration: 1.0,
      ease: 'power3.out',
      onStart: () => setPowerState(1) // Trigger 3D Implosion
    }, 0.6);

    tl.to(shockwaveRef.current, {
      opacity: 0,
      duration: 0.5
    }, 1.0);

    // 4. Screen Flash (Boom!)
    tl.to(flashOverlayRef.current, {
      opacity: 1,
      duration: 0.1,
      onStart: () => {
        setPowerState(2);
        // Hide particles, show ESP32
        if (particleGroupRef.current) particleGroupRef.current.visible = false;
        if (esp32GroupRef.current) esp32GroupRef.current.visible = true;
      }
    }, 2.5);

    // Fade flash slightly for the first cut
    tl.to(flashOverlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out'
    }, 2.6);

    // 5. Cinematic 4-Angle Panning Reveal
    gsap.set(esp32GroupRef.current?.rotation || {}, { x: Math.PI / 4, y: -Math.PI / 4, z: 0 }); // Top-Left Angle
    gsap.set(esp32GroupRef.current?.position || {}, { x: 0, y: 0, z: -3 });
    gsap.set(esp32GroupRef.current?.scale || {}, { x: 1.5, y: 1.5, z: 1.5 });

    // Sweep 1: Move to Front-Right (Angle 1 -> 2)
    tl.to(esp32GroupRef.current.rotation, {
      x: 0.1,         
      y: Math.PI / 4, 
      z: 0.1,
      duration: 1.5,
      ease: 'power1.inOut'
    }, 2.6);
    
    tl.to(esp32GroupRef.current.position, {
      x: -0.5,
      y: 0.2,
      z: 1,           
      duration: 1.5,
      ease: 'power1.inOut'
    }, 2.6);

    // Sweep 2: Move to Back-Right (Angle 2 -> 3)
    tl.to(esp32GroupRef.current.rotation, {
      x: 0.2,         
      y: Math.PI - (Math.PI / 4), 
      z: 0,
      duration: 1.5,
      ease: 'power1.inOut'
    }, 4.1);
    
    tl.to(esp32GroupRef.current.position, {
      x: 0,
      y: -0.2,
      z: 1.5,           
      duration: 1.5,
      ease: 'power1.inOut'
    }, 4.1);

    // Sweep 3: Move to Left Side Profile Close-up (Angle 3 -> 4)
    tl.to(esp32GroupRef.current.rotation, {
      x: 0,         
      y: -Math.PI / 2, 
      z: -0.1,
      duration: 1.5,
      ease: 'power1.inOut'
    }, 5.6);
    
    tl.to(esp32GroupRef.current.position, {
      x: 0.5,
      y: 0,
      z: 2.5,           
      duration: 1.5,
      ease: 'power1.inOut'
    }, 5.6);

    // 6. Dive into the Memory / CPU Core (Angle 4 -> Dive)
    tl.to(esp32GroupRef.current.rotation, {
      x: -0.2,         
      y: 0, 
      z: 0,
      duration: 1.5,
      ease: 'power2.in'
    }, 7.1);

    tl.to(esp32GroupRef.current.position, {
      x: 0,
      y: 0,
      z: 15, // Plunge camera into the chip
      duration: 1.5,
      ease: 'power3.in'
    }, 7.1);
    
    // Screen flashes white right as we penetrate the core
    tl.to(flashOverlayRef.current, {
      opacity: 1,
      duration: 0.1,
      onStart: () => {
        // Swap scenes! Hide ESP32, Show Memory Gallery
        if (esp32GroupRef.current) esp32GroupRef.current.visible = false;
        setShowGallery(true);
      }
    }, 8.4);

    tl.to(flashOverlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 8.5);

    // 7. Fly through the 3D Product Gallery Tunnel
    gsap.set(cameraGroupRef.current?.position || {}, { x: 0, y: 0, z: 0 });
    
    tl.to(cameraGroupRef.current?.position || {}, {
      z: -25, // Fly forward through the Z axis
      duration: 6.0,
      ease: 'power1.inOut'
    }, 8.5);

    // 8. Final Fade Out to Main Site
    tl.to(flashOverlayRef.current, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.inOut'
    }, 13.5);
  };


  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Intense White Screen Flash */}
      <div 
        ref={flashOverlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--bg-card)',
          zIndex: 9998,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
      

      {/* Energy Shockwave */}
      <div 
        ref={shockwaveRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(41,151,255,0.8) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />

      {/* 3D WebGL Canvas for the AI Core & ESP32 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
          <spotLight position={[-5, 5, 5]} intensity={3} color="#00ffff" penumbra={1} />
          <spotLight position={[5, -5, -5]} intensity={2} color="#0066ff" penumbra={1} />
          
          <group ref={cameraGroupRef}>
            <group ref={particleGroupRef}>
              <ParticleCore powerState={powerState} />
            </group>
            
            <ESP32Model groupRef={esp32GroupRef} />
            
            <MemoryGallery isVisible={showGallery} />
          </group>

          {/* Cinematic Post-Processing Effects */}
          <EffectComposer>
            <DepthOfField focusDistance={0.015} focalLength={0.05} bokehScale={6} height={480} />
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Intro Text & Button */}
      {!hasStarted && (
        <div style={{ position: 'absolute', bottom: '15%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2
            style={{
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: '30px',
              opacity: 0,
              animation: 'fadeIn 1s 0.5s forwards'
            }}
          >
            The Intelligence of Things
          </h2>
          {/* Supercar Engine Start Button */}
          <div style={{ position: 'relative' }}>
            {/* Sparks Container */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                ref={el => sparksRef.current[i] = el}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #ffeb3b, transparent)',
                  transformOrigin: '0% 50%',
                  transform: `translate(0, -50%) rotate(${i * 45}deg)`,
                  opacity: 0,
                  zIndex: -1,
                  pointerEvents: 'none',
                  boxShadow: '0 0 10px #ffeb3b'
                }}
              />
            ))}
            
            <button
              ref={btnRef}
              onClick={startExperience}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #ff4b4b 0%, #d32f2f 60%, #b71c1c 100%)',
                border: 'none',
                boxShadow: '0 0 15px rgba(211, 47, 47, 0.8), inset 0 0 10px rgba(0,0,0,0.5), 0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 20px 30px rgba(0,0,0,0.8)',
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 800,
                fontSize: '0.9rem',
                lineHeight: 1.2,
                cursor: 'pointer',
                opacity: 0,
                animation: 'fadeInUp 1s 1s forwards',
                transition: 'transform 0.1s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '1px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                pointerEvents: 'auto'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 75, 75, 1), inset 0 0 5px rgba(0,0,0,0.3), 0 0 0 6px #1a1a1a, 0 0 0 8px #333';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 0 15px rgba(211, 47, 47, 0.8), inset 0 0 10px rgba(0,0,0,0.5), 0 0 0 6px #1a1a1a, 0 0 0 8px #333, 0 20px 30px rgba(0,0,0,0.8)';
              }}
            >
              <span style={{ fontSize: '0.6rem', color: '#ffb3b3', marginBottom: '2px' }}>ENGINE</span>
              START
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
