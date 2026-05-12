import React from 'react';

// ============ CHARACTERS ============

export function DetectiveSprite({ size = 120, action = 'idle' }) {
  const transform = action === 'attack' ? 'translateX(28px) rotate(4deg)'
    : action === 'hurt' ? 'translateX(-14px) rotate(-8deg) scale(0.93)'
    : action === 'victory' ? 'translateY(-10px) scale(1.06)'
    : 'translateX(0)';

  const colorShift = action === 'hurt'
    ? 'brightness(0.55) sepia(1) hue-rotate(300deg) saturate(3)'
    : 'none';

  return (
    <div style={{ position: 'relative', display: 'inline-block', transform, transition: 'transform 0.28s ease-out' }}>
      <div className="sprite-wrap">
        {/* Inline SVG detective — transparent background, no white box */}
        <svg viewBox="0 0 100 140" width={size} height={size * 1.4}
          style={{ display: 'block', filter: colorShift }}>

          {/* Shadow */}
          <ellipse cx="50" cy="137" rx="26" ry="4" fill="rgba(0,0,0,0.35)" />

          {/* Shoes */}
          <path d="M 22 127 Q 19 133 26 135 L 42 135 Q 47 135 46 131 L 44 127 Z" fill="#1a0d06" />
          <path d="M 78 127 Q 81 133 74 135 L 58 135 Q 53 135 54 131 L 56 127 Z" fill="#1a0d06" />
          <path d="M 24 130 Q 33 128 41 130" fill="none" stroke="#2e1a0a" strokeWidth="0.7" />
          <path d="M 76 130 Q 67 128 59 130" fill="none" stroke="#2e1a0a" strokeWidth="0.7" />

          {/* Trousers */}
          <rect x="24" y="89" width="20" height="41" rx="3" fill="#1e1828" />
          <rect x="56" y="89" width="20" height="41" rx="3" fill="#1e1828" />
          <line x1="34" y1="92" x2="33.5" y2="127" stroke="#2a2438" strokeWidth="0.7" />
          <line x1="66" y1="92" x2="65.5" y2="127" stroke="#2a2438" strokeWidth="0.7" />

          {/* Coat lower flare */}
          <path d="M 16 84 L 11 127 L 46 127 L 50 109 L 54 127 L 89 127 L 84 84 Z" fill="#6b3a1e" />
          <line x1="50" y1="109" x2="50" y2="127" stroke="#4a2810" strokeWidth="1.2" />
          <path d="M 13 123 L 44 123" stroke="#5a3010" strokeWidth="0.6" />
          <path d="M 56 123 L 87 123" stroke="#5a3010" strokeWidth="0.6" />

          {/* Coat upper body */}
          <path d="M 14 42 L 16 84 L 84 84 L 86 42 Z" fill="#7a4a26" />
          {/* Coat side shadow for depth */}
          <path d="M 14 42 L 18 84" stroke="#4a2810" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
          <path d="M 86 42 L 82 84" stroke="#4a2810" strokeWidth="5" strokeLinecap="round" opacity="0.4" />

          {/* Belt */}
          <rect x="16" y="79" width="68" height="6" rx="1" fill="#3a1e08" />
          <rect x="46" y="77" width="8" height="10" rx="1.5" fill="#c8a050" />
          <rect x="47.5" y="78.5" width="5" height="7" rx="0.5" fill="#a07830" />

          {/* Lapels */}
          <path d="M 35 42 L 29 67 L 50 57 Z" fill="#3a1e0a" />
          <path d="M 65 42 L 71 67 L 50 57 Z" fill="#3a1e0a" />

          {/* Shirt between lapels */}
          <polygon points="41,33 35,42 50,57 65,42 59,33" fill="#e8dcc8" />

          {/* Tie */}
          <polygon points="46,35 43,54 50,61 57,54 54,35 50,38" fill="#1a1828" />
          <polygon points="46,35 54,35 50,38" fill="#28263a" />

          {/* Coat buttons */}
          <circle cx="50" cy="68" r="2" fill="#3a1e08" stroke="#5a3010" strokeWidth="0.5" />
          <circle cx="50" cy="74" r="2" fill="#3a1e08" stroke="#5a3010" strokeWidth="0.5" />

          {/* Shoulders */}
          <path d="M 12 40 Q 50 34 88 40 L 86 48 Q 50 43 14 48 Z" fill="#8a5428" />

          {/* Shoulder epaulettes */}
          <rect x="12" y="38" width="8" height="11" rx="2" fill="#9a6030" stroke="#7a4a20" strokeWidth="0.7" />
          <rect x="80" y="38" width="8" height="11" rx="2" fill="#9a6030" stroke="#7a4a20" strokeWidth="0.7" />

          {/* LEFT ARM — holds magnifying glass */}
          <path d="M 10 48 L 5 82 L 17 85 L 21 50 Z" fill="#7a4a26" />
          <rect x="4" y="79" width="15" height="7" rx="3" fill="#5a3012" />
          <ellipse cx="11.5" cy="89" rx="7" ry="5.5" fill="#c49a6c" />
          {/* Magnifying glass handle */}
          <line x1="10" y1="93" x2="6" y2="107" stroke="#6a3812" strokeWidth="3.2" strokeLinecap="round" />
          {/* Magnifying glass ring */}
          <circle cx="5" cy="110" r="9" fill="none" stroke="#c8a050" strokeWidth="2.5" />
          <circle cx="5" cy="110" r="7" fill="#a8d8f0" opacity="0.28" />
          <line x1="0" y1="106" x2="3" y2="104" stroke="white" strokeWidth="1.3" opacity="0.6" strokeLinecap="round" />
          <line x1="1" y1="114" x2="4" y2="116" stroke="white" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />

          {/* RIGHT ARM */}
          <path d="M 90 48 L 95 76 L 81 79 L 79 50 Z" fill="#7a4a26" />
          <rect x="81" y="72" width="15" height="7" rx="3" fill="#5a3012" />
          {/* Right hand — gun grip position (y≈80 in viewBox) */}
          <ellipse cx="88" cy="82" rx="7" ry="5.5" fill="#c49a6c" />

          {/* Neck */}
          <rect x="44" y="28" width="12" height="11" rx="3" fill="#c49a6c" />

          {/* Collar */}
          <path d="M 39 34 L 44 42 L 50 38 L 56 42 L 61 34 L 50 28 Z" fill="#e8dcc8" />

          {/* HEAD */}
          <ellipse cx="50" cy="18" rx="15" ry="18" fill="#c49a6c" />
          {/* Jaw shading */}
          <path d="M 35 21 Q 37 32 50 34 Q 63 32 65 21" fill="#b08050" opacity="0.28" />

          {/* Ears */}
          <path d="M 35 15 Q 31 17 32 23 Q 33 27 36 25 L 36 18 Z" fill="#c49a6c" />
          <path d="M 65 15 Q 69 17 68 23 Q 67 27 64 25 L 64 18 Z" fill="#c49a6c" />
          <path d="M 33 18 Q 32 21 33 24" fill="none" stroke="#a07848" strokeWidth="0.6" />
          <path d="M 67 18 Q 68 21 67 24" fill="none" stroke="#a07848" strokeWidth="0.6" />

          {/* Dark slicked-back hair */}
          <path d="M 35 13 Q 34 4 43 2 Q 50 0 57 2 Q 66 4 65 13 L 63 18 Q 50 13 37 18 Z" fill="#2e1808" />

          {/* Eyebrows — stern */}
          <path d="M 37 10 Q 43 7.5 47 10" stroke="#2a1508" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M 53 10 Q 57 7.5 63 10" stroke="#2a1508" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          <ellipse cx="43" cy="16" rx="4.5" ry="4.5" fill="white" />
          <ellipse cx="57" cy="16" rx="4.5" ry="4.5" fill="white" />
          <circle cx="43.5" cy="16" r="3" fill="#2a1808" />
          <circle cx="57.5" cy="16" r="3" fill="#2a1808" />
          <circle cx="43" cy="15" r="1.6" fill="#0e0806" />
          <circle cx="57" cy="15" r="1.6" fill="#0e0806" />
          <circle cx="43.8" cy="14.2" r="0.9" fill="white" opacity="0.9" />
          <circle cx="57.8" cy="14.2" r="0.9" fill="white" opacity="0.9" />

          {/* Nose */}
          <path d="M 49 20 L 46 27 Q 47.5 29 50 28.5 Q 52.5 29 54 27 L 51 20 Z"
            fill="none" stroke="#a07040" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="47" cy="27" rx="2.2" ry="1.4" fill="#b08050" opacity="0.4" />
          <ellipse cx="53" cy="27" rx="2.2" ry="1.4" fill="#b08050" opacity="0.4" />

          {/* Mouth — stern thin line */}
          <path d="M 44 30.5 Q 50 33 56 30.5" fill="none" stroke="#8a4a30" strokeWidth="1.5" strokeLinecap="round" />
          {/* Stubble shadow */}
          <path d="M 42 30 Q 50 37 58 30 Q 56 35 50 36 Q 44 35 42 30 Z" fill="#8a6040" opacity="0.18" />

          {/* Cigarette */}
          <rect x="53" y="30" width="10" height="2" rx="1" fill="#f0e0c0" />
          <rect x="62" y="30" width="3" height="2" rx="0.5" fill="#8a3a18" />
          <circle cx="65.5" cy="31" r="1.1" fill="#ff5a18" opacity="0.85" />

          {/* FEDORA HAT */}
          <ellipse cx="50" cy="4" rx="25" ry="5.5" fill="#2e1e0c" />
          <ellipse cx="50" cy="3.5" rx="22.5" ry="4" fill="#3a2810" />
          <path d="M 28.5 4 L 26.5 -14 Q 27 -16 50 -16 Q 73 -16 73.5 -14 L 71.5 4 Z" fill="#3a2810" />
          <rect x="26.5" y="-16" width="47" height="5" rx="2" fill="#2e1e0c" />
          {/* Hat band */}
          <rect x="28.5" y="-0.5" width="43" height="5" rx="1" fill="#1a0e06" />
          {/* Crown highlight */}
          <path d="M 32 -8 Q 50 -11.5 68 -8" fill="none" stroke="#5a3a18" strokeWidth="1" opacity="0.6" />
          {/* Brim front crease */}
          <path d="M 29 5 Q 50 8.5 71 5" fill="none" stroke="#1e1006" strokeWidth="0.8" opacity="0.45" />
        </svg>
      </div>

      {/* Gun SVG — positioned at the detective's right hand */}
      <svg
        width={size * 0.72}
        height={size * 0.38}
        viewBox="0 0 86 46"
        style={{ position: 'absolute', bottom: size * 0.50, right: -size * 0.36, zIndex: 10, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}
      >
        {/* Main gun body */}
        <rect x="8" y="13" width="52" height="11" rx="2.5" fill="#1e1208" stroke="#c8a050" strokeWidth="1.2" />
        {/* Barrel */}
        <rect x="58" y="15" width="24" height="7" rx="1.5" fill="#2a1a0a" stroke="#c8a050" strokeWidth="1" />
        {/* Barrel end ring */}
        <rect x="80" y="14" width="3" height="9" rx="1" fill="#c8a050" />
        {/* Grip */}
        <rect x="16" y="24" width="13" height="18" rx="3" fill="#1e1208" stroke="#c8a050" strokeWidth="1.2" />
        {/* Grip texture lines */}
        <line x1="18" y1="27" x2="27" y2="27" stroke="#8a6030" strokeWidth="0.6" />
        <line x1="18" y1="30" x2="27" y2="30" stroke="#8a6030" strokeWidth="0.6" />
        <line x1="18" y1="33" x2="27" y2="33" stroke="#8a6030" strokeWidth="0.6" />
        <line x1="18" y1="36" x2="27" y2="36" stroke="#8a6030" strokeWidth="0.6" />
        {/* Trigger guard */}
        <path d="M 20 24 Q 26 35 32 24" fill="none" stroke="#c8a050" strokeWidth="1.2" />
        {/* Trigger */}
        <line x1="26" y1="24" x2="25" y2="31" stroke="#c8a050" strokeWidth="1.5" />
        {/* Hammer */}
        <rect x="8" y="7" width="7" height="9" rx="1.5" fill="#2a1a0a" stroke="#c8a050" strokeWidth="1" />
        {/* Rear sight */}
        <rect x="10" y="11" width="5" height="3" rx="0.5" fill="#c8a050" />
        {/* Front sight */}
        <rect x="56" y="11" width="4" height="4" rx="0.5" fill="#c8a050" />
        {/* Gold engraving */}
        <path d="M 30 16 Q 40 14 50 16" fill="none" stroke="#c8a050" strokeWidth="0.6" opacity="0.6" />
        {/* Serial number plate */}
        <rect x="38" y="17" width="12" height="5" rx="1" fill="#0a0806" stroke="#8a6030" strokeWidth="0.5" />

        {/* Muzzle flash — only when attacking */}
        {action === 'attack' && (
          <g>
            <ellipse cx="85" cy="18" rx="10" ry="7" fill="#fff8c0" opacity="0.95" />
            <ellipse cx="91" cy="18" rx="6" ry="4" fill="#f4c062" />
            <line x1="82" y1="11" x2="95" y2="7" stroke="#ffdd44" strokeWidth="2" opacity="0.85" />
            <line x1="82" y1="25" x2="96" y2="29" stroke="#ffdd44" strokeWidth="2" opacity="0.85" />
            <line x1="84" y1="18" x2="100" y2="18" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
            <circle cx="86" cy="18" r="4" fill="#fff" opacity="0.5" />
          </g>
        )}
      </svg>

      {/* Victory stars */}
      {action === 'victory' && (
        <svg width={size * 0.8} height={size * 0.4} viewBox="0 0 80 40"
          style={{ position: 'absolute', top: -size * 0.12, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          {[10, 40, 70].map((x, i) => (
            <text key={i} x={x} y={20 + (i % 2) * 8} textAnchor="middle"
              fill="#f4c062" fontSize={14 + i * 2} opacity={0.9 - i * 0.15}>★</text>
          ))}
        </svg>
      )}
    </div>
  );
}

export function ProfessorSprite({ size = 100, reaction = 'neutral' }) {
  const transform = reaction === 'happy' ? 'translateY(-6px) scale(1.07)'
    : reaction === 'disappointed' ? 'rotate(-4deg) scale(0.96)'
    : 'none';

  return (
    <div style={{ position: 'relative', display: 'inline-block', transform, transition: 'all 0.3s ease-out' }}>
      <div className="sprite-wrap">
        {/* Inline SVG professor — transparent background */}
        <svg viewBox="0 0 100 140" width={size} height={size * 1.4}
          style={{ display: 'block', filter: reaction === 'disappointed' ? 'brightness(0.65) saturate(0.5)' : 'none' }}>

          {/* Shadow */}
          <ellipse cx="50" cy="137" rx="24" ry="4" fill="rgba(0,0,0,0.3)" />

          {/* Shoes — brown oxfords */}
          <path d="M 24 127 Q 21 133 28 135 L 43 135 Q 48 135 47 131 L 45 127 Z" fill="#5a3010" />
          <path d="M 76 127 Q 79 133 72 135 L 57 135 Q 52 135 53 131 L 55 127 Z" fill="#5a3010" />
          <path d="M 26 130 Q 35 128 43 130" fill="none" stroke="#3a1e08" strokeWidth="0.7" />
          <path d="M 74 130 Q 65 128 57 130" fill="none" stroke="#3a1e08" strokeWidth="0.7" />
          {/* Lace dots */}
          <circle cx="30" cy="130" r="1" fill="#8a5028" />
          <circle cx="35" cy="129" r="1" fill="#8a5028" />
          <circle cx="68" cy="130" r="1" fill="#8a5028" />
          <circle cx="63" cy="129" r="1" fill="#8a5028" />

          {/* Trousers — tan/brown tweed */}
          <rect x="26" y="90" width="18" height="40" rx="3" fill="#8a7040" />
          <rect x="56" y="90" width="18" height="40" rx="3" fill="#8a7040" />
          <line x1="35" y1="93" x2="34.5" y2="128" stroke="#7a6030" strokeWidth="0.6" />
          <line x1="65" y1="93" x2="64.5" y2="128" stroke="#7a6030" strokeWidth="0.6" />

          {/* Tweed jacket lower */}
          <path d="M 19 86 L 17 122 L 44 122 L 50 106 L 56 122 L 83 122 L 81 86 Z" fill="#7a6038" />
          <line x1="50" y1="106" x2="50" y2="122" stroke="#5a4020" strokeWidth="1" />

          {/* Tweed jacket upper */}
          <path d="M 17 44 L 19 86 L 81 86 L 83 44 Z" fill="#8a7040" />
          {/* Jacket texture (subtle) */}
          <path d="M 17 44 L 21 86" stroke="#5a4020" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
          <path d="M 83 44 L 79 86" stroke="#5a4020" strokeWidth="4" strokeLinecap="round" opacity="0.35" />

          {/* Green waistcoat/vest visible at center */}
          <polygon points="40,36 35,44 50,60 65,44 60,36" fill="#4a6030" />
          <polygon points="40,36 35,44 50,54 65,44 60,36 50,60" fill="#4a6030" />

          {/* Lapels */}
          <path d="M 36 44 L 30 66 L 50 56 Z" fill="#4a3820" />
          <path d="M 64 44 L 70 66 L 50 56 Z" fill="#4a3820" />

          {/* White shirt visible */}
          <polygon points="40,36 36,44 50,56 64,44 60,36" fill="#e8dcc8" />

          {/* Bow tie */}
          <path d="M 44 40 L 48 44 L 50 42 L 52 44 L 56 40 L 50 38 Z" fill="#8a1a28" />
          <ellipse cx="50" cy="41" rx="2.5" ry="2" fill="#6a1018" />

          {/* Vest buttons */}
          <circle cx="50" cy="62" r="1.5" fill="#3a5020" stroke="#2a3818" strokeWidth="0.4" />
          <circle cx="50" cy="68" r="1.5" fill="#3a5020" stroke="#2a3818" strokeWidth="0.4" />
          <circle cx="50" cy="74" r="1.5" fill="#3a5020" stroke="#2a3818" strokeWidth="0.4" />

          {/* Pocket handkerchief */}
          <path d="M 64 52 L 70 56 L 72 52 L 66 50 Z" fill="#c8a060" opacity="0.85" />

          {/* Shoulders */}
          <path d="M 15 42 Q 50 37 85 42 L 83 50 Q 50 45 17 50 Z" fill="#9a8050" />

          {/* LEFT ARM — holds book */}
          <path d="M 13 50 L 11 84 L 23 86 L 25 52 Z" fill="#8a7040" />
          <rect x="10" y="80" width="14" height="7" rx="3" fill="#6a5030" />
          <ellipse cx="17" cy="89" rx="6.5" ry="5.5" fill="#c4a07a" />
          {/* Book */}
          <rect x="4" y="88" width="22" height="28" rx="2" fill="#6a3010" />
          <rect x="5" y="89" width="20" height="26" rx="1.5" fill="#7a3a14" />
          <line x1="15" y1="89" x2="15" y2="115" stroke="#5a2808" strokeWidth="1.5" />
          {/* Book pages */}
          <rect x="6" y="90" width="8" height="24" rx="0.5" fill="#e8dcc0" opacity="0.85" />
          <line x1="7" y1="93" x2="13" y2="93" stroke="#8a7840" strokeWidth="0.5" />
          <line x1="7" y1="96" x2="13" y2="96" stroke="#8a7840" strokeWidth="0.5" />
          <line x1="7" y1="99" x2="13" y2="99" stroke="#8a7840" strokeWidth="0.5" />
          {/* Glowing book effect when happy */}
          {reaction === 'happy' && (
            <g>
              <circle cx="15" cy="100" r="12" fill="#f4c062" opacity="0.18">
                <animate attributeName="opacity" values="0.18;0.35;0.18" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="15" cy="100" r="7" fill="#fff8c0" opacity="0.25">
                <animate attributeName="opacity" values="0.25;0.5;0.25" dur="0.8s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* RIGHT ARM */}
          <path d="M 87 50 L 89 82 L 77 84 L 75 52 Z" fill="#8a7040" />
          <rect x="76" y="78" width="14" height="7" rx="3" fill="#6a5030" />
          <ellipse cx="83" cy="87" rx="6.5" ry="5.5" fill="#c4a07a" />

          {/* Neck */}
          <rect x="44" y="28" width="12" height="12" rx="3" fill="#c4a07a" />

          {/* Collar */}
          <path d="M 39 34 L 44 42 L 50 38 L 56 42 L 61 34 L 50 28 Z" fill="#e8dcc8" />

          {/* HEAD */}
          <ellipse cx="50" cy="18" rx="14" ry="17" fill="#c4a07a" />
          {/* Jaw/age shading */}
          <path d="M 36 22 Q 38 32 50 34 Q 62 32 64 22" fill="#a88050" opacity="0.25" />

          {/* Ears */}
          <path d="M 36 16 Q 32 18 33 24 Q 34 28 37 26 L 37 19 Z" fill="#c4a07a" />
          <path d="M 64 16 Q 68 18 67 24 Q 66 28 63 26 L 63 19 Z" fill="#c4a07a" />
          <path d="M 33.5 19 Q 33 22 33.5 25" fill="none" stroke="#a08050" strokeWidth="0.6" />
          <path d="M 66.5 19 Q 67 22 66.5 25" fill="none" stroke="#a08050" strokeWidth="0.6" />

          {/* Grey/silver hair — wavy, distinguished */}
          <path d="M 36 14 Q 34 4 42 2 Q 50 0 58 2 Q 66 4 64 14 L 63 19 Q 55 10 50 12 Q 45 10 37 19 Z" fill="#8a8a8a" />
          {/* Hair wisp details */}
          <path d="M 36 14 Q 32 8 34 4" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 64 14 Q 68 8 66 4" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 42 10 Q 44 6 50 5 Q 56 6 58 10" fill="none" stroke="#b0b0b0" strokeWidth="1" opacity="0.7" />

          {/* Eyebrows — bushy, lighter grey */}
          <path d="M 36 11 Q 42 8.5 47 11" stroke="#7a7060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 53 11 Q 58 8.5 64 11" stroke="#7a7060" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* GLASSES — round, gold frames */}
          {/* Left lens */}
          <circle cx="42" cy="19" r="7" fill="none" stroke="#c8a050" strokeWidth="1.8" />
          <circle cx="42" cy="19" r="5.5" fill="#88b8d0" opacity="0.15" />
          {/* Right lens */}
          <circle cx="58" cy="19" r="7" fill="none" stroke="#c8a050" strokeWidth="1.8" />
          <circle cx="58" cy="19" r="5.5" fill="#88b8d0" opacity="0.15" />
          {/* Bridge */}
          <line x1="49" y1="19" x2="51" y2="19" stroke="#c8a050" strokeWidth="1.6" />
          {/* Temples */}
          <line x1="35" y1="19" x2="31" y2="17" stroke="#c8a050" strokeWidth="1.4" />
          <line x1="65" y1="19" x2="69" y2="17" stroke="#c8a050" strokeWidth="1.4" />
          {/* Lens glint */}
          <circle cx="39" cy="16.5" r="1.4" fill="white" opacity={reaction === 'happy' ? 0.75 : 0.35} />
          <circle cx="55" cy="16.5" r="1.4" fill="white" opacity={reaction === 'happy' ? 0.75 : 0.35} />

          {/* Eyes behind glasses */}
          <ellipse cx="42" cy="19" rx="3.5" ry="3.5" fill="white" />
          <circle cx="42.5" cy="19" r="2.3" fill="#2a2020" />
          <circle cx="43" cy="17.8" r="0.7" fill="white" opacity="0.85" />
          <ellipse cx="58" cy="19" rx="3.5" ry="3.5" fill="white" />
          <circle cx="58.5" cy="19" r="2.3" fill="#2a2020" />
          <circle cx="59" cy="17.8" r="0.7" fill="white" opacity="0.85" />

          {/* Grey beard/mustache */}
          <path d="M 44 28 Q 50 32 56 28" fill="#9a9080" opacity="0.7" />
          <path d="M 43 31 Q 50 36 57 31" fill="none" stroke="#8a8070" strokeWidth="1.2" strokeLinecap="round" />

          {/* Nose — rounder, older */}
          <path d="M 49.5 21 L 46 28 Q 47.5 31 50 30 Q 52.5 31 54 28 L 50.5 21 Z"
            fill="none" stroke="#a07840" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="47" cy="28.5" rx="2.5" ry="1.5" fill="#b08050" opacity="0.4" />
          <ellipse cx="53" cy="28.5" rx="2.5" ry="1.5" fill="#b08050" opacity="0.4" />

          {/* Warm smile when happy */}
          {reaction === 'happy' && (
            <path d="M 44 33 Q 50 38 56 33" fill="none" stroke="#8a4a30" strokeWidth="1.6" strokeLinecap="round" />
          )}
          {reaction !== 'happy' && (
            <path d="M 45 33 Q 50 35 55 33" fill="none" stroke="#8a4a30" strokeWidth="1.4" strokeLinecap="round" />
          )}

          {/* Pocket watch chain */}
          <path d="M 50 75 Q 52 82 55 86" fill="none" stroke="#c8a050" strokeWidth="0.8" opacity="0.7" />
          <circle cx="55" cy="87" r="2.5" fill="none" stroke="#c8a050" strokeWidth="1" />
        </svg>
      </div>

      {/* Pipe when happy */}
      {reaction === 'happy' && (
        <svg width={size * 0.4} height={size * 0.25} viewBox="0 0 40 25"
          style={{ position: 'absolute', bottom: size * 0.45, right: -size * 0.15, pointerEvents: 'none' }}>
          <path d="M 5 18 Q 10 5 20 8 L 32 8" fill="none" stroke="#6a3a18" strokeWidth="3" strokeLinecap="round" />
          <rect x="28" y="5" width="10" height="10" rx="2" fill="#6a3a18" />
          <rect x="30" y="3" width="6" height="4" rx="1" fill="#8a4a28" />
          <path d="M 33 3 Q 31 -3 35 -5" fill="none" stroke="#aaa" strokeWidth="1" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>
      )}
    </div>
  );
}

// Enemy sprites — one per chapter
export function EnemySprite({ type, hit, hp, maxHp, attacking = false }) {
  const opacity = hp > 0 ? 1 : 0.3;
  const shake = hit ? 'enemy-shake' : '';
  const attackCls = attacking ? 'enemy-attacking' : '';

  const sprites = {
    lab: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        <rect x="20" y="30" width="80" height="70" fill="#1a1a24" stroke="#6e1f12" strokeWidth="2" />
        <rect x="28" y="38" width="64" height="54" fill={hit ? "#8b2635" : attacking ? "#3a0820" : "#0a1a1a"} />
        <rect x="28" y="50" width="64" height="4" fill="#ff2a6d" opacity={hit || attacking ? "1" : "0.7"}>
          <animate attributeName="y" values="50;70;40;50" dur="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="28" y="70" width="64" height="2" fill="#4af27a" opacity="0.8">
          <animate attributeName="y" values="70;45;80;70" dur="0.4s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="58" width="10" height="8" fill={attacking ? "#fff" : "#ff2a6d"}>
          <animate attributeName="opacity" values="1;0.5;1" dur={attacking ? "0.2s" : "0.8s"} repeatCount="indefinite" />
        </rect>
        <rect x="70" y="58" width="10" height="8" fill={attacking ? "#fff" : "#ff2a6d"}>
          <animate attributeName="opacity" values="1;0.5;1" dur={attacking ? "0.2s" : "0.8s"} begin="0.1s" repeatCount="indefinite" />
        </rect>
        <path d={attacking ? "M 35 76 L 60 72 L 85 76" : "M 40 80 L 48 84 L 56 80 L 64 84 L 72 80 L 80 84"}
          fill="none" stroke={attacking ? "#fff" : "#ff2a6d"} strokeWidth="2" />
        <rect x="52" y="100" width="16" height="14" fill="#2a2a34" />
        <rect x="36" y="112" width="48" height="6" fill="#1a1a24" />
        {attacking && (
          <g>
            <circle cx="60" cy="74" r="20" fill="none" stroke="#ff2a6d" strokeWidth="2" opacity="0.8">
              <animate attributeName="r" values="15;30;15" dur="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="0.3s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
        <g opacity="0.8">
          <path d="M 25 35 L 22 28 L 26 30" stroke="#f4c062" strokeWidth="1.5" fill="none">
            <animate attributeName="opacity" values="0;1;0" dur="0.7s" repeatCount="indefinite" />
          </path>
          <path d="M 100 40 L 105 32 L 102 36" stroke="#f4c062" strokeWidth="1.5" fill="none">
            <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    ),
    diner: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        <rect x="25" y="15" width="70" height="115" fill="#3a2418" stroke="#1a0f08" strokeWidth="2" />
        <rect x="32" y="22" width="56" height="40" fill={hit || attacking ? "#8b2635" : "#2a1810"} stroke="#1a0f08" strokeWidth="1" />
        <rect x="32" y="68" width="56" height="40" fill={hit || attacking ? "#8b2635" : "#2a1810"} stroke="#1a0f08" strokeWidth="1" />
        <g transform="translate(60, 85)">
          <path d="M -12 0 Q -12 -14 0 -14 Q 12 -14 12 0" fill="none" stroke="#6a5540" strokeWidth="4" />
          <rect x="-16" y="-2" width="32" height="22" fill="#8a7050" stroke="#3a2a18" strokeWidth="1.5" />
          <circle cx="0" cy="8" r="3" fill="#3a2a18" />
          <rect x="-1" y="10" width="2" height="6" fill="#3a2a18" />
        </g>
        <g transform="translate(60, 12)">
          <path d="M 0 -8 L 10 8 L -10 8 Z" fill="#f4c062" stroke="#1a0f08" strokeWidth="1" />
          <text y="6" textAnchor="middle" fill="#1a0f08" fontFamily="Oswald" fontSize="10" fontWeight="700">!</text>
        </g>
        {attacking && (
          <rect x="20" y="20" width="80" height="105" fill="#ff2a6d" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.25s" repeatCount="indefinite" />
          </rect>
        )}
      </svg>
    ),
    warehouse: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        <path d="M 35 70 L 85 70 L 90 85 L 80 100 L 40 100 L 30 85 Z" fill={hit ? "#8b2635" : attacking ? "#5a0010" : "#3a3a44"} stroke="#1a1a24" strokeWidth="2" />
        <ellipse cx="60" cy="70" rx="20" ry="10" fill="#2a2a34" stroke="#1a1a24" strokeWidth="1.5" />
        <circle cx="60" cy="85" r="10" fill="#1a1a24" />
        <circle cx="60" cy="85" r="6" fill={attacking ? "#fff" : "#ff2a6d"}>
          <animate attributeName="r" values={attacking ? "6;9;6" : "6;4;6"} dur={attacking ? "0.2s" : "1.5s"} repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="85" r="3" fill="#fff" />
        <g>
          <ellipse cx="20" cy="65" rx="18" ry="2" fill="#1a1a24">
            <animateTransform attributeName="transform" type="rotate" from="0 20 65" to="360 20 65" dur={attacking ? "0.1s" : "0.2s"} repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="100" cy="65" rx="18" ry="2" fill="#1a1a24">
            <animateTransform attributeName="transform" type="rotate" from="0 100 65" to="360 100 65" dur={attacking ? "0.1s" : "0.2s"} repeatCount="indefinite" />
          </ellipse>
        </g>
        <rect x="15" y="62" width="10" height="10" fill="#2a2a34" />
        <rect x="95" y="62" width="10" height="10" fill="#2a2a34" />
        <line x1="35" y1="70" x2="15" y2="65" stroke="#2a2a34" strokeWidth="2" />
        <line x1="85" y1="70" x2="105" y2="65" stroke="#2a2a34" strokeWidth="2" />
        <path d="M 60 100 L 40 135 L 80 135 Z" fill={attacking ? "#fff" : "#ff2a6d"} opacity={attacking ? "0.4" : "0.2"}>
          <animate attributeName="opacity" values={attacking ? "0.4;0.8;0.4" : "0.2;0.4;0.2"} dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    lighthouse: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        <rect x="20" y="30" width="80" height="90" fill={hit ? "#d88858" : "#d4b888"} stroke="#6a4020" strokeWidth="2" />
        <rect x="20" y="30" width="80" height="8" fill="#b8986a" />
        <rect x="20" y="112" width="80" height="8" fill="#b8986a" />
        <ellipse cx="60" cy="30" rx="40" ry="6" fill="#6a4020" />
        <ellipse cx="60" cy="120" rx="40" ry="6" fill="#6a4020" />
        <g fill="#2a1810" fontFamily="JetBrains Mono" fontSize="8">
          <text x="26" y="52">X8#@!q2w</text>
          <text x="26" y="64">?z!9c$%m</text>
          <text x="26" y="76">p@n!w3</text>
          <text x="26" y="88">!!##@@?!</text>
          <text x="26" y="100">kj#82x</text>
        </g>
        <circle cx="60" cy="75" r="12" fill={attacking ? "#ff2a6d" : "#8b2635"} opacity="0.9">
          <animate attributeName="opacity" values={attacking ? "1;0.5;1" : "0.8;1;0.8"} dur={attacking ? "0.2s" : "2s"} repeatCount="indefinite" />
        </circle>
        <text x="60" y="79" textAnchor="middle" fill="#f4e8b8" fontFamily="Playfair Display" fontSize="12" fontWeight="900">?</text>
        <circle cx="60" cy="75" r="18" fill="none" stroke="#ff2a6d" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="r" values={attacking ? "18;35;18" : "18;24;18"} dur={attacking ? "0.3s" : "2s"} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    archive: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <rect x={8 + i * 9} y={22 + i * 20} width={104 - i * 18} height="17"
              fill={hit ? "#8b2635" : attacking ? `hsl(${0 + i * 20},80%,${20 + i * 5}%)` : `hsl(${270 + i * 12},60%,${14 + i * 6}%)`}
              stroke={`hsl(${270 + i * 12},50%,${35 + i * 8}%)`} strokeWidth="1.5" />
            <text x="60" y={33 + i * 20} textAnchor="middle" fill={attacking ? "#ffaaaa" : "#c084fc"} fontFamily="JetBrains Mono" fontSize="8">
              {`solve(${4 - i})`}
            </text>
          </g>
        ))}
        <text x="60" y="110" textAnchor="middle" fill="#ff2a6d" fontFamily="JetBrains Mono" fontSize="8" fontWeight="700">
          StackOverflow!
          <animate attributeName="opacity" values="1;0.2;1" dur={attacking ? "0.2s" : "0.75s"} repeatCount="indefinite" />
        </text>
        <path d="M 96 30 Q 116 60 96 88" fill="none" stroke="#c084fc" strokeWidth="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.4s" repeatCount="indefinite" />
        </path>
        <polygon points="96,88 90,82 102,80" fill="#c084fc" opacity="0.7" />
      </svg>
    ),
    evidence_room: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        <ellipse cx="60" cy="32" rx="40" ry="9" fill={hit || attacking ? "#8b2635" : "#182840"} stroke="#2a4060" strokeWidth="2" />
        <rect x="20" y="32" width="80" height="72" fill={hit || attacking ? "#8b2635" : "#102030"} stroke="#2a4060" strokeWidth="2" />
        <ellipse cx="60" cy="104" rx="40" ry="9" fill={hit || attacking ? "#8b2635" : "#182840"} stroke="#2a4060" strokeWidth="2" />
        <ellipse cx="60" cy="52" rx="40" ry="7" fill="none" stroke="#2a4060" strokeWidth="1.2" />
        <ellipse cx="60" cy="72" rx="40" ry="7" fill="none" stroke="#2a4060" strokeWidth="1.2" />
        <ellipse cx="60" cy="92" rx="40" ry="7" fill="none" stroke="#2a4060" strokeWidth="1.2" />
        <text x="60" y="48" textAnchor="middle" fill="#ff2a6d" fontFamily="JetBrains Mono" fontSize="7">KEY ERR: ??</text>
        <text x="60" y="68" textAnchor="middle" fill="#f4c062" fontFamily="JetBrains Mono" fontSize="7">NULL: KeyError</text>
        <text x="60" y="88" textAnchor="middle" fill="#ff2a6d" fontFamily="JetBrains Mono" fontSize="7">{'{ ? : ! }'}</text>
        <rect x="24" y="57" width="30" height="3" fill="#ff2a6d" opacity="0.7">
          <animate attributeName="width" values="30;60;15;48;30" dur={attacking ? "0.2s" : "0.5s"} repeatCount="indefinite" />
        </rect>
        <rect x="24" y="77" width="20" height="2" fill="#4af27a" opacity="0.5">
          <animate attributeName="width" values="20;50;10;36;20" dur="0.65s" repeatCount="indefinite" />
        </rect>
      </svg>
    ),
    library: (
      <svg viewBox="0 0 120 140" width="120" height="140" className={`${shake} ${attackCls}`} style={{ opacity }}>
        <ellipse cx="60" cy="135" rx="34" ry="4" fill="#000" opacity="0.5" />
        <path d="M 30 125 L 35 60 Q 60 35 85 60 L 90 125 Z" fill={hit ? "#8b2635" : attacking ? "#3a0a2a" : "#1a0a1a"} stroke="#000" strokeWidth="2" />
        <path d="M 35 60 Q 60 30 85 60 L 80 70 Q 60 50 40 70 Z" fill="#0a0610" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="60" cy="65" rx="18" ry="15" fill="#000" />
        <ellipse cx="52" cy="65" rx="3" ry="2" fill={attacking ? "#fff" : "#ff2a6d"}>
          <animate attributeName="opacity" values="1;0.5;1" dur={attacking ? "0.2s" : "1.5s"} repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="68" cy="65" rx="3" ry="2" fill={attacking ? "#fff" : "#ff2a6d"}>
          <animate attributeName="opacity" values="1;0.5;1" dur={attacking ? "0.2s" : "1.5s"} begin="0.3s" repeatCount="indefinite" />
        </ellipse>
        <path d="M 30 125 Q 40 120 45 125" fill="none" stroke="#000" strokeWidth="1" />
        <path d="M 75 125 Q 80 120 90 125" fill="none" stroke="#000" strokeWidth="1" />
        {['[ ]', '( )', '{ }', ':', '==', 'if'].map((sym, i) => (
          <text key={i} x={20 + (i * 18) % 90} y={95 + (i * 7) % 30}
            fill={attacking ? "#ff8888" : "#6e1f12"} fontFamily="JetBrains Mono" fontSize="9" opacity="0.6">
            {sym}
            <animate attributeName="y" values={`${95 + (i * 7) % 30};${85 + (i * 7) % 30};${95 + (i * 7) % 30}`} dur={`${attacking ? 1 : 3 + (i % 2)}s`} repeatCount="indefinite" />
          </text>
        ))}
      </svg>
    )
  };

  return (
    <div className="enemy-sprite-wrap">
      {sprites[type] || sprites.lab}
      <div className="enemy-hp-bar">
        <div className="enemy-hp-fill" style={{ width: `${(hp / maxHp) * 100}%` }} />
      </div>
    </div>
  );
}
