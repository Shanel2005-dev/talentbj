import type { ReactNode } from 'react';

interface StampStepProps {
  number: number;
  titre: string;
  description: string;
  icon: ReactNode;
  rotation?: number;
}

const ROTATIONS = [-2, 1.5, -1];

export default function StampStep({ number, titre, description, icon, rotation }: StampStepProps) {
  const rot = rotation ?? ROTATIONS[(number - 1) % 3];

  return (
    <div
      className="relative bg-white p-6 cursor-default select-none transition-transform hover:scale-[1.03] hover:rotate-0"
      style={{
        transform: `rotate(${rot}deg)`,
        border: '2px dashed #F5A623',
        borderRadius: 16,
        boxShadow: '4px 4px 0px #F5A623',
        transition: 'transform 0.25s ease',
      }}
    >
      {/* Number stamp in corner */}
      <div
        className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          backgroundColor: '#F5A623',
          color: '#0B1F3A',
          fontFamily: 'JetBrains Mono, monospace',
          border: '2px solid #0B1F3A',
        }}
      >
        {String(number).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: '#0B1F3A' }}
      >
        {icon}
      </div>

      {/* Content */}
      <h3
        className="text-lg font-bold mb-2"
        style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#0B1F3A' }}
      >
        {titre}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A' }}>
        {description}
      </p>

      {/* Stamp overlay effect */}
      <div
        className="absolute bottom-3 right-4 text-xs font-bold uppercase tracking-widest opacity-10"
        style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F5A623', fontSize: 9 }}
      >
        TalentBJ
      </div>
    </div>
  );
}
