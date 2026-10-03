// Product Illustrations - SVG-based cinematic product visuals
// Each product gets a unique, detailed SVG illustration

import { getProductImage } from '@/data/productImages';

export const PRODUCT_ILLUSTRATIONS = {

  /* ── ESP32-S3 Pro ── */
  'esp32-s3-pro': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* PCB Body */}
      <rect x="60" y="80" width="180" height="140" rx="8" fill="#1a2f1a" stroke="#2d4a2d" strokeWidth="2"/>
      {/* PCB Silkscreen layer */}
      <rect x="65" y="85" width="170" height="130" rx="6" fill="#1e361e"/>
      {/* Chip - ESP32-S3 */}
      <rect x="110" y="115" width="80" height="70" rx="4" fill="#111" stroke="#333" strokeWidth="1.5"/>
      <rect x="116" y="121" width="68" height="58" rx="2" fill="#0a0a0a" stroke="#2997ff" strokeWidth="0.8"/>
      <text x="150" y="148" textAnchor="middle" fill="#2997ff" fontSize="7" fontFamily="monospace" fontWeight="bold">ESP32</text>
      <text x="150" y="158" textAnchor="middle" fill="#2997ff" fontSize="6" fontFamily="monospace">-S3</text>
      <text x="150" y="168" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">240MHz</text>
      {/* USB-C Port */}
      <rect x="60" y="140" width="14" height="20" rx="3" fill="#444" stroke="#666" strokeWidth="1"/>
      <rect x="64" y="144" width="6" height="12" rx="1.5" fill="#222"/>
      {/* LED */}
      <circle cx="85" cy="95" r="4" fill="#2997ff" opacity="0.9"/>
      <circle cx="85" cy="95" r="2" fill="#fff" opacity="0.8"/>
      <circle cx="85" cy="95" r="6" fill="none" stroke="#2997ff" strokeWidth="0.8" opacity="0.5"/>
      {/* Reset button */}
      <rect x="224" y="130" width="14" height="10" rx="2" fill="#333" stroke="#555" strokeWidth="1"/>
      <rect x="226" y="132" width="10" height="6" rx="1" fill="#222"/>
      {/* GPIO pins - top */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map((i) => (
        <rect key={`t${i}`} x={65 + i * 9.5} y="80" width="3" height="10" rx="0.5" fill="#c8a840" stroke="#a88020" strokeWidth="0.5"/>
      ))}
      {/* GPIO pins - bottom */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map((i) => (
        <rect key={`b${i}`} x={65 + i * 9.5} y="210" width="3" height="10" rx="0.5" fill="#c8a840" stroke="#a88020" strokeWidth="0.5"/>
      ))}
      {/* Antenna trace */}
      <path d="M 210 90 L 235 90 L 235 110 L 225 110 L 225 120 L 235 120" stroke="#2997ff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      {/* Capacitors */}
      <rect x="170" y="98" width="8" height="5" rx="1" fill="#555"/>
      <rect x="185" y="98" width="8" height="5" rx="1" fill="#555"/>
      <rect x="170" y="200" width="8" height="5" rx="1" fill="#555"/>
      {/* Glow effect */}
      <circle cx="150" cy="150" r="50" fill="url(#esp32glow)" opacity="0.3"/>
      <defs>
        <radialGradient id="esp32glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2997ff" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#2997ff" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── Raspberry Pi 5 ── */
  'rpi5-8gb': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* PCB */}
      <rect x="30" y="50" width="240" height="200" rx="10" fill="#0d2d0d" stroke="#1a4a1a" strokeWidth="2.5"/>
      <rect x="36" y="56" width="228" height="188" rx="7" fill="#0f3010"/>
      {/* BCM2712 Chip */}
      <rect x="110" y="95" width="80" height="80" rx="5" fill="#111" stroke="#333" strokeWidth="1.5"/>
      <rect x="115" y="100" width="70" height="70" rx="3" fill="#0a0a0a"/>
      <text x="150" y="132" textAnchor="middle" fill="#30d158" fontSize="7" fontFamily="monospace" fontWeight="bold">BCM2712</text>
      <text x="150" y="143" textAnchor="middle" fill="#30d158" fontSize="6" fontFamily="monospace">Cortex-A76</text>
      <text x="150" y="154" textAnchor="middle" fill="#6e6e73" fontSize="5.5" fontFamily="monospace">2.4GHz Quad</text>
      {/* RAM chip */}
      <rect x="72" y="105" width="30" height="20" rx="3" fill="#1a1a2e" stroke="#30d158" strokeWidth="1"/>
      <text x="87" y="116" textAnchor="middle" fill="#30d158" fontSize="5" fontFamily="monospace">8GB</text>
      <text x="87" y="122" textAnchor="middle" fill="#6e6e73" fontSize="4" fontFamily="monospace">LPDDR4X</text>
      {/* USB-A ports x2 */}
      <rect x="250" y="75" width="20" height="28" rx="2" fill="#333" stroke="#555" strokeWidth="1"/>
      <rect x="253" y="78" width="14" height="10" rx="1" fill="#222"/>
      <rect x="253" y="91" width="14" height="10" rx="1" fill="#222"/>
      {/* USB-A ports x2 more */}
      <rect x="250" y="110" width="20" height="28" rx="2" fill="#333" stroke="#555" strokeWidth="1"/>
      <rect x="253" y="113" width="14" height="10" rx="1" fill="#222"/>
      <rect x="253" y="126" width="14" height="10" rx="1" fill="#222"/>
      {/* HDMI ports */}
      <rect x="250" y="148" width="20" height="16" rx="2" fill="#444" stroke="#666" strokeWidth="1"/>
      <rect x="252" y="150" width="16" height="12" rx="1" fill="#222"/>
      <rect x="250" y="170" width="20" height="16" rx="2" fill="#444" stroke="#666" strokeWidth="1"/>
      <rect x="252" y="172" width="16" height="12" rx="1" fill="#222"/>
      {/* USB-C Power */}
      <rect x="250" y="195" width="20" height="14" rx="3" fill="#555" stroke="#777" strokeWidth="1"/>
      <rect x="254" y="198" width="12" height="8" rx="2" fill="#222"/>
      {/* GPIO Header */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((i) => (
        <g key={`gpio${i}`}>
          <rect x={40 + i * 10} y="48" width="4" height="12" rx="0.5" fill="#c8a840"/>
          <rect x={40 + i * 10} y="60" width="4" height="12" rx="0.5" fill="#c8a840"/>
        </g>
      ))}
      {/* MicroSD slot */}
      <rect x="40" y="232" width="35" height="18" rx="3" fill="#333" stroke="#555" strokeWidth="1"/>
      <rect x="43" y="235" width="29" height="12" rx="1.5" fill="#222"/>
      {/* CSI/DSI connectors */}
      <rect x="90" y="232" width="50" height="8" rx="2" fill="#1a3a1a" stroke="#2a5a2a" strokeWidth="1"/>
      <rect x="150" y="232" width="50" height="8" rx="2" fill="#1a3a1a" stroke="#2a5a2a" strokeWidth="1"/>
      {/* Glow */}
      <circle cx="150" cy="135" r="55" fill="url(#rpiglow)" opacity="0.25"/>
      <defs>
        <radialGradient id="rpiglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#30d158" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#30d158" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── Arduino GIGA ── */
  'arduino-giga-wifi': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* PCB */}
      <rect x="20" y="40" width="260" height="220" rx="10" fill="#00274d" stroke="#004080" strokeWidth="2"/>
      <rect x="26" y="46" width="248" height="208" rx="7" fill="#002f5c"/>
      {/* STM32H747 chip */}
      <rect x="100" y="95" width="100" height="100" rx="5" fill="#111" stroke="#2997ff" strokeWidth="1.5"/>
      <rect x="106" y="101" width="88" height="88" rx="3" fill="#080808"/>
      <text x="150" y="142" textAnchor="middle" fill="#2997ff" fontSize="7" fontFamily="monospace" fontWeight="bold">STM32H747XI</text>
      <text x="150" y="153" textAnchor="middle" fill="#2997ff" fontSize="6" fontFamily="monospace">M7 480MHz</text>
      <text x="150" y="163" textAnchor="middle" fill="#2997ff" fontSize="6" fontFamily="monospace">M4 240MHz</text>
      <text x="150" y="174" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">Dual Core</text>
      {/* WiFi module */}
      <rect x="38" y="105" width="50" height="35" rx="4" fill="#111" stroke="#888" strokeWidth="1"/>
      <text x="63" y="120" textAnchor="middle" fill="#888" fontSize="5.5" fontFamily="monospace">Murata</text>
      <text x="63" y="130" textAnchor="middle" fill="#888" fontSize="5.5" fontFamily="monospace">WiFi+BT</text>
      {/* USB-C */}
      <rect x="18" y="165" width="14" height="20" rx="3" fill="#444" stroke="#666" strokeWidth="1"/>
      <rect x="21" y="168" width="8" height="14" rx="1.5" fill="#222"/>
      {/* Power jack */}
      <circle cx="140" cy="44" r="10" fill="#333" stroke="#555" strokeWidth="1.5"/>
      <circle cx="140" cy="44" r="5" fill="#111"/>
      {/* Top GPIO pins */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((i) => (
        <rect key={`a${i}`} x={30 + i * 10} y="42" width="3.5" height="12" rx="0.5" fill="#c8a840"/>
      ))}
      {/* Bottom GPIO pins */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((i) => (
        <rect key={`c${i}`} x={30 + i * 10} y="248" width="3.5" height="12" rx="0.5" fill="#c8a840"/>
      ))}
      {/* Glow */}
      <circle cx="150" cy="145" r="60" fill="url(#arduinoglow)" opacity="0.2"/>
      <defs>
        <radialGradient id="arduinoglow">
          <stop offset="0%" stopColor="#2997ff" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#2997ff" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── LiDAR ── */
  'lidar-tof-matrix': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circular LiDAR body */}
      <circle cx="150" cy="150" r="90" fill="#141414" stroke="#333" strokeWidth="2"/>
      <circle cx="150" cy="150" r="82" fill="#1a1a1a" stroke="#222" strokeWidth="1.5"/>
      {/* Motor/rotation ring */}
      <circle cx="150" cy="150" r="65" fill="none" stroke="#30d158" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
      {/* Laser emitter */}
      <circle cx="150" cy="150" r="30" fill="#111" stroke="#30d158" strokeWidth="2"/>
      <circle cx="150" cy="150" r="22" fill="#0a0a0a" stroke="#1a4a1a" strokeWidth="1"/>
      <circle cx="150" cy="150" r="12" fill="#30d158" opacity="0.8"/>
      <circle cx="150" cy="150" r="6" fill="#fff" opacity="0.9"/>
      {/* Scan beams */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Number((150 + Math.cos(rad) * 32).toFixed(2));
        const y1 = Number((150 + Math.sin(rad) * 32).toFixed(2));
        const x2 = Number((150 + Math.cos(rad) * 78).toFixed(2));
        const y2 = Number((150 + Math.sin(rad) * 78).toFixed(2));
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#30d158" strokeWidth={i === 0 ? "2.5" : "0.8"}
            opacity={i === 0 ? 0.9 : 0.3} strokeLinecap="round"/>
        );
      })}
      {/* Active beam */}
      <line x1="150" y1="118" x2="150" y2="60" stroke="#30d158" strokeWidth="3" opacity="0.9" strokeLinecap="round"/>
      <circle cx="150" cy="60" r="4" fill="#30d158" opacity="0.8"/>
      {/* Connector */}
      <rect x="134" y="234" width="32" height="16" rx="4" fill="#222" stroke="#444" strokeWidth="1"/>
      {[0,1,2,3].map((i) => (
        <rect key={i} x={138 + i * 7} y="237" width="3" height="10" rx="0.5" fill="#c8a840"/>
      ))}
      {/* Glow */}
      <circle cx="150" cy="150" r="40" fill="url(#lidarglow)" opacity="0.5"/>
      <defs>
        <radialGradient id="lidarglow">
          <stop offset="0%" stopColor="#30d158" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#30d158" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── BME688 Gas Sensor ── */
  'bme688-ai-env': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tiny breakout PCB */}
      <rect x="90" y="110" width="120" height="80" rx="6" fill="#1e1e2e" stroke="#333" strokeWidth="1.5"/>
      {/* BME688 chip (tiny!) */}
      <rect x="128" y="128" width="44" height="44" rx="4" fill="#111" stroke="#bf5af2" strokeWidth="1.5"/>
      <rect x="133" y="133" width="34" height="34" rx="2" fill="#0a0a0a"/>
      <text x="150" y="149" textAnchor="middle" fill="#bf5af2" fontSize="5.5" fontFamily="monospace" fontWeight="bold">BME688</text>
      <text x="150" y="157" textAnchor="middle" fill="#bf5af2" fontSize="4.5" fontFamily="monospace">Bosch AI</text>
      <text x="150" y="164" textAnchor="middle" fill="#6e6e73" fontSize="4" fontFamily="monospace">4-in-1</text>
      {/* Pins */}
      {[0,1,2,3,4,5].map((i) => (
        <rect key={i} x={98 + i * 16} y="185" width="5" height="14" rx="0.5" fill="#c8a840"/>
      ))}
      {/* Gas molecules floating */}
      {[
        { cx: 80, cy: 90, r: 5, opacity: 0.6, color: '#bf5af2' },
        { cx: 220, cy: 80, r: 4, opacity: 0.5, color: '#bf5af2' },
        { cx: 60, cy: 150, r: 3, opacity: 0.4, color: '#bf5af2' },
        { cx: 240, cy: 130, r: 6, opacity: 0.5, color: '#bf5af2' },
        { cx: 100, cy: 60, r: 3.5, opacity: 0.3, color: '#bf5af2' },
        { cx: 200, cy: 60, r: 4, opacity: 0.35, color: '#bf5af2' },
        { cx: 70, cy: 200, r: 3, opacity: 0.3, color: '#bf5af2' },
        { cx: 230, cy: 190, r: 5, opacity: 0.4, color: '#bf5af2' },
      ].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.color} opacity={p.opacity}/>
      ))}
      {/* Wave lines representing gas detection */}
      <path d="M 50 100 Q 70 85 90 100 Q 110 115 130 100" stroke="#bf5af2" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M 160 100 Q 180 85 200 100 Q 220 115 240 100" stroke="#bf5af2" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M 50 130 Q 65 118 80 130" stroke="#bf5af2" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M 220 130 Q 235 118 250 130" stroke="#bf5af2" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* Temp/Humidity gauges */}
      <rect x="96" y="75" width="24" height="30" rx="4" fill="#111" stroke="#bf5af2" strokeWidth="1" opacity="0.7"/>
      <rect x="99" y="90" width="6" height="12" rx="1" fill="#ff9f0a" opacity="0.8"/>
      <text x="108" y="82" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">°C</text>
      <rect x="180" y="75" width="24" height="30" rx="4" fill="#111" stroke="#bf5af2" strokeWidth="1" opacity="0.7"/>
      <path d="M 186 100 Q 192 88 198 100" stroke="#2997ff" strokeWidth="1.5" fill="rgba(41,151,255,0.1)" opacity="0.8"/>
      <text x="192" y="82" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">%RH</text>
      {/* Glow */}
      <circle cx="150" cy="150" r="50" fill="url(#bmeglow)" opacity="0.3"/>
      <defs>
        <radialGradient id="bmeglow">
          <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#bf5af2" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── LoRaWAN ── */
  'lorawan-node-pro': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* PCB module */}
      <rect x="80" y="100" width="140" height="100" rx="6" fill="#1a1a2e" stroke="#2a2a4e" strokeWidth="1.5"/>
      {/* Semtech SX1262 chip */}
      <rect x="105" y="115" width="60" height="50" rx="4" fill="#111" stroke="#bf5af2" strokeWidth="1.5"/>
      <text x="135" y="137" textAnchor="middle" fill="#bf5af2" fontSize="6" fontFamily="monospace" fontWeight="bold">SX1262</text>
      <text x="135" y="146" textAnchor="middle" fill="#bf5af2" fontSize="5.5" fontFamily="monospace">LoRaWAN</text>
      <text x="135" y="155" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">920 MHz</text>
      {/* Antenna connector */}
      <circle cx="200" cy="110" r="10" fill="#333" stroke="#555" strokeWidth="1.5"/>
      <circle cx="200" cy="110" r="5" fill="#c8a840"/>
      <circle cx="200" cy="110" r="2" fill="#111"/>
      {/* Antenna line up */}
      <line x1="200" y1="100" x2="200" y2="30" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round"/>
      {/* Dipole antenna ends */}
      <line x1="200" y1="30" x2="170" y2="30" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="200" y1="30" x2="230" y2="30" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Radio waves emanating */}
      {[1,2,3,4].map((r) => (
        <path key={r}
          d={`M ${150 - r * 22} ${150 - r * 18} A ${r * 28} ${r * 22} 0 0 1 ${150 + r * 22} ${150 - r * 18}`}
          stroke="#bf5af2" strokeWidth="1.5" fill="none" opacity={0.7 / r} strokeLinecap="round"/>
      ))}
      {/* UART pins */}
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x={92 + i * 16} y="195" width="5" height="14" rx="0.5" fill="#c8a840"/>
      ))}
      {/* LED indicators */}
      <circle cx="180" cy="128" r="4" fill="#30d158" opacity="0.85"/>
      <circle cx="180" cy="128" r="6" fill="none" stroke="#30d158" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="192" cy="128" r="4" fill="#ff9f0a" opacity="0.85"/>
      {/* Range text */}
      <text x="150" y="85" textAnchor="middle" fill="#bf5af2" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.6">15 km</text>
      {/* Glow */}
      <circle cx="150" cy="150" r="55" fill="url(#loraglow)" opacity="0.2"/>
      <defs>
        <radialGradient id="loraglow">
          <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#bf5af2" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── NB-IoT Cellular ── */
  'nbiot-lte-cellular': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Module PCB */}
      <rect x="75" y="85" width="150" height="130" rx="8" fill="#1a2a1a" stroke="#2a4a2a" strokeWidth="1.5"/>
      {/* Quectel BG95 chip */}
      <rect x="100" y="105" width="100" height="80" rx="5" fill="#111" stroke="#30d158" strokeWidth="1.5"/>
      <text x="150" y="138" textAnchor="middle" fill="#30d158" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Quectel BG95</text>
      <text x="150" y="149" textAnchor="middle" fill="#30d158" fontSize="5.5" fontFamily="monospace">NB-IoT + LTE-M</text>
      <text x="150" y="159" textAnchor="middle" fill="#30d158" fontSize="5.5" fontFamily="monospace">GPS / GNSS</text>
      <text x="150" y="168" textAnchor="middle" fill="#6e6e73" fontSize="4.5" fontFamily="monospace">Global</text>
      {/* SIM card slot */}
      <rect x="220" y="120" width="20" height="30" rx="3" fill="#333" stroke="#555" strokeWidth="1"/>
      <rect x="223" y="123" width="14" height="24" rx="2" fill="#222"/>
      <text x="230" y="138" textAnchor="middle" fill="#666" fontSize="4" fontFamily="monospace">SIM</text>
      {/* Antenna connector */}
      <circle cx="90" cy="100" r="8" fill="#333" stroke="#555" strokeWidth="1.5"/>
      <circle cx="90" cy="100" r="4" fill="#c8a840"/>
      <circle cx="90" cy="100" r="1.5" fill="#111"/>
      {/* LTE signal bars */}
      {[1,2,3,4].map((h) => (
        <rect key={h} x={50 + h * 14} y={50 + (4 - h) * 8} width="8" height={h * 8} rx="1.5"
          fill="#30d158" opacity={0.3 + h * 0.15}/>
      ))}
      {/* GPS satellite icon */}
      <circle cx="230" cy="75" r="12" fill="#111" stroke="#ff9f0a" strokeWidth="1.5"/>
      <path d="M 224 75 L 236 75 M 230 69 L 230 81" stroke="#ff9f0a" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="230" cy="75" r="4" fill="#ff9f0a" opacity="0.7"/>
      {/* Pin connections */}
      {[0,1,2,3,4,5,6].map((i) => (
        <rect key={i} x={86 + i * 14} y="210" width="5" height="14" rx="0.5" fill="#c8a840"/>
      ))}
      {/* Glow */}
      <circle cx="150" cy="145" r="55" fill="url(#nbiotglow)" opacity="0.2"/>
      <defs>
        <radialGradient id="nbiotglow">
          <stop offset="0%" stopColor="#30d158" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#30d158" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── GaN BMS Power ── */
  'smart-bms-gan-pack': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* BMS PCB */}
      <rect x="50" y="80" width="200" height="140" rx="8" fill="#2a1a00" stroke="#4a3000" strokeWidth="2"/>
      <rect x="56" y="86" width="188" height="128" rx="5" fill="#321f00"/>
      {/* Main BMS chip */}
      <rect x="100" y="110" width="90" height="70" rx="5" fill="#111" stroke="#ff9f0a" strokeWidth="1.5"/>
      <text x="145" y="141" textAnchor="middle" fill="#ff9f0a" fontSize="6.5" fontFamily="monospace" fontWeight="bold">GaN BMS IC</text>
      <text x="145" y="152" textAnchor="middle" fill="#ff9f0a" fontSize="5.5" fontFamily="monospace">Active Balance</text>
      <text x="145" y="162" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">65W PD 3.0</text>
      {/* USB-C PD port */}
      <rect x="55" y="120" width="18" height="24" rx="4" fill="#444" stroke="#666" strokeWidth="1.5"/>
      <rect x="59" y="124" width="10" height="16" rx="2.5" fill="#222"/>
      {/* Cell balancing indicators */}
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x={207 + 0} y={96 + i * 28} width="28" height="18" rx="3" fill="#111" stroke="#ff9f0a" strokeWidth="1" opacity="0.8"/>
          <rect x={210 + 0} y={99 + i * 28} width={16 + i * 2} height="12" rx="2" fill="#ff9f0a" opacity={0.3 + i * 0.15}/>
          <text x={221} y={108 + i * 28} textAnchor="middle" fill="#ff9f0a" fontSize="4.5" fontFamily="monospace">C{i + 1}</text>
        </g>
      ))}
      {/* Power output terminals */}
      <rect x="66" y="190" width="22" height="20" rx="3" fill="#c00" stroke="#f00" strokeWidth="1.5"/>
      <text x="77" y="203" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace" fontWeight="bold">+</text>
      <rect x="96" y="190" width="22" height="20" rx="3" fill="#111" stroke="#666" strokeWidth="1.5"/>
      <text x="107" y="203" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace" fontWeight="bold">-</text>
      {/* Lightning bolt */}
      <path d="M 155 55 L 140 80 L 152 80 L 137 105 L 158 75 L 146 75 Z" fill="#ff9f0a" opacity="0.85"/>
      {/* Glow */}
      <circle cx="145" cy="145" r="55" fill="url(#bmsglow)" opacity="0.2"/>
      <defs>
        <radialGradient id="bmsglow">
          <stop offset="0%" stopColor="#ff9f0a" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#ff9f0a" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),

  /* ── FOC Servo Motor ── */
  'brushless-foc-actuator': ({ size = 200 }) => (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Motor body - outer ring */}
      <circle cx="150" cy="150" r="100" fill="#1a0a1a" stroke="#2a1a2a" strokeWidth="2.5"/>
      <circle cx="150" cy="150" r="90" fill="#1e0e1e" stroke="#ff375f" strokeWidth="1.5"/>
      {/* Stator windings */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Number((150 + Math.cos(rad) * 55).toFixed(2));
        const y1 = Number((150 + Math.sin(rad) * 55).toFixed(2));
        const x2 = Number((150 + Math.cos(rad) * 82).toFixed(2));
        const y2 = Number((150 + Math.sin(rad) * 82).toFixed(2));
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#ff375f" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>
        );
      })}
      {/* Inner rotor */}
      <circle cx="150" cy="150" r="48" fill="#111" stroke="#333" strokeWidth="2"/>
      <circle cx="150" cy="150" r="40" fill="#0a0a0a" stroke="#ff375f" strokeWidth="1"/>
      {/* Magnetic poles */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = Number((150 + Math.cos(rad) * 28).toFixed(2));
        const cy = Number((150 + Math.sin(rad) * 28).toFixed(2));
        return <circle key={i} cx={cx} cy={cy} r="8"
          fill={i % 2 === 0 ? '#ff375f' : '#2997ff'} opacity="0.85"/>;
      })}
      {/* Center shaft */}
      <circle cx="150" cy="150" r="12" fill="#333" stroke="#555" strokeWidth="2"/>
      <circle cx="150" cy="150" r="6" fill="#111"/>
      {/* Encoder disc */}
      <circle cx="150" cy="150" r="16" fill="none" stroke="#ff375f" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
      {/* Controller board (small) */}
      <rect x="170" y="220" width="80" height="50" rx="5" fill="#1a0a1a" stroke="#ff375f" strokeWidth="1"/>
      <text x="210" y="240" textAnchor="middle" fill="#ff375f" fontSize="5.5" fontFamily="monospace" fontWeight="bold">FOC Controller</text>
      <text x="210" y="250" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">14-bit Encoder</text>
      <text x="210" y="260" textAnchor="middle" fill="#6e6e73" fontSize="5" fontFamily="monospace">CAN Bus 2.0B</text>
      {/* Connector */}
      {[0,1,2,3].map((i) => (
        <rect key={i} x={175 + i * 12} y="265" width="5" height="8" rx="0.5" fill="#c8a840"/>
      ))}
      {/* Glow */}
      <circle cx="150" cy="150" r="55" fill="url(#focglow)" opacity="0.3"/>
      <defs>
        <radialGradient id="focglow">
          <stop offset="0%" stopColor="#ff375f" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#ff375f" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  ),
};

// Pseudo-random generator for unique visuals (Improved Avalanche)
const getSeed = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  // Scramble the bits to avoid similar hashes for sequential strings
  hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
  hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
  return Math.abs(hash ^ (hash >>> 16));
};

export function ProceduralProductIllustration({ productId, size = 200 }) {
  const seed = getSeed(productId || 'default');
  const hue = seed % 360;
  const shapeType = seed % 4; // 0: circle, 1: wide rect, 2: square, 3: tall rect
  const isCircle = shapeType === 0;
  const isWide = shapeType === 1;
  const isTall = shapeType === 3;
  
  const color1 = `hsl(${hue}, 80%, 60%)`;
  const color2 = `hsl(${(hue + 60) % 360}, 70%, 50%)`;
  const bg = `hsl(${hue}, 30%, 15%)`;
  
  // Generate random traces based on seed
  const traces = [];
  const numTraces = (seed % 6) + 4;
  for(let i = 0; i < numTraces; i++) {
    const x1 = ((seed * (i+1)) % 220) + 40;
    const y1 = ((seed * (i+2)) % 220) + 40;
    const x2 = ((seed * (i+3)) % 220) + 40;
    const y2 = ((seed * (i+4)) % 220) + 40;
    traces.push(
      <path key={i} d={`M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`} stroke={color1} strokeWidth="1.5" fill="none" opacity="0.6"/>
    );
  }

  // Generate pins
  const pins = [];
  const numPins = (seed % 8) + 6; // 6 to 13 pins
  for(let i = 0; i < numPins; i++) {
    const px = 70 + (i * 12);
    const py = 70 + (i * 12);
    
    if (isWide || shapeType === 2) {
      // Top/Bottom pins
      pins.push(<rect key={`t${i}`} x={px} y={isWide ? 70 : 80} width="4" height="12" rx="1" fill="#c8a840" />);
      pins.push(<rect key={`b${i}`} x={px} y={isWide ? 220 : 210} width="4" height="12" rx="1" fill="#c8a840" />);
    } else if (isTall) {
      // Left/Right pins
      pins.push(<rect key={`l${i}`} x={70} y={py} width="12" height="4" rx="1" fill="#c8a840" />);
      pins.push(<rect key={`r${i}`} x={220} y={py} width="12" height="4" rx="1" fill="#c8a840" />);
    }
  }
  
  // Format the text label
  let labelText = productId.replace('gen-product-', '').replace('product-', '').substring(0, 6).toUpperCase();
  if (labelText.length < 3) labelText = 'IOT-' + labelText;

  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <circle cx="150" cy="150" r="70" fill={color1} opacity="0.1" filter="blur(20px)" />
      
      {/* Traces */}
      {traces}
      
      {/* Main Body */}
      {isCircle ? (
        <>
          <circle cx="150" cy="150" r="75" fill={bg} stroke={color2} strokeWidth="2" />
          <circle cx="150" cy="150" r="60" fill="#111" stroke={color1} strokeWidth="1" />
          <circle cx="150" cy="150" r="20" fill={color2} opacity="0.8" />
        </>
      ) : (
        <>
          {pins}
          <rect x={isWide ? 60 : 70} y={isWide ? 80 : 90} width={isWide ? 180 : 160} height={isWide ? 140 : 120} rx="8" fill={bg} stroke={color2} strokeWidth="2" />
          <rect x={isWide ? 90 : 100} y={isWide ? 110 : 115} width={isWide ? 120 : 100} height={isWide ? 80 : 70} rx="4" fill="#111" stroke={color1} strokeWidth="1.5" />
          <rect x={isWide ? 100 : 110} y={isWide ? 120 : 125} width={isWide ? 100 : 80} height={isWide ? 60 : 50} rx="2" fill="#0a0a0a" />
        </>
      )}
      
      {/* Decorative dots */}
      <circle cx={isWide ? 75 : 85} cy={isWide ? 95 : 105} r="4" fill={color1} />
      <circle cx={isWide ? 225 : 215} cy={isWide ? 205 : 195} r="4" fill={color2} />
      
      {/* ID Text */}
      <text x="150" y="155" textAnchor="middle" fill={color1} fontSize="12" fontFamily="monospace" fontWeight="bold">
        {productId.substring(0, 6).toUpperCase()}
      </text>
    </svg>
  );
}

// Fallback illustration
export function ProductIllustration({ productId, category, size = 200 }) {
  // Prefer the photorealistic studio render when one exists
  const imageSrc = getProductImage(productId);
  if (imageSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt=""
        loading="lazy"
        width={size}
        height={size}
        className="product-photo"
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: Math.round(size * 0.12) }}
      />
    );
  }

  // Use specific illustration if we hand-coded one
  const IllustrationComponent = PRODUCT_ILLUSTRATIONS[productId];
  if (IllustrationComponent) {
    return <IllustrationComponent size={size} />;
  }
  
  // Otherwise generate a totally unique procedural illustration based on the product ID!
  return <ProceduralProductIllustration productId={productId} size={size} />;
}
