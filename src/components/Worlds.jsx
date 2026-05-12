import React from 'react';

// ============ BACKGROUND SCENES (full game-world backgrounds, not just illustrations) ============

export function GameWorld({ type, children }) {
  const worlds = {
    lab: <LabWorld />,
    diner: <DinerWorld />,
    warehouse: <WarehouseWorld />,
    lighthouse: <LighthouseWorld />,
    library: <LibraryWorld />,
    archive: <ArchiveWorld />,
    evidence_room: <EvidenceRoomWorld />
  };
  return (
    <div className="game-world">
      {worlds[type]}
      <div className="game-world-overlay">{children}</div>
    </div>
  );
}

export function LabWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1428" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
        <radialGradient id="lw-lamp" cx="0.5" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="#f4c062" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f4c062" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lw-sky)" />
      {/* Back wall with posters */}
      <rect x="0" y="0" width="800" height="280" fill="#1a1422" opacity="0.7" />
      <rect x="80" y="60" width="70" height="90" fill="#8b2635" opacity="0.6" />
      <rect x="82" y="62" width="66" height="86" fill="#2a1a1a" />
      <text x="115" y="100" textAnchor="middle" fill="#f4e8b8" fontFamily="Oswald" fontSize="12" fontWeight="700">WANTED</text>
      <rect x="620" y="40" width="100" height="70" fill="#1a2428" />
      <text x="670" y="70" textAnchor="middle" fill="#4af27a" fontFamily="JetBrains Mono" fontSize="10">PYTHON</text>
      <text x="670" y="85" textAnchor="middle" fill="#4af27a" fontFamily="JetBrains Mono" fontSize="8">v3.12.1</text>
      {/* Pipes */}
      <rect x="0" y="20" width="800" height="6" fill="#2a2a3a" />
      <rect x="0" y="26" width="800" height="2" fill="#1a1a24" />
      {/* Floor */}
      <rect y="280" width="800" height="120" fill="#1a0f08" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 40} y="280" width="40" height="2" fill="#2a1a10" />
      ))}
      {/* Desk lamp pool */}
      <ellipse cx="400" cy="300" rx="300" ry="60" fill="url(#lw-lamp)" />
      {/* Desk */}
      <rect x="150" y="260" width="500" height="20" fill="#4a3018" />
      <rect x="150" y="256" width="500" height="6" fill="#6a4820" />
      <rect x="165" y="280" width="10" height="80" fill="#2a1a08" />
      <rect x="625" y="280" width="10" height="80" fill="#2a1a08" />
      {/* Left computer */}
      <rect x="190" y="200" width="80" height="60" fill="#0a0a14" stroke="#2a2420" strokeWidth="2" />
      <rect x="195" y="205" width="70" height="48" fill="#0a1a1a" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x="200" y={215 + i * 8} width={30 + i * 5} height="2" fill="#4af27a" opacity="0.7" />
      ))}
      <rect x="200" y="245" width="3" height="2" fill="#4af27a">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
      {/* Coffee cup */}
      <rect x="300" y="245" width="18" height="16" fill="#6a4a2a" />
      <ellipse cx="309" cy="245" rx="9" ry="3" fill="#1a0f08" />
      <path d="M 305 243 Q 303 235 306 228" stroke="#aaa" strokeWidth="1" fill="none" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
      </path>
      {/* Papers scattered */}
      <rect x="350" y="248" width="30" height="14" fill="#e8e0cf" transform="rotate(-8 365 255)" />
      <rect x="380" y="252" width="30" height="14" fill="#d4c9b0" transform="rotate(5 395 259)" />
      {/* Hanging lamp */}
      <line x1="400" y1="0" x2="400" y2="140" stroke="#2a2420" strokeWidth="2" />
      <path d="M 370 140 L 430 140 L 420 170 L 380 170 Z" fill="#3a2818" stroke="#1a1410" strokeWidth="1" />
      <ellipse cx="400" cy="170" rx="20" ry="3" fill="#f4c062" opacity="0.9" />
    </svg>
  );
}

export function DinerWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a2a" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#dw-bg)" />
      {/* Back window with city rain */}
      <rect x="50" y="40" width="700" height="220" fill="#0a0a18" stroke="#3a2a3a" strokeWidth="3" />
      {/* Distant city lights */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={70 + (i * 17) % 660} y={60 + (i * 23) % 180} width="3" height="4" fill="#f4c062" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* Rain streaks on window */}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i} x1={70 + (i * 24) % 660} y1={60 + (i * 7) % 40}
          x2={70 + (i * 24) % 660 - 3} y2={150 + (i * 7) % 40}
          stroke="#4a5a7a" strokeWidth="1" opacity="0.4" />
      ))}
      {/* Neon signs */}
      <g transform="translate(140, 100)">
        <rect x="-4" y="-4" width="90" height="40" fill="#0a0612" stroke="#ff2a6d" strokeWidth="2" />
        <text x="41" y="25" textAnchor="middle" fill="#ff2a6d" fontFamily="Oswald" fontSize="20" fontWeight="700" letterSpacing="3">
          OPEN
          <animate attributeName="opacity" values="1;0.6;1;1;0.9;1" dur="3s" repeatCount="indefinite" />
        </text>
      </g>
      <g transform="translate(500, 80)">
        <text x="100" y="40" textAnchor="middle" fill="#f4c062" fontFamily="Playfair Display" fontSize="36" fontStyle="italic" fontWeight="700">
          Warm Loop
        </text>
        <text x="100" y="60" textAnchor="middle" fill="#f4c062" fontFamily="Oswald" fontSize="12" letterSpacing="4">DINER — 24 HRS</text>
        <line x1="40" y1="48" x2="160" y2="48" stroke="#f4c062" strokeWidth="1" />
      </g>
      {/* Floor (checkered) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={i * 20} y="300" width="20" height="20" fill={i % 2 ? "#2a1f24" : "#1a1014"} />
      ))}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={`r${i}`} x={i * 20} y="320" width="20" height="20" fill={i % 2 ? "#1a1014" : "#2a1f24"} />
      ))}
      {/* Counter */}
      <rect x="0" y="260" width="800" height="40" fill="#3a2418" />
      <rect x="0" y="256" width="800" height="6" fill="#5a3a28" />
      {/* Counter stools */}
      {[100, 220, 340, 580, 700].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="290" r="14" fill="#8b2635" />
          <circle cx={x} cy="290" r="10" fill="#6e1f12" />
          <rect x={x - 3} y="290" width="6" height="40" fill="#3a2418" />
          <rect x={x - 20} y="330" width="40" height="4" fill="#2a1818" />
        </g>
      ))}
      {/* Coffee cups, plates */}
      <rect x="380" y="248" width="14" height="12" fill="#f0e8d8" />
      <ellipse cx="387" cy="248" rx="7" ry="2.5" fill="#3a2418" />
      <ellipse cx="460" cy="256" rx="14" ry="3" fill="#e0d0b0" />
      {/* Pendant lamps */}
      {[200, 400, 600].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2="30" stroke="#1a1010" strokeWidth="1" />
          <path d={`M ${x - 20} 30 L ${x + 20} 30 L ${x + 14} 55 L ${x - 14} 55 Z`} fill="#6e1f12" stroke="#2a0a0a" strokeWidth="1" />
          <ellipse cx={x} cy="55" rx="14" ry="3" fill="#f4c062" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

export function WarehouseWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ww-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a12" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <radialGradient id="ww-light" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f4c062" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f4c062" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#ww-bg)" />
      {/* Flashlight pool */}
      <ellipse cx="400" cy="260" rx="350" ry="130" fill="url(#ww-light)" />
      {/* Steel girders */}
      <rect x="0" y="40" width="800" height="8" fill="#1a1814" />
      <rect x="0" y="44" width="800" height="2" fill="#0a0808" />
      {[120, 380, 680].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="0" width="12" height="300" fill="#1a1814" />
          <rect x={x - 8} y="30" width="16" height="20" fill="#0a0808" />
        </g>
      ))}
      {/* Floor */}
      <rect y="300" width="800" height="100" fill="#0a0a0a" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={i * 50} y1="300" x2={i * 50} y2="400" stroke="#1a1818" strokeWidth="0.5" />
      ))}
      {/* Server racks (left and right) */}
      {[50, 160, 590, 700].map((x, i) => (
        <g key={i}>
          <rect x={x} y="120" width="80" height="180" fill="#1a1818" stroke="#2a2828" strokeWidth="1.5" />
          <rect x={x} y="118" width="80" height="4" fill="#2a2828" />
          {Array.from({ length: 12 }).map((_, j) => (
            <circle key={j} cx={x + 15 + (j % 3) * 20} cy={140 + Math.floor(j / 3) * 40}
              r="2" fill={j % 4 === 0 ? "#4af27a" : j % 3 === 0 ? "#ff2a6d" : "#f4c062"}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1 + (j % 3)}s`} begin={`${i * 0.2 + j * 0.1}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      ))}
      {/* Safe in the middle */}
      <rect x="340" y="170" width="120" height="120" fill="#2a1f1a" stroke="#5a4a30" strokeWidth="3" />
      <rect x="340" y="168" width="120" height="8" fill="#3a2a1a" />
      <circle cx="400" cy="230" r="25" fill="none" stroke="#5a4a30" strokeWidth="2" />
      <circle cx="400" cy="230" r="18" fill="#1a1008" stroke="#3a2a18" strokeWidth="1" />
      <line x1="400" y1="230" x2="400" y2="215" stroke="#f4c062" strokeWidth="2" />
      <circle cx="400" cy="230" r="3" fill="#f4c062" />
      {/* Tick marks around dial */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 400 + Math.cos(angle) * 22;
        const y1 = 230 + Math.sin(angle) * 22;
        const x2 = 400 + Math.cos(angle) * 25;
        const y2 = 230 + Math.sin(angle) * 25;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a4a30" strokeWidth="1" />;
      })}
      {/* Dust particles */}
      {Array.from({ length: 25 }).map((_, i) => {
        const x = 100 + (i * 29) % 600;
        const y = 80 + (i * 23) % 200;
        return (
          <circle key={i} cx={x} cy={y} r="0.8" fill="#d4c9b0" opacity="0.5">
            <animate attributeName="cy" values={`${y};${y - 50}`} dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

export function LighthouseWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lhw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1a2a" />
          <stop offset="50%" stopColor="#12283f" />
          <stop offset="100%" stopColor="#0a1424" />
        </linearGradient>
        <radialGradient id="lhw-beam" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff8d4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff8d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lhw-sky)" />
      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <circle key={i} cx={(i * 47) % 800} cy={(i * 13) % 180} r="0.8" fill="#fff">
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3)}s`} begin={`${i * 0.1}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Moon */}
      <circle cx="150" cy="80" r="35" fill="#f4e8b8" opacity="0.2" />
      <circle cx="150" cy="80" r="25" fill="#f4e8b8" opacity="0.4" />
      <circle cx="150" cy="80" r="18" fill="#f4e8b8" opacity="0.85" />
      {/* Sea */}
      <path d="M 0 270 Q 200 262 400 270 T 800 270 L 800 400 L 0 400 Z" fill="#0a1a28" />
      {Array.from({ length: 15 }).map((_, i) => (
        <path key={i} d={`M ${i * 55} ${285 + (i % 3) * 8} Q ${i * 55 + 15} ${282 + (i % 3) * 8} ${i * 55 + 30} ${285 + (i % 3) * 8}`}
          fill="none" stroke="#2a4a6a" strokeWidth="1.2" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur={`${3 + (i % 2)}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* Cliff */}
      <path d="M 400 270 L 420 200 L 480 180 L 580 180 L 620 200 L 800 200 L 800 270 Z" fill="#1a1a20" />
      <path d="M 420 200 L 480 180 L 500 195 L 460 205 Z" fill="#252530" opacity="0.6" />
      {/* Lighthouse tower */}
      <path d="M 490 80 L 540 80 L 548 200 L 482 200 Z" fill="#d8d0c0" />
      {/* Stripes */}
      <rect x="483" y="110" width="66" height="16" fill="#8b2635" />
      <rect x="483" y="150" width="66" height="16" fill="#8b2635" />
      <rect x="483" y="185" width="66" height="15" fill="#8b2635" />
      {/* Windows */}
      <rect x="510" y="135" width="10" height="10" fill="#1a1a20" />
      <rect x="510" y="175" width="10" height="10" fill="#1a1a20" />
      {/* Lamp room */}
      <rect x="478" y="60" width="74" height="24" fill="#1a1a20" />
      <circle cx="515" cy="72" r="12" fill="#fff8d4">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Rotating beam */}
      <g transform="translate(515, 72)">
        <path d="M 0 0 L -350 -120 L -350 120 Z" fill="url(#lhw-beam)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
        </path>
      </g>
      {/* Roof */}
      <path d="M 478 60 L 515 35 L 552 60 Z" fill="#2a1618" />
      {/* Base */}
      <rect x="472" y="196" width="86" height="8" fill="#5a4a30" />
      {/* Rocks */}
      <ellipse cx="450" cy="210" rx="20" ry="6" fill="#2a2530" />
      <ellipse cx="600" cy="215" rx="25" ry="7" fill="#2a2530" />
    </svg>
  );
}

export function ArchiveWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="aw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0814" />
          <stop offset="100%" stopColor="#04030a" />
        </linearGradient>
        <radialGradient id="aw-lamp" cx="0.5" cy="0.4" r="0.55">
          <stop offset="0%" stopColor="#c8b87a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c8b87a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#aw-bg)" />
      {/* Back wall */}
      <rect x="0" y="0" width="800" height="300" fill="#0c0a16" />
      {/* Filing cabinets left */}
      {[10, 90].map((x, ci) => (
        <g key={ci}>
          <rect x={x} y="70" width="72" height="220" fill="#16142a" stroke="#22203a" strokeWidth="1.5" />
          {[0,1,2,3].map(j => (
            <g key={j}>
              <rect x={x+4} y={80+j*52} width="64" height="43" fill="#100e20" stroke="#22203a" strokeWidth="1" />
              <rect x={x+26} y={99+j*52} width="20" height="4" fill="#2e2a50" />
              <circle cx={x+36} cy={101+j*52} r="2.5" fill="#5a5070" />
            </g>
          ))}
        </g>
      ))}
      {/* Filing cabinets right */}
      {[618, 698].map((x, ci) => (
        <g key={ci}>
          <rect x={x} y="70" width="72" height="220" fill="#16142a" stroke="#22203a" strokeWidth="1.5" />
          {[0,1,2,3].map(j => (
            <g key={j}>
              <rect x={x+4} y={80+j*52} width="64" height="43" fill="#100e20" stroke="#22203a" strokeWidth="1" />
              <rect x={x+26} y={99+j*52} width="20" height="4" fill="#2e2a50" />
              <circle cx={x+36} cy={101+j*52} r="2.5" fill="#5a5070" />
            </g>
          ))}
        </g>
      ))}
      {/* Back wall screen */}
      <rect x="290" y="25" width="220" height="145" fill="#0a1018" stroke="#1e3820" strokeWidth="2" />
      <rect x="298" y="33" width="204" height="129" fill="#060e0a" />
      {[
        { t: "def solve(n):",  c: "#4af27a", y: 56 },
        { t: "  if n == 0:",   c: "#f4c062", y: 72 },
        { t: "    return 1",   c: "#4af27a", y: 88 },
        { t: "  return solve(n-1)", c: "#c084fc", y: 104 },
        { t: ">>> RecursionError!", c: "#ff2a6d", y: 122 }
      ].map((l, i) => (
        <text key={i} x="305" y={l.y} fill={l.c} fontFamily="JetBrains Mono" fontSize="9">{l.t}</text>
      ))}
      <rect x="298" y="150" width="204" height="3" fill="#ff2a6d" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
      </rect>
      {/* Overhead lamp */}
      <line x1="400" y1="0" x2="400" y2="22" stroke="#1a1830" strokeWidth="3" />
      <path d="M 362 22 L 438 22 L 428 50 L 372 50 Z" fill="#1a1828" stroke="#2a2840" strokeWidth="1" />
      <ellipse cx="400" cy="50" rx="28" ry="4" fill="#d0c070" opacity="0.95" />
      <ellipse cx="400" cy="280" rx="240" ry="75" fill="url(#aw-lamp)" />
      {/* Floor */}
      <rect y="300" width="800" height="100" fill="#080610" />
      {Array.from({length:16}).map((_,i) => (
        <rect key={i} x={i*50} y="300" width="50" height="1" fill="#12101e" />
      ))}
      {/* Desk */}
      <rect x="200" y="256" width="400" height="18" fill="#1e1a30" stroke="#2a2640" strokeWidth="1.5" />
      <rect x="215" y="274" width="10" height="70" fill="#14122a" />
      <rect x="575" y="274" width="10" height="70" fill="#14122a" />
      {/* Scattered case files */}
      <rect x="260" y="238" width="44" height="20" fill="#e8d8b8" transform="rotate(-6 282 248)" />
      <rect x="310" y="242" width="44" height="20" fill="#d4c8a8" transform="rotate(4 332 252)" />
      <rect x="360" y="238" width="44" height="20" fill="#ecd8c0" transform="rotate(-2 382 248)" />
      <rect x="440" y="242" width="36" height="16" fill="#dcc8b0" transform="rotate(7 458 250)" />
      {/* Floating function keywords */}
      {['def','return','lambda','None','*args'].map((sym,i) => (
        <text key={i} x={180+(i*110)%440} y={170+(i*23)%80} fill="#1e1a4a" fontFamily="JetBrains Mono" fontSize="10" opacity="0.35">
          {sym}
          <animate attributeName="opacity" values="0.35;0.1;0.35" dur={`${4+i}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${170+(i*23)%80};${158+(i*23)%80};${170+(i*23)%80}`} dur={`${4+i}s`} repeatCount="indefinite" />
        </text>
      ))}
    </svg>
  );
}

export function EvidenceRoomWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="erw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1620" />
          <stop offset="100%" stopColor="#080c14" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#erw-bg)" />
      {/* Fluorescent ceiling lights */}
      {[160, 400, 640].map((x,i) => (
        <g key={i}>
          <rect x={x-55} y="8" width="110" height="12" fill="#18202c" stroke="#243040" strokeWidth="1" />
          <rect x={x-51} y="10" width="102" height="8" fill="#d8eeff" opacity="0.85">
            <animate attributeName="opacity" values="0.85;0.65;0.85" dur={`${2+i}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      {/* Evidence shelves left */}
      <rect x="8" y="28" width="130" height="265" fill="#101820" stroke="#1c2830" strokeWidth="1.5" />
      {[0,1,2,3,4].map(j => (
        <g key={j}>
          <rect x="8" y={28+j*53} width="130" height="5" fill="#1c2830" />
          {[0,1,2].map(k => (
            <g key={k}>
              <rect x={16+k*40} y={35+j*53} width="30" height="40" fill="#182030" stroke="#243848" strokeWidth="1" />
              <rect x={18+k*40} y={62+j*53} width="26" height="8" fill="#f0e4a8" opacity="0.75" />
            </g>
          ))}
        </g>
      ))}
      {/* Evidence shelves right */}
      <rect x="662" y="28" width="130" height="265" fill="#101820" stroke="#1c2830" strokeWidth="1.5" />
      {[0,1,2,3,4].map(j => (
        <g key={j}>
          <rect x="662" y={28+j*53} width="130" height="5" fill="#1c2830" />
          {[0,1,2].map(k => (
            <g key={k}>
              <rect x={670+k*40} y={35+j*53} width="30" height="40" fill="#182030" stroke="#243848" strokeWidth="1" />
              <rect x={672+k*40} y={62+j*53} width="26" height="8" fill="#f0e4a8" opacity="0.75" />
            </g>
          ))}
        </g>
      ))}
      {/* Central whiteboard */}
      <rect x="200" y="28" width="400" height="230" fill="#0c1620" stroke="#1e3248" strokeWidth="2" />
      <rect x="208" y="36" width="384" height="214" fill="#0e1e2c" />
      {/* Dictionary diagram: key-value boxes with connection lines */}
      {[
        { k:'"name"',  v:'"Elena"',  x:228, y:60 },
        { k:'"score"', v:'98',       x:390, y:100 },
        { k:'"status"',v:'"SOLVED"', x:500, y:58 },
        { k:'"clues"', v:'[...]',    x:298, y:155 }
      ].map((item,i) => (
        <g key={i}>
          <rect x={item.x} y={item.y} width="80" height="22" fill="#082818" stroke="#1a6038" strokeWidth="1" />
          <text x={item.x+40} y={item.y+14} textAnchor="middle" fill="#4af27a" fontFamily="JetBrains Mono" fontSize="8">{item.k}</text>
          <rect x={item.x+80} y={item.y} width="62" height="22" fill="#181c08" stroke="#404808" strokeWidth="1" />
          <text x={item.x+111} y={item.y+14} textAnchor="middle" fill="#f4c062" fontFamily="JetBrains Mono" fontSize="8">{item.v}</text>
        </g>
      ))}
      {/* Red string lines */}
      <line x1="308" y1="71" x2="428" y2="111" stroke="#ff2a6d" strokeWidth="1.5" opacity="0.55" />
      <line x1="428" y1="111" x2="540" y2="69" stroke="#ff2a6d" strokeWidth="1.5" opacity="0.55" />
      <line x1="308" y1="166" x2="468" y2="111" stroke="#ff2a6d" strokeWidth="1" opacity="0.45" />
      {/* Pushpins */}
      {[[228,60],[390,100],[500,58],[298,155]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#ff2a6d" opacity="0.85" />
      ))}
      <text x="400" y="225" textAnchor="middle" fill="#1e3860" fontFamily="Oswald" fontSize="11" fontWeight="700" letterSpacing="2">EVIDENCE DICTIONARY</text>
      {/* Floor */}
      <rect y="300" width="800" height="100" fill="#080c14" />
      {Array.from({length:20}).map((_,i) => (
        <rect key={i} x={i*40} y="300" width="40" height="1" fill="#10161e" />
      ))}
      {/* Table */}
      <rect x="240" y="264" width="320" height="14" fill="#101820" stroke="#1c2830" strokeWidth="1.5" />
      <rect x="256" y="278" width="10" height="64" fill="#0a1018" />
      <rect x="534" y="278" width="10" height="64" fill="#0a1018" />
      {/* Laptop on table */}
      <rect x="338" y="234" width="124" height="32" fill="#18202c" stroke="#2a3848" strokeWidth="1.5" />
      <rect x="344" y="240" width="112" height="22" fill="#06121c" />
      <text x="400" y="254" textAnchor="middle" fill="#4af27a" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700">CASE: SOLVED
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </text>
      <rect x="358" y="266" width="84" height="5" fill="#18202c" stroke="#2a3848" strokeWidth="1" />
    </svg>
  );
}

export function LibraryWorld() {
  return (
    <svg className="world-bg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lib-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f1a" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
        <radialGradient id="lib-candle" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f4c062" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f4c062" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lib-bg)" />
      {/* Floor */}
      <rect y="310" width="800" height="90" fill="#2a1a18" />
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={i} x={i * 28} y="310" width="28" height="2" fill="#3a2418" />
      ))}
      {/* Shelves */}
      {[20, 160, 540, 680].map((x, idx) => (
        <g key={idx}>
          <rect x={x} y="50" width="100" height="260" fill="#3a2418" stroke="#1a0f08" strokeWidth="2" />
          {[100, 150, 200, 250].map((y, i) => (
            <rect key={i} x={x} y={y} width="100" height="4" fill="#1a0f08" />
          ))}
          {Array.from({ length: 40 }).map((_, i) => {
            const shelf = Math.floor(i / 10);
            const pos = i % 10;
            const colors = ['#6e1f12', '#2a4a6a', '#5a4a30', '#3a2a3a', '#1a3a2a', '#6a3a2a', '#4a2a20'];
            return (
              <rect key={i} x={x + 3 + pos * 9.5} y={55 + shelf * 50}
                width={8 + (i % 2)} height={44 - (i % 3) * 2} fill={colors[i % colors.length]} />
            );
          })}
        </g>
      ))}
      {/* Central hidden doorway glow */}
      <rect x="340" y="100" width="120" height="210" fill="#000" />
      <rect x="345" y="105" width="110" height="200" fill="url(#lib-candle)" />
      <rect x="332" y="98" width="8" height="214" fill="#1a0f08" />
      <rect x="460" y="98" width="8" height="214" fill="#1a0f08" />
      <rect x="332" y="94" width="136" height="8" fill="#1a0f08" />
      {/* Reading lamp on table */}
      <rect x="390" y="275" width="20" height="35" fill="#5a4a30" />
      <rect x="382" y="270" width="36" height="10" fill="#8b2635" />
      <ellipse cx="400" cy="278" rx="30" ry="4" fill="#f4c062" opacity="0.7" />
      {/* Candles */}
      {[80, 740].map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y="275" width="6" height="20" fill="#f0e8d8" />
          <ellipse cx={x + 1} cy="272" rx="2" ry="5" fill="#f4c062">
            <animate attributeName="ry" values="5;4;5" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={x + 1} cy="272" rx="6" ry="10" fill="#f4c062" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.3;0.2" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}
      {/* Dust motes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={i} cx={50 + (i * 41) % 700} cy={60 + (i * 19) % 200} r="0.8" fill="#f4c062" opacity="0.5">
          <animate attributeName="cy" values={`${60 + (i * 19) % 200};${30 + (i * 19) % 200}`} dur={`${6 + (i % 3)}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur={`${6 + (i % 3)}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}