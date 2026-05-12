import React from 'react';

// ============ OTHER UI PIECES ============

export function RainScene({ children, intensity = 'heavy' }) {
  const drops = intensity === 'heavy' ? 80 : 40;
  const dropArr = Array.from({ length: drops });
  return (
    <div className="rain-scene">
      <svg className="city-backdrop" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0612" />
            <stop offset="50%" stopColor="#1a1028" />
            <stop offset="100%" stopColor="#2a1a3a" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0810" />
            <stop offset="100%" stopColor="#1a1828" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#skyGrad)" />
        <circle cx="620" cy="90" r="50" fill="#f4e8b8" opacity="0.08" />
        <circle cx="620" cy="90" r="30" fill="#f4e8b8" opacity="0.18" />
        <circle cx="620" cy="90" r="18" fill="#f4e8b8" opacity="0.35" />
        <rect x="0" y="180" width="120" height="320" fill="url(#buildingGrad)" />
        <rect x="100" y="220" width="80" height="280" fill="#120e1c" />
        <rect x="170" y="150" width="140" height="350" fill="url(#buildingGrad)" />
        <rect x="300" y="200" width="90" height="300" fill="#120e1c" />
        <rect x="380" y="120" width="160" height="380" fill="url(#buildingGrad)" />
        <rect x="530" y="180" width="100" height="320" fill="#120e1c" />
        <rect x="620" y="150" width="180" height="350" fill="url(#buildingGrad)" />
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 20 + (i % 15) * 52;
          const y = 200 + Math.floor(i / 15) * 50;
          const on = (i * 37) % 3 !== 0;
          return on ? (
            <rect key={i} x={x} y={y} width="6" height="8" fill="#f4c062" opacity={0.4 + ((i * 13) % 5) * 0.1}>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </rect>
          ) : null;
        })}
        <g transform="translate(40, 340)">
          <rect x="-4" y="-4" width="148" height="34" fill="#0a0612" stroke="#ff2a6d" strokeWidth="1" opacity="0.9" />
          <text x="70" y="18" textAnchor="middle" fill="#ff2a6d" fontFamily="Oswald, sans-serif" fontSize="16" fontWeight="700" letterSpacing="2">
            PRECINCT 404
            <animate attributeName="opacity" values="1;0.6;1;1;0.9;1" dur="4s" repeatCount="indefinite" />
          </text>
        </g>
        <rect width="800" height="500" fill="#fff" opacity="0">
          <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0.5;0;0.3;0;0;0;0;0" dur="12s" repeatCount="indefinite" />
        </rect>
      </svg>
      <svg className="rain-layer" viewBox="0 0 800 500" preserveAspectRatio="none">
        {dropArr.map((_, i) => {
          const x = (i * 73) % 800;
          const delay = (i * 0.13) % 1.2;
          const dur = 0.5 + ((i * 7) % 5) * 0.1;
          return (
            <line key={i} x1={x} y1="-20" x2={x - 10} y2="10" stroke="#8a9db8" strokeWidth="1" opacity="0.4">
              <animateTransform attributeName="transform" type="translate"
                values="0,-20; 0,520" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
            </line>
          );
        })}
      </svg>
      {children && <div className="rain-content">{children}</div>}
    </div>
  );
}

export function CaseMap({ completed, current, onSelect }) {
  const locations = [
    { x: 55,  y: 90,  name: 'LAB' },
    { x: 110, y: 140, name: 'DINER' },
    { x: 180, y: 85,  name: 'WAREHOUSE' },
    { x: 250, y: 155, name: 'LIGHTHOUSE' },
    { x: 320, y: 90,  name: 'FIREWALL' },
    { x: 390, y: 155, name: 'LIBRARY' },
    { x: 460, y: 90,  name: 'ARCHIVE' },
    { x: 530, y: 155, name: 'RECORDS' },
    { x: 575, y: 90,  name: 'THE CORE' }
  ];
  return (
    <div className="case-map-wrap">
      <div className="case-map-label">◆ INVESTIGATION MAP</div>
      <svg viewBox="0 0 620 220" className="case-map">
        <rect width="620" height="220" fill="#d4c9b0" opacity="0.15" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="620" y2={i * 20} stroke="#1a1612" strokeWidth="0.3" opacity="0.15" />
        ))}
        {Array.from({ length: 31 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220" stroke="#1a1612" strokeWidth="0.3" opacity="0.15" />
        ))}
        {locations.slice(0, -1).map((loc, i) => {
          const next = locations[i + 1];
          const unlocked = completed.includes(i);
          return (
            <path key={i}
              d={`M ${loc.x} ${loc.y} Q ${(loc.x + next.x) / 2} ${Math.min(loc.y, next.y) - 20} ${next.x} ${next.y}`}
              fill="none" stroke={unlocked ? "#a8321f" : "#6a5540"}
              strokeWidth="2" strokeDasharray="4 3"
              opacity={unlocked ? 0.9 : 0.4}>
              {unlocked && <animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite" />}
            </path>
          );
        })}
        {locations.map((loc, i) => {
          const isDone = completed.includes(i);
          const isLocked = false;
          const isCurrent = current === i;
          return (
            <g key={i} onClick={() => !isLocked && onSelect(i)}
              style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}>
              {isCurrent && (
                <circle cx={loc.x} cy={loc.y} r="20" fill="none" stroke="#a8321f" strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" values="16;26;16" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={loc.x} cy={loc.y} r="12"
                fill={isDone ? "#2d5f3f" : isLocked ? "#6a5540" : "#a8321f"}
                stroke="#1a1612" strokeWidth="2" />
              <text x={loc.x} y={loc.y + 4} textAnchor="middle" fill="#e8e0cf"
                fontFamily="Oswald" fontWeight="700" fontSize="12">
                {isDone ? '✓' : isLocked ? '🔒' : i + 1}
              </text>
              <text x={loc.x} y={loc.y + 28} textAnchor="middle" fill="#1a1612"
                fontFamily="Oswald" fontWeight="700" fontSize="10" letterSpacing="1">
                {loc.name}
              </text>
            </g>
          );
        })}
        <g transform="translate(580, 30)">
          <circle r="16" fill="none" stroke="#1a1612" strokeWidth="1" opacity="0.5" />
          <path d="M 0 -12 L 3 0 L 0 12 L -3 0 Z" fill="#1a1612" opacity="0.7" />
          <text y="-18" textAnchor="middle" fontFamily="Oswald" fontSize="8" fill="#1a1612">N</text>
        </g>
      </svg>
    </div>
  );
}

export function PaperDust() {
  return (
    <div className="paper-dust" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="dust" style={{
          left: `${(i * 37) % 100}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${10 + (i % 4) * 3}s`
        }} />
      ))}
    </div>
  );
}