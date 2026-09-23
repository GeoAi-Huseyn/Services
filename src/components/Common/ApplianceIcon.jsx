import React from 'react';

export function RefrigeratorIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="11" y="5" width="26" height="38" rx="4" />
      <line x1="11" y1="18" x2="37" y2="18" />
      <line x1="15" y1="10" x2="15" y2="14" strokeWidth="2.5" />
      <line x1="15" y1="22" x2="15" y2="28" strokeWidth="2.5" />
      <path d="M29 27v6M26 30h6M26.8 27.8l4.4 4.4M26.8 32.2l4.4-4.4" strokeWidth="1.8" />
    </svg>
  );
}

export function FreezerIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="11" y="5" width="26" height="38" rx="4" />
      <line x1="11" y1="17" x2="37" y2="17" />
      <line x1="20" y1="11" x2="28" y2="11" strokeWidth="2.5" />
      <path d="M24 24v12M18 30h12M19.8 25.8l8.4 8.4M19.8 34.2l8.4-8.4" strokeWidth="1.8" />
    </svg>
  );
}

export function WasherIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="6" width="30" height="36" rx="4" />
      <line x1="9" y1="15" x2="39" y2="15" />
      <line x1="13" y1="10.5" x2="19" y2="10.5" strokeWidth="2" />
      <circle cx="33" cy="10.5" r="2" strokeWidth="2" />
      <circle cx="24" cy="28" r="9.5" />
      <circle cx="24" cy="28" r="6" strokeDasharray="3 2" strokeWidth="1.6" />
      <path d="M21 28c1-1.5 2.5-1.5 3.5 0s2.5 1.5 3.5 0" strokeWidth="1.8" />
    </svg>
  );
}

export function DryerIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="6" width="30" height="36" rx="4" />
      <line x1="9" y1="15" x2="39" y2="15" />
      <circle cx="15" cy="10.5" r="1.8" strokeWidth="2" />
      <line x1="29" y1="10.5" x2="35" y2="10.5" strokeWidth="2" />
      <circle cx="24" cy="28" r="9.5" />
      <path d="M20 24l8 8M28 24l-8 8" strokeWidth="1.8" />
      <circle cx="24" cy="28" r="2.5" fill={color} />
    </svg>
  );
}

export function DishwasherIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="6" width="30" height="36" rx="4" />
      <line x1="9" y1="14" x2="39" y2="14" />
      <line x1="16" y1="10" x2="32" y2="10" strokeWidth="2.5" />
      <rect x="14" y="19" width="20" height="18" rx="2" strokeWidth="1.6" />
      <line x1="19" y1="23" x2="19" y2="33" strokeWidth="1.8" />
      <line x1="24" y1="23" x2="24" y2="33" strokeWidth="1.8" />
      <line x1="29" y1="23" x2="29" y2="33" strokeWidth="1.8" />
    </svg>
  );
}

export function OvenIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="6" width="30" height="36" rx="4" />
      <line x1="9" y1="15" x2="39" y2="15" />
      <circle cx="15" cy="10.5" r="1.5" fill={color} />
      <circle cx="21" cy="10.5" r="1.5" fill={color} />
      <circle cx="27" cy="10.5" r="1.5" fill={color} />
      <circle cx="33" cy="10.5" r="1.5" fill={color} />
      <line x1="15" y1="19" x2="33" y2="19" strokeWidth="2.5" />
      <rect x="14" y="23" width="20" height="14" rx="2" strokeWidth="1.8" />
      <line x1="17" y1="30" x2="31" y2="30" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function CooktopIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Cooktop outer rectangular frame */}
      <rect x="7" y="10" width="34" height="28" rx="4" />
      {/* 4 Cooktop burners with concentric circles */}
      <circle cx="16" cy="19" r="4.5" />
      <circle cx="16" cy="19" r="1.5" fill={color} />
      <circle cx="32" cy="19" r="4.5" />
      <circle cx="32" cy="19" r="1.5" fill={color} />
      <circle cx="16" cy="29" r="4.5" />
      <circle cx="16" cy="29" r="1.5" fill={color} />
      <circle cx="32" cy="29" r="4.5" />
      <circle cx="32" cy="29" r="1.5" fill={color} />
    </svg>
  );
}

export function MicrowaveIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="11" width="34" height="26" rx="4" />
      <rect x="11" y="15" width="20" height="18" rx="2" strokeWidth="1.8" />
      <line x1="34" y1="16" x2="37" y2="16" strokeWidth="2" />
      <line x1="34" y1="20" x2="37" y2="20" strokeWidth="2" />
      <line x1="34" y1="24" x2="37" y2="24" strokeWidth="2" />
      <line x1="33" y1="29" x2="38" y2="29" strokeWidth="2" />
    </svg>
  );
}

export function IceMakerIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Ice bucket bin container */}
      <path d="M10 16h28l-3 22H13l-3-22z" strokeWidth="2.4" />
      <line x1="8" y1="16" x2="40" y2="16" strokeWidth="2.4" />
      {/* Ice cubes inside */}
      <rect x="16" y="21" width="6" height="6" rx="1.5" strokeWidth="1.8" />
      <rect x="26" y="21" width="6" height="6" rx="1.5" strokeWidth="1.8" />
      <rect x="21" y="29" width="6" height="6" rx="1.5" strokeWidth="1.8" />
    </svg>
  );
}

export function WineCoolerIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="12" y="5" width="24" height="38" rx="3" />
      <rect x="16" y="9" width="16" height="30" rx="2" strokeWidth="1.6" />
      <line x1="16" y1="17" x2="32" y2="17" strokeWidth="1.5" />
      <line x1="16" y1="24" x2="32" y2="24" strokeWidth="1.5" />
      <line x1="16" y1="31" x2="32" y2="31" strokeWidth="1.5" />
      {/* Wine bottle neck & body outline */}
      <path d="M21 21v-4h2v4l1.5 2v4h-5v-4z" strokeWidth="1.4" fill="none" />
      <line x1="29" y1="12" x2="29" y2="14" strokeWidth="2" />
    </svg>
  );
}

export function RangeHoodIcon({ className = '', size = 30, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Chimney */}
      <path d="M19 8h10v12H19z" strokeWidth="2" />
      {/* Hood canopy */}
      <path d="M10 30l9-10h10l9 10H10z" strokeWidth="2" />
      <rect x="8" y="30" width="32" height="6" rx="2" strokeWidth="2" />
      {/* Baffle filter vents */}
      <line x1="14" y1="36" x2="14" y2="38" strokeWidth="2" />
      <line x1="24" y1="36" x2="24" y2="38" strokeWidth="2" />
      <line x1="34" y1="36" x2="34" y2="38" strokeWidth="2" />
    </svg>
  );
}

export default function ApplianceIcon({ name, iconKey, slug, className = '', size = 30, color = 'currentColor' }) {
  const key = (iconKey || slug || name || '').toLowerCase();
  
  if (key.includes('refrigerator') || key.includes('soyuducu')) {
    return <RefrigeratorIcon className={className} size={size} color={color} />;
  }
  if (key.includes('freezer') || key.includes('dondurucu')) {
    return <FreezerIcon className={className} size={size} color={color} />;
  }
  if (key.includes('washer') || key.includes('washing') || key.includes('paltaryuyan')) {
    return <WasherIcon className={className} size={size} color={color} />;
  }
  if (key.includes('dryer') || key.includes('quruducu')) {
    return <DryerIcon className={className} size={size} color={color} />;
  }
  if (key.includes('dishwasher') || key.includes('qabyuyan')) {
    return <DishwasherIcon className={className} size={size} color={color} />;
  }
  if (key.includes('cooktop') || key.includes('plite')) {
    return <CooktopIcon className={className} size={size} color={color} />;
  }
  if (key.includes('hood') || key.includes('aspirator')) {
    return <RangeHoodIcon className={className} size={size} color={color} />;
  }
  if (key.includes('ice') || key.includes('buz')) {
    return <IceMakerIcon className={className} size={size} color={color} />;
  }
  if (key.includes('wine') || key.includes('cooler') || key.includes('serab')) {
    return <WineCoolerIcon className={className} size={size} color={color} />;
  }
  if (key.includes('microwave') || key.includes('mikrodalga')) {
    return <MicrowaveIcon className={className} size={size} color={color} />;
  }
  if (key.includes('oven') || key.includes('stove') || key.includes('soba') || key.includes('range')) {
    return <OvenIcon className={className} size={size} color={color} />;
  }

  // Fallback
  return <RefrigeratorIcon className={className} size={size} color={color} />;
}
