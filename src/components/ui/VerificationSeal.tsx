import { useEffect, useRef, useState } from 'react';

interface VerificationSealProps {
  size?: number;
  variant?: 'default' | 'large' | 'mini';
  animated?: boolean;
  className?: string;
}

export default function VerificationSeal({
  size = 64,
  variant = 'default',
  animated = false,
  className = '',
}: VerificationSealProps) {
  const [visible, setVisible] = useState(!animated);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animated) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  if (variant === 'mini') {
    return (
      <svg
        ref={ref}
        width={size} height={size}
        viewBox="0 0 100 100"
        className={`${animated ? (visible ? 'seal-animate' : 'opacity-0') : ''} ${className}`}
        aria-label="Profil vérifié TalentBJ"
      >
        <circle cx="50" cy="50" r="47" fill="none" stroke="#F5A623" strokeWidth="3" strokeDasharray="5 3.5" />
        <circle cx="50" cy="50" r="40" fill="#F5A623" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#0B1F3A" strokeWidth="1.5" strokeDasharray="2.5 3" />
        <path d="M33 50 L44 63 L67 37" stroke="#0B1F3A" strokeWidth="6"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (variant === 'large') {
    return (
      <svg
        ref={ref}
        width={size} height={size}
        viewBox="0 0 200 200"
        className={`${animated ? (visible ? 'seal-animate' : 'opacity-0') : ''} ${className}`}
        aria-label="Sceau de vérification TalentBJ"
      >
        {/* Outer serrated ring */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="#F5A623" strokeWidth="4" strokeDasharray="8 5" />
        {/* Space ring */}
        <circle cx="100" cy="100" r="87" fill="none" stroke="#F5A623" strokeWidth="0.8" strokeOpacity="0.35" />
        {/* Main gold fill */}
        <circle cx="100" cy="100" r="80" fill="#F5A623" />
        {/* Inner decorative ring */}
        <circle cx="100" cy="100" r="73" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeDasharray="3 4" />
        {/* Inner circle (dark) */}
        <circle cx="100" cy="100" r="64" fill="#0B1F3A" />
        {/* Checkmark */}
        <path d="M68 100 L88 122 L132 76" stroke="#F5A623" strokeWidth="8"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Arc text path */}
        <defs>
          <path id="top-arc-seal"
            d="M 22,100 A 78,78 0 0,1 178,100" />
          <path id="bottom-arc-seal"
            d="M 26,112 A 74,74 0 0,0 174,112" />
        </defs>
        <text fontSize="11" fontFamily="Space Grotesk, sans-serif" fontWeight="700"
          fill="#0B1F3A" letterSpacing="2">
          <textPath href="#top-arc-seal" startOffset="8%">VÉRIFIÉ PAR TALENTBJ</textPath>
        </text>
        <text fontSize="10" fontFamily="Space Grotesk, sans-serif" fontWeight="600"
          fill="#0B1F3A" letterSpacing="1.5">
          <textPath href="#bottom-arc-seal" startOffset="15%">AFRIQUE DE L'OUEST</textPath>
        </text>
      </svg>
    );
  }

  // Default
  return (
    <svg
      ref={ref}
      width={size} height={size}
      viewBox="0 0 100 100"
      className={`${animated ? (visible ? 'seal-animate' : 'opacity-0') : ''} ${className}`}
      aria-label="Profil vérifié TalentBJ"
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="#F5A623" strokeWidth="3.5" strokeDasharray="5.5 3.5" />
      <circle cx="50" cy="50" r="39" fill="#F5A623" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="#0B1F3A" strokeWidth="1.5" strokeDasharray="2.5 3.5" />
      <circle cx="50" cy="50" r="28" fill="#0B1F3A" />
      <path d="M36 50 L46 62 L64 38" stroke="#F5A623" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
