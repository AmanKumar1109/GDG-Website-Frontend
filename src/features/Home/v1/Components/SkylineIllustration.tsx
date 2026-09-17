import React from "react";

const SkylineIllustration: React.FC = () => {
  return (
    <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-[1] opacity-30 hover:opacity-45 transition-opacity duration-700">
      <svg
        viewBox="0 0 1600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-52 sm:h-64 md:h-80 lg:h-96 xl:h-[420px] object-cover object-bottom"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Subtle gradient for vector strokes */}
          <linearGradient id="jharkhandStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          {/* Fill gradient */}
          <linearGradient id="jharkhandFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
          </linearGradient>

          {/* Mask for bottom fade into pure black */}
          <linearGradient id="jharkhandFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="65%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="jharkhandBottomMask">
            <rect width="1600" height="400" fill="url(#jharkhandFade)" />
          </mask>
        </defs>

        <g
          mask="url(#jharkhandBottomMask)"
          stroke="url(#jharkhandStroke)"
          fill="url(#jharkhandFill)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* ================= 1. BACKGROUND: CHOTA NAGPUR PLATEAU & PARASNATH HILL RANGES ================= */}
          <g strokeOpacity="0.2" fillOpacity="0.015">
            {/* Far Mountain Peaks */}
            <path d="M-50 400 L0 320 Q120 220 240 290 T560 210 Q700 170 850 240 T1200 180 Q1380 150 1520 260 L1650 400 Z" />
            <path d="M180 400 L320 270 Q440 220 540 280 T880 230 Q1020 200 1180 270 T1480 250 L1620 400 Z" strokeDasharray="3 3" />
            
            {/* Hundru Waterfall Silhouette / Cascading Flow */}
            <g transform="translate(180, 240)">
              <path d="M60 0 L60 160" strokeDasharray="4 4" strokeOpacity="0.3" />
              <path d="M66 10 L66 160" strokeDasharray="5 5" strokeOpacity="0.3" />
              <path d="M72 0 L72 160" strokeDasharray="4 4" strokeOpacity="0.3" />
              <path d="M40 70 Q60 55 90 70" strokeOpacity="0.3" />
              <path d="M30 110 Q65 95 100 110" strokeOpacity="0.3" />
            </g>
          </g>

          {/* ================= 2. PATRATU VALLEY GHAT ROADS & MODERN CABLE-STAYED BRIDGE ================= */}
          <g strokeOpacity="0.35">
            {/* Patratu Serpentine Curved Roads on Hillside */}
            <path d="M500 340 C560 330 580 300 640 310 S720 270 780 290" strokeDasharray="4 4" />
            <path d="M520 360 C580 350 600 320 660 330 S740 290 800 310" strokeDasharray="4 4" />

            {/* Cable Stayed Bridge Tower 1 */}
            <path d="M440 400 L460 210 L470 210 L490 400" />
            <line x1="465" y1="210" x2="465" y2="400" strokeDasharray="3 3" />
            <line x1="465" y1="225" x2="380" y2="380" />
            <line x1="465" y1="245" x2="405" y2="380" />
            <line x1="465" y1="265" x2="430" y2="380" />
            <line x1="465" y1="225" x2="550" y2="380" />
            <line x1="465" y1="245" x2="525" y2="380" />
            <line x1="465" y1="265" x2="500" y2="380" />
          </g>

          {/* ================= 3. FAR LEFT: HISTORIC RANCHI JAGANNATH TEMPLE (1691 AD) ================= */}
          <g transform="translate(30, 60)">
            {/* Kalash & Dhwaja (Sacred Flag) */}
            <line x1="90" y1="30" x2="90" y2="5" strokeWidth="2" />
            <path d="M90 5 L108 12 L90 19 Z" fill="white" fillOpacity="0.4" />
            <circle cx="90" cy="22" r="3.5" fill="white" fillOpacity="0.6" />
            <circle cx="90" cy="28" r="5" />

            {/* Main Shikhara (Layered Kalinga Architecture) */}
            <path d="M90 32 C75 60 62 110 54 180 L126 180 C118 110 105 60 90 32 Z" />
            {/* Shikhara Intricate Horizontal Steps */}
            <line x1="82" y1="58" x2="98" y2="58" />
            <line x1="75" y1="84" x2="105" y2="84" />
            <line x1="68" y1="112" x2="112" y2="112" />
            <line x1="62" y1="142" x2="118" y2="142" />
            <line x1="57" y1="168" x2="123" y2="168" />

            {/* Mandapa & Pillared Sanctum */}
            <rect x="40" y="180" width="100" height="160" />
            <line x1="35" y1="180" x2="145" y2="180" strokeWidth="2" />
            <line x1="30" y1="200" x2="150" y2="200" />
            
            {/* Grand Main Arch Entrance */}
            <path d="M75 340 L75 250 C75 230 105 230 105 250 L105 340" strokeWidth="2" />
            <path d="M80 250 C80 238 100 238 100 250" />

            {/* Rath Yatra Heritage Wheels Motif */}
            <circle cx="58" cy="290" r="14" />
            <circle cx="58" cy="290" r="4" fill="white" fillOpacity="0.4" />
            <line x1="44" y1="290" x2="72" y2="290" />
            <line x1="58" y1="276" x2="58" y2="304" />
            <line x1="48" y1="280" x2="68" y2="300" />
            <line x1="48" y1="300" x2="68" y2="280" />

            <circle cx="122" cy="290" r="14" />
            <circle cx="122" cy="290" r="4" fill="white" fillOpacity="0.4" />
            <line x1="108" y1="290" x2="136" y2="290" />
            <line x1="122" y1="276" x2="122" y2="304" />
            <line x1="112" y1="280" x2="132" y2="300" />
            <line x1="112" y1="300" x2="132" y2="280" />

            {/* Side Small Shikharas */}
            <path d="M22 220 C22 195 38 195 38 220 L38 340 L22 340 Z" />
            <line x1="30" y1="195" x2="30" y2="185" />
            <circle cx="30" cy="185" r="2" />

            <path d="M142 220 C142 195 158 195 158 220 L158 340 L142 340 Z" />
            <line x1="150" y1="195" x2="150" y2="185" />
            <circle cx="150" cy="185" r="2" />
          </g>

          {/* ================= 4. CENTER-LEFT: BHAGWAN BIRSA MUNDA SMRITI & STATUE SILHOUETTE ================= */}
          <g transform="translate(260, 40)">
            {/* Memorial Monument Dome / Arch Canopy */}
            <path d="M40 180 C40 110 140 110 140 180" strokeDasharray="3 3" />
            
            {/* Bhagwan Birsa Munda Heroic Silhouette */}
            {/* Traditional Headgear / Turban (Pagri) */}
            <ellipse cx="90" cy="62" rx="10" ry="7" />
            <circle cx="90" cy="65" r="7" fill="white" fillOpacity="0.3" />
            
            {/* Torso & Traditional Attire */}
            <path d="M82 72 L78 125 L102 125 L98 72 Z" fill="white" fillOpacity="0.3" />
            
            {/* Raised Arm Holding Iconic Bow & Arrow (Teer-Dhanush) */}
            {/* Left Arm Holding Bow */}
            <path d="M82 78 L60 95 L55 80" strokeWidth="2" />
            {/* Traditional Long Wooden Bow (Curved Arc) */}
            <path d="M48 40 C38 85 40 120 52 145" strokeWidth="2.4" />
            {/* Bow String */}
            <line x1="48" y1="40" x2="52" y2="145" strokeOpacity="0.5" />
            {/* Arrow (Teer) */}
            <line x1="42" y1="85" x2="88" y2="85" strokeWidth="2" />
            <path d="M42 85 L50 81 L48 85 L50 89 Z" fill="white" />
            
            {/* Right Arm at Side */}
            <path d="M98 78 L108 105 L104 118" strokeWidth="2" />

            {/* Dhoti / Lower Garment */}
            <path d="M78 125 L72 175 L86 175 L88 140 L92 140 L94 175 L108 175 L102 125 Z" fill="white" fillOpacity="0.25" />

            {/* Pedestal / Rock Base Inscribed */}
            <path d="M50 175 L130 175 L145 220 L35 220 Z" />
            <rect x="30" y="220" width="120" height="140" />
            <line x1="25" y1="220" x2="155" y2="220" strokeWidth="2" />
            
            {/* Memorial Plaque Lines */}
            <rect x="52" y="235" width="76" height="40" rx="3" />
            <line x1="60" y1="248" x2="120" y2="248" strokeOpacity="0.4" />
            <line x1="65" y1="258" x2="115" y2="258" strokeOpacity="0.4" />
            <line x1="72" y1="268" x2="108" y2="268" strokeOpacity="0.4" />
          </g>

          {/* ================= 5. CENTER: RANCHI CITY CIVIC HERITAGE & TECH TOWERS ================= */}
          <g transform="translate(680, 50)">
            {/* Grand Dome / Secretariat Silhouette */}
            <path d="M60 140 C60 80 160 80 160 140 Z" />
            <line x1="110" y1="80" x2="110" y2="50" strokeWidth="2" />
            <circle cx="110" cy="50" r="4" fill="white" fillOpacity="0.5" />
            <rect x="45" y="140" width="130" height="210" />

            {/* Colonnade Pillars */}
            {[58, 82, 106, 130, 154].map((px, idx) => (
              <line key={idx} x1={px} y1="150" x2={px} y2="350" strokeOpacity="0.35" />
            ))}

            {/* Grand Arch */}
            <path d="M85 350 L85 220 C85 190 135 190 135 220 L135 350" strokeWidth="2" />
          </g>

          {/* ================= 6. CENTER-RIGHT: PAHARI MANDIR (RANCHI HILL TEMPLE & STAIRS) ================= */}
          <g transform="translate(940, 20)">
            {/* The Rocky Hill (Pahari) Silhouette */}
            <path d="M-40 380 L30 220 L120 180 L210 220 L280 380" strokeWidth="1.5" />
            
            {/* Famous Flight of Stairs winding up Pahari Mandir */}
            <g strokeOpacity="0.45">
              <line x1="60" y1="360" x2="110" y2="360" />
              <line x1="65" y1="340" x2="115" y2="340" />
              <line x1="70" y1="320" x2="120" y2="320" />
              <line x1="75" y1="300" x2="125" y2="300" />
              <line x1="80" y1="280" x2="130" y2="280" />
              <line x1="85" y1="260" x2="135" y2="260" />
              <line x1="90" y1="240" x2="140" y2="240" />
              <line x1="95" y1="220" x2="145" y2="220" />
              <line x1="100" y1="200" x2="148" y2="200" />
            </g>

            {/* Hilltop Shiva Temple (Pahari Mandir) */}
            <line x1="120" y1="70" x2="120" y2="30" strokeWidth="2" />
            {/* Trishul & Damru atop temple */}
            <path d="M112 38 C112 48 128 48 128 38" />
            <line x1="120" y1="30" x2="120" y2="48" strokeWidth="2" />
            {/* Flying Sacred Flag */}
            <path d="M120 30 L142 38 L120 46 Z" fill="white" fillOpacity="0.4" />
            
            {/* Pahari Mandir Shikhara */}
            <path d="M120 70 C108 95 98 130 92 180 L148 180 C142 130 132 95 120 70 Z" />
            <line x1="108" y1="105" x2="132" y2="105" />
            <line x1="102" y1="135" x2="138" y2="135" />
            <line x1="96" y1="160" x2="144" y2="160" />

            {/* Temple Sanctum at summit */}
            <rect x="85" y="180" width="70" height="70" />
            <path d="M105 250 L105 205 C105 195 135 195 135 205 L135 250" />
          </g>

          {/* ================= 7. RIGHT: BUNDU SUN TEMPLE (SURYA MANDIR) & MODERN INNOVATION ================= */}
          <g transform="translate(1260, 60)">
            {/* Sun Temple Chariot Dome */}
            <path d="M80 50 C80 20 140 20 140 50 L140 180 L80 180 Z" />
            <line x1="110" y1="20" x2="110" y2="0" strokeWidth="2" />
            <circle cx="110" cy="0" r="3" />
            
            {/* Giant Sun Temple Chariot Wheel (18 Spokes) */}
            <circle cx="110" cy="270" r="36" />
            <circle cx="110" cy="270" r="28" />
            <circle cx="110" cy="270" r="8" fill="white" fillOpacity="0.3" />
            {[0, 30, 60, 90, 120, 150].map((deg, idx) => (
              <line
                key={idx}
                x1="110"
                y1="234"
                x2="110"
                y2="306"
                transform={`rotate(${deg} 110 270)`}
                strokeOpacity="0.4"
              />
            ))}

            {/* Tech Code Overlay on Facade */}
            <rect x="50" y="180" width="120" height="160" />
            <path d="M72 135 L62 145 L72 155" strokeWidth="2" strokeOpacity="0.6" />
            <path d="M148 135 L158 145 L148 155" strokeWidth="2" strokeOpacity="0.6" />
            <line x1="118" y1="135" x2="102" y2="155" strokeWidth="2" strokeOpacity="0.6" />
          </g>

          {/* ================= 8. JHARKHAND'S DENSE SAL & MAHUA FORESTS (TREES ACROSS SKYLINE) ================= */}
          <g strokeOpacity="0.35" fillOpacity="0.04">
            {/* Cluster 1 (Left near Jagannath Temple) */}
            <path d="M20 380 C10 340 10 310 25 280 C40 310 40 340 30 380 Z" />
            <path d="M190 380 C180 345 180 315 195 290 C210 315 210 345 200 380 Z" />
            <path d="M220 380 C212 355 212 335 224 315 C236 335 236 355 228 380 Z" />

            {/* Cluster 2 (Near Birsa Munda Memorial) */}
            <path d="M410 380 C400 340 400 310 415 285 C430 310 430 340 420 380 Z" />
            <path d="M435 380 C428 355 428 335 440 315 C452 335 452 355 445 380 Z" />

            {/* Cluster 3 (Near Pahari Mandir Base) */}
            <path d="M890 380 C880 335 880 305 895 275 C910 305 910 335 900 380 Z" />
            <path d="M915 380 C908 350 908 330 920 310 C932 330 932 350 925 380 Z" />
            <path d="M1210 380 C1200 340 1200 310 1215 280 C1230 310 1230 340 1220 380 Z" />

            {/* Cluster 4 (Far Right) */}
            <path d="M1480 380 C1470 335 1470 305 1485 275 C1500 305 1500 335 1490 380 Z" />
            <path d="M1520 380 C1512 350 1512 330 1524 310 C1536 330 1536 350 1528 380 Z" />
            <path d="M1560 380 C1550 340 1550 310 1565 280 C1580 310 1580 340 1570 380 Z" />
          </g>
        </g>
      </svg>

      {/* Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent pointer-events-none" />
    </div>
  );
};

export default SkylineIllustration;
