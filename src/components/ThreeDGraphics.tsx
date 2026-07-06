import React from 'react';

// 1. Safety Helmet & Shield 3D (Accident)
export function Accident3D() {
  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-amber-500/5 to-amber-600/5 border border-amber-500/10 shadow-inner">
      {/* Backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.25)_0%,transparent_70%)]"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
        <defs>
          <linearGradient id="shieldGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="helmetGrad" x1="35" y1="35" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="glassReflection" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="helmetGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Tech Circle Grid */}
        <circle cx="60" cy="60" r="48" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
        <circle cx="60" cy="60" r="42" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.15" />

        {/* 3D Glassmorphic Shield Backdrop */}
        <path d="M60 22C74 22 88 26 88 44C88 68 64 88 60 92C56 88 32 68 32 44C32 26 46 22 60 22Z" fill="url(#shieldGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />
        
        {/* Shiny Glass Highlight */}
        <path d="M60 24C72 24 84 27.5 84 43C84 55 74 72 60 84" stroke="url(#glassReflection)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />

        {/* Floating 3D Construction Safety Helmet */}
        <g transform="translate(0, 5)">
          {/* Helmet shadow */}
          <ellipse cx="60" cy="74" rx="22" ry="6" fill="#000000" fillOpacity="0.25" filter="blur(2px)" />

          {/* Helmet Dome */}
          <path d="M40 56C40 40 80 40 80 56H40Z" fill="url(#helmetGrad)" stroke="#B45309" strokeWidth="1" />
          
          {/* Dome reflection highlight */}
          <path d="M44 50C44 42 76 42 76 50" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" />
          
          {/* Helmet Visor / Rim */}
          <path d="M34 56C34 54 38 52 60 52C82 52 86 54 86 56C86 59 80 60 60 60C40 60 34 59 34 56Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
          
          {/* Visor shine */}
          <path d="M38 55C48 54.5 72 54.5 82 55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
          
          {/* Middle reinforcement rib */}
          <path d="M57 41C57 41 58 53 58 55H62C62 53 63 41 63 41H57Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1" />
          
          {/* Sparkles */}
          <circle cx="82" cy="38" r="3" fill="url(#helmetGlow)" />
          <path d="M82 34V42M78 38H86" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// 2. Jet Plane & Globe 3D (International Travel)
export function TravelIntl3D() {
  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-blue-500/5 to-sky-600/5 border border-blue-500/10 shadow-inner">
      {/* Backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,transparent_70%)]"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_10px_20px_rgba(14,165,233,0.3)]">
        <defs>
          <linearGradient id="globeGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="planeGrad" x1="30" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="glassGlint" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Tech orbits */}
        <circle cx="60" cy="60" r="48" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.2" />
        <ellipse cx="60" cy="60" rx="46" ry="16" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" transform="rotate(-25 60 60)" />

        {/* 3D Translucent Glass Globe */}
        <circle cx="60" cy="60" r="38" fill="url(#globeGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" />
        
        {/* Globe Grid Lines (Latitudes/Longitudes) */}
        <path d="M22 60H98" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />
        <path d="M26 42H94" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.15" />
        <path d="M26 78H94" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.15" />
        <path d="M60 22C60 22 72 38 72 60C72 82 60 98 60 98C60 98 48 82 48 60C48 38 60 22 60 22Z" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.25" />

        {/* Glass Reflection Highlight */}
        <path d="M25 45C33 30 50 24 68 25" stroke="url(#glassGlint)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />

        {/* 3D Jet Airplane soaring out of the globe */}
        <g transform="translate(5, -5)">
          {/* Airplane shadow on globe */}
          <path d="M50 78L78 88L70 94L45 84L50 78Z" fill="#000000" fillOpacity="0.3" filter="blur(3px)" />

          {/* Fuselage (Body) */}
          <path d="M40 76C40 76 65 52 76 40C80 36 84 37 86 39C88 41 89 45 85 49L56 78C52 82 40 76 40 76Z" fill="url(#planeGrad)" stroke="#94A3B8" strokeWidth="0.8" />
          
          {/* Main Wings */}
          <path d="M54 58L22 46L30 38L50 52V58Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
          <path d="M68 62L82 92L74 96L62 68V62Z" fill="url(#planeGrad)" stroke="#94A3B8" strokeWidth="0.8" />
          
          {/* Tail Fin */}
          <path d="M43 73L30 82L28 78L39 69V73Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
          
          {/* Window Cockpit Glare */}
          <path d="M78 41C78 41 80 40 82 42C84 44 83 46 83 46" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Speed line trails */}
          <path d="M12 36L20 40M15 28L25 33" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

// 3. Map Marker Pin & Compass 3D (Domestic Travel)
export function TravelDom3D() {
  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-500/5 to-teal-600/5 border border-emerald-500/10 shadow-inner">
      {/* Backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.25)_0%,transparent_70%)]"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
        <defs>
          <linearGradient id="mapGrad" x1="20" y1="60" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="pinGrad" x1="45" y1="20" x2="75" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="glassTop" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Grid and Compass dial */}
        <circle cx="60" cy="65" r="45" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="60" cy="65" r="38" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />

        {/* 3D Glass Isometric Map Grid Base */}
        <g transform="translate(0, 10)">
          <path d="M60 40 L95 58 L60 76 L25 58 Z" fill="url(#mapGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />
          
          {/* Map details / path */}
          <path d="M40 50 L60 60 L80 50" stroke="#059669" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M45 55 L60 63 L75 55" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
          
          {/* Glossy reflection on the base */}
          <path d="M30 56 L60 42 L90 56" stroke="url(#glassTop)" strokeWidth="3" strokeOpacity="0.4" strokeLinecap="round" />
        </g>

        {/* 3D Red Glossy Map Pin floating over map */}
        <g transform="translate(0, -2)">
          {/* Pin Shadow on the map */}
          <ellipse cx="60" cy="66" rx="8" ry="4" fill="#000000" fillOpacity="0.35" filter="blur(2px)" />

          {/* 3D Pin Tear shape */}
          <path d="M60 65C58 65 44 51 44 38C44 26 51 20 60 20C69 20 76 26 76 38C76 51 62 65 60 65Z" fill="url(#pinGrad)" stroke="#FFF" strokeWidth="1" />
          
          {/* Inner ring circle */}
          <circle cx="60" cy="38" r="8" fill="#FFFFFF" />
          <circle cx="60" cy="38" r="5" fill="#991B1B" />
          
          {/* Glossy high-contrast shine */}
          <path d="M48 34C48 26 54 22 60 22" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
          
          {/* Floating tiny locator dots */}
          <circle cx="36" cy="24" r="2.5" fill="#34D399" />
          <circle cx="86" cy="42" r="3" fill="#6EE7B7" />
        </g>
      </svg>
    </div>
  );
}

// 4. Medical Pulse & Cross 3D (PTI Care)
export function HealthPti3D() {
  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-500/5 to-purple-600/5 border border-indigo-500/10 shadow-inner">
      {/* Backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25)_0%,transparent_70%)]"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_10px_20px_rgba(139,92,246,0.3)]">
        <defs>
          <linearGradient id="shieldBg" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="crossGrad" x1="45" y1="35" x2="75" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <linearGradient id="glassReflection2" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Decorative Grid */}
        <circle cx="60" cy="60" r="48" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M20 60H100" stroke="#8B5CF6" strokeWidth="0.5" strokeOpacity="0.15" />
        <path d="M60 20V100" stroke="#8B5CF6" strokeWidth="0.5" strokeOpacity="0.15" />

        {/* 3D Glass Medical Shield */}
        <path d="M60 22C74 22 88 27 88 45C88 65 65 85 60 92C55 85 32 65 32 45C32 27 46 22 60 22Z" fill="url(#shieldBg)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />
        
        {/* Glass reflection */}
        <path d="M60 24C72 24 84 28 84 44C84 55 72 71 60 84" stroke="url(#glassReflection2)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />

        {/* Floating Red Glossy Health Cross */}
        <g transform="translate(0, -6)">
          <path d="M54 38H66V50H78V62H66V74H54V62H42V50H54V38Z" fill="url(#crossGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Inner shiny glow cross */}
          <path d="M56 40H64V52H76V60H64V72H56V60H44V52H56V40Z" fill="#F87171" fillOpacity="0.3" />
          
          {/* Shiny cross highlight */}
          <path d="M44 52H56V40" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        </g>

        {/* Neon Active EKG Heartbeat Wave Overlay */}
        <path d="M22 68L38 68L44 54L50 82L56 60L60 68H98" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_#10B981]" />
        <path d="M22 68L38 68L44 54L50 82L56 60L60 68H98" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
      </svg>
    </div>
  );
}

// 5. Giant Brilliant 3D Diamond (EliteCare)
export function EliteCare3D() {
  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-pink-500/5 to-rose-600/5 border border-pink-500/10 shadow-inner">
      {/* Backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.25)_0%,transparent_70%)]"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_10px_20px_rgba(244,63,94,0.35)]">
        <defs>
          <linearGradient id="diaGlow" x1="10" y1="10" x2="110" y2="110">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E11D48" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="facetGrad1" x1="60" y1="20" x2="60" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="facetGrad2" x1="30" y1="50" x2="60" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="facetGrad3" x1="90" y1="50" x2="60" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
        </defs>

        {/* Halo circles */}
        <circle cx="60" cy="60" r="48" stroke="#F43F5E" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="6 3" />
        <circle cx="60" cy="60" r="42" stroke="#EC4899" strokeWidth="0.8" strokeOpacity="0.15" />

        {/* Glowing glass back aura */}
        <circle cx="60" cy="58" r="30" fill="url(#diaGlow)" />

        {/* 3D Glassmorphic Premium Diamond */}
        <g transform="translate(0, 4)">
          {/* Diamond shadow */}
          <ellipse cx="60" cy="85" rx="20" ry="5" fill="#000000" fillOpacity="0.3" filter="blur(2px)" />

          {/* Facets - Hand-crafted vectors for a pristine 3D jewel */}
          {/* Top-center facet */}
          <polygon points="44,38 76,38 68,52 52,52" fill="url(#facetGrad1)" stroke="#FFFFFF" strokeWidth="0.8" />
          
          {/* Top-left facet */}
          <polygon points="26,38 44,38 52,52 35,52" fill="#FFE4E6" fillOpacity="0.75" stroke="#FFFFFF" strokeWidth="0.8" />
          
          {/* Top-right facet */}
          <polygon points="76,38 94,38 85,52 68,52" fill="#FECDD3" fillOpacity="0.8" stroke="#FFFFFF" strokeWidth="0.8" />
          
          {/* Bottom-center facet */}
          <polygon points="52,52 68,52 60,88" fill="url(#facetGrad2)" stroke="#FFFFFF" strokeWidth="0.8" />
          
          {/* Bottom-left facet */}
          <polygon points="35,52 52,52 60,88" fill="#E11D48" stroke="#FFFFFF" strokeWidth="0.8" />
          
          {/* Bottom-right facet */}
          <polygon points="68,52 85,52 60,88" fill="url(#facetGrad3)" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Sparkles of premium status */}
          <path d="M30,26V34M26,30H34" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <path d="M92,22V28M89,25H95" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M88,72V78M85,75H91" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// 6. Builders Crane & Cog 3D (Workers' Compensation)
export function WorkersComp3D() {
  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-violet-500/5 to-fuchsia-600/5 border border-violet-500/10 shadow-inner">
      {/* Backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.25)_0%,transparent_70%)]"></div>
      
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_10px_20px_rgba(139,92,246,0.3)]">
        <defs>
          <linearGradient id="gearGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#A78BFA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="craneGrad" x1="30" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="glassReflection3" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Circular Grid dial */}
        <circle cx="60" cy="60" r="48" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="60" cy="60" r="42" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 2" strokeOpacity="0.15" />

        {/* 3D Glass Industrial Gear Cog */}
        <g transform="translate(0, 2)">
          {/* Gear teeth paths */}
          <path d="M60 22C63 22 64 25 67 26C70 24 73 24 75 26C77 28 77 31 75 34C78 37 79 38 82 38C85 36 88 36 90 38C92 40 92 43 90 46C92 49 93 50 96 50C99 49 101 51 101 54V66C101 69 99 71 96 70C93 70 92 71 90 74C92 77 92 80 90 82C88 84 85 84 82 82C79 82 78 83 75 86C77 89 77 92 75 94C73 96 70 96 67 94C64 95 63 98 60 98H52C49 98 48 95 45 94C42 96 39 96 37 94C35 92 35 89 37 86C34 83 33 82 30 82C27 84 24 84 22 82C20 80 20 77 22 74C20 71 19 70 16 70C13 71 11 69 11 66V54C11 51 13 49 16 50C19 50 20 49 22 46C20 43 20 40 22 38C24 36 27 36 30 38C33 38 34 37 37 34C35 31 35 28 37 26C39 24 42 24 45 26C48 25 49 22 52 22H60Z" 
            fill="url(#gearGrad)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />
          
          {/* Inner glass reflection rim */}
          <circle cx="56" cy="60" r="24" stroke="url(#glassReflection3)" strokeWidth="2.5" strokeOpacity="0.4" />
          <circle cx="56" cy="60" r="16" fill="#FFFFFF" fillOpacity="0.1" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
        </g>

        {/* 3D construction crane structure / hook layered above */}
        <g transform="translate(10, -5)">
          {/* Crane shadow */}
          <path d="M45 55L65 35L70 40L50 60Z" fill="#000000" fillOpacity="0.25" filter="blur(2px)" />

          {/* Crane Boom & Mast structure */}
          <path d="M22 68H78" stroke="url(#craneGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 68L30 32" stroke="url(#craneGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 32H66" stroke="url(#craneGrad)" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Diagonal truss lines */}
          <path d="M30 44L42 32M42 32L54 44" stroke="#FFF" strokeWidth="1" strokeOpacity="0.8" />
          
          {/* Crane Trolley & Cable & Hook */}
          <rect x="52" y="32" width="6" height="4" fill="#1E293B" />
          <line x1="55" y1="36" x2="55" y2="52" stroke="#475569" strokeWidth="1" />
          
          {/* Metallic hook */}
          <path d="M55 52C53 52 52 53 52 55C52 57 54 58 56 58C57 58 58 57 58 55H56" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Sparkles */}
          <path d="M72,30V36M69,33H75" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// 7. Personal Protection 3D Banner Graphic (Family/Home/Umbrella Glassmorphic)
export function PersonalBanner3D() {
  return (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center select-none overflow-hidden rounded-2xl">
      {/* Soft internal glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2)_0%,transparent_75%)]"></div>
      
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_15px_30px_rgba(3,55,123,0.25)]">
        <defs>
          <linearGradient id="umbrellaGrad" x1="40" y1="20" x2="110" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="houseGrad" x1="50" y1="65" x2="100" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="shieldGlass" x1="15" y1="15" x2="135" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#E0F2FE" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="goldGlow" x1="0" y1="0" x2="150" y2="150">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
          <filter id="glassBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Tech decorative rings */}
        <circle cx="75" cy="75" r="62" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="5 3" strokeOpacity="0.25" />
        <circle cx="75" cy="75" r="54" stroke="#03377B" strokeWidth="0.5" strokeOpacity="0.15" />
        
        {/* Floating background glowing orbs */}
        <circle cx="110" cy="45" r="14" fill="url(#goldGlow)" />
        <circle cx="35" cy="105" r="8" fill="#38BDF8" fillOpacity="0.2" />

        {/* 3D Glassmorphic Shield Backdrop */}
        <path d="M75 24 C95 24 115 30 115 52 C115 80 75 112 75 118 C75 112 35 80 35 52 C35 30 55 24 75 24 Z" 
              fill="url(#shieldGlass)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />
        
        {/* Glass reflection highlight edge */}
        <path d="M75 26 C92 26 111 31.5 111 50 C111 68 95 94 75 109" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.45" />

        {/* Floating 3D Umbrella (Protection Symbol) */}
        <g transform="translate(0, -5)">
          {/* Umbrella handle & shaft */}
          <path d="M75 55 V88 C75 91 72 93 69 93 C66 93 65 91 65 89" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Umbrella Canopy */}
          <path d="M42 62 C42 42 108 42 108 62 C101 64 94 60 91 58 C85 56 78 60 75 60 C72 60 65 56 59 58 C56 60 49 64 42 62 Z" 
                fill="url(#umbrellaGrad)" stroke="#0284C7" strokeWidth="1" />
                
          {/* Canopy Highlights */}
          <path d="M47 58 C60 46 90 46 103 58" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          
          {/* Tip */}
          <path d="M75 44 V41" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Translucent 3D Miniature House nested under umbrella */}
        <g transform="translate(0, 10)">
          {/* House Base */}
          <rect x="62" y="80" width="26" height="18" rx="2" fill="url(#houseGrad)" stroke="#03377B" strokeWidth="1" strokeOpacity="0.25" />
          {/* House Door */}
          <rect x="71" y="88" width="8" height="10" rx="1" fill="#03377B" fillOpacity="0.8" />
          {/* House Roof */}
          <polygon points="58,80 75,66 92,80" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
          {/* Roof shine */}
          <line x1="63" y1="78" x2="74" y2="69" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </g>

        {/* Magical Sparkles */}
        <path d="M120,40 L121.5,43 L124.5,44 L121.5,45 L120,48 L118.5,45 L115.5,44 L118.5,43 Z" fill="#F59E0B" />
        <path d="M30,55 L31,57 L33,57.5 L31,58 L30,60 L29,58 L27,57.5 L29,57 Z" fill="#38BDF8" />
      </svg>
    </div>
  );
}

// 8. Corporate Solution 3D Banner Graphic (Skyscrapers/Data Gear/Golden Shield)
export function CorporateBanner3D() {
  return (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center select-none overflow-hidden rounded-2xl">
      {/* Soft internal glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_75%)]"></div>
      
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_15px_30px_rgba(3,55,123,0.35)]">
        <defs>
          <linearGradient id="corpShieldGlass" x1="15" y1="15" x2="135" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#03377B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="goldBuilding" x1="40" y1="50" x2="40" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="blueBuilding" x1="65" y1="35" x2="65" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="darkBuilding" x1="90" y1="60" x2="90" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="glassRoof" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tech orbit grid */}
        <ellipse cx="75" cy="112" rx="60" ry="15" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
        <ellipse cx="75" cy="112" rx="48" ry="12" stroke="#FBBF24" strokeWidth="0.75" strokeDasharray="4 3" strokeOpacity="0.25" />

        {/* 3D Glassmorphic Tech Hexagon/Shield backdrop */}
        <path d="M75 18 L122 42 L122 98 L75 124 L28 98 L28 42 Z" 
              fill="url(#corpShieldGlass)" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
        
        {/* Shiny Glass highlights */}
        <path d="M75 20 L118 43 L118 94" stroke="url(#glassRoof)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />

        {/* 3D Isometric Skyscrapers */}
        <g transform="translate(0, 5)">
          
          {/* Left Tower (Gold - Financial) */}
          <g>
            {/* Front Left Face */}
            <path d="M42 70 L55 77 L55 105 L42 98 Z" fill="url(#goldBuilding)" stroke="#B45309" strokeWidth="0.5" />
            {/* Front Right Face */}
            <path d="M55 77 L68 70 L68 98 L55 105 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="0.5" />
            {/* Roof */}
            <path d="M42 70 L55 63 L68 70 L55 77 Z" fill="#FFFBEB" stroke="#B45309" strokeWidth="0.5" />
            {/* Windows Left */}
            <line x1="47" y1="76" x2="47" y2="94" stroke="#FFF" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.6" />
            <line x1="51" y1="78" x2="51" y2="96" stroke="#FFF" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.6" />
            {/* Windows Right */}
            <line x1="59" y1="78" x2="59" y2="96" stroke="#D97706" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.5" />
            <line x1="63" y1="76" x2="63" y2="94" stroke="#D97706" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.5" />
          </g>

          {/* Middle Tower (Blue - High Tech Corporate) - Taller */}
          <g>
            {/* Front Left Face */}
            <path d="M63 48 L78 57 L78 108 L63 99 Z" fill="url(#blueBuilding)" stroke="#0369A1" strokeWidth="0.5" />
            {/* Front Right Face */}
            <path d="M78 57 L93 48 L93 99 L78 108 Z" fill="#7DD3FC" stroke="#0369A1" strokeWidth="0.5" />
            {/* Roof */}
            <path d="M63 48 L78 39 L93 48 L78 57 Z" fill="#E0F2FE" stroke="#0369A1" strokeWidth="0.5" />
            
            {/* Windows grid front-left */}
            <line x1="68" y1="56" x2="68" y2="94" stroke="#FFF" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.75" />
            <line x1="73" y1="59" x2="73" y2="97" stroke="#FFF" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.75" />
            
            {/* Windows grid front-right */}
            <line x1="83" y1="59" x2="83" y2="97" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
            <line x1="88" y1="56" x2="88" y2="94" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
            
            {/* Spire */}
            <line x1="78" y1="39" x2="78" y2="25" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="78" cy="24" r="2" fill="#FBBF24" />
          </g>

          {/* Right Tower (Slate - Operations/Services) */}
          <g>
            {/* Front Left Face */}
            <path d="M88 68 L100 75 L100 102 L88 95 Z" fill="url(#darkBuilding)" stroke="#64748B" strokeWidth="0.5" />
            {/* Front Right Face */}
            <path d="M100 75 L112 68 L112 95 L100 102 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="0.5" />
            {/* Roof */}
            <path d="M88 68 L100 61 L112 68 L100 75 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.5" />
            {/* Windows Left */}
            <line x1="93" y1="74" x2="93" y2="91" stroke="#FFF" strokeWidth="1.5" strokeDasharray="2 1" strokeOpacity="0.6" />
            {/* Windows Right */}
            <line x1="107" y1="72" x2="107" y2="89" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 1" strokeOpacity="0.5" />
          </g>
        </g>

        {/* Floating tech cogs/data nodes */}
        <circle cx="35" cy="42" r="5" fill="#FBBF24" fillOpacity="0.9" />
        <line x1="35" y1="42" x2="48" y2="52" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
        
        {/* Bright gold starburst */}
        <path d="M78,24 L79,21 L82,20 L79,19 L78,16 L77,19 L74,20 L77,21 Z" fill="#FBBF24" />
      </svg>
    </div>
  );
}

