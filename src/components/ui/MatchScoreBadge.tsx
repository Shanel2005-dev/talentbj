interface MatchScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function MatchScoreBadge({
  score,
  size = 'md',
  showLabel = true,
  className = '',
}: MatchScoreBadgeProps) {
  const getColor = (s: number) => {
    if (s >= 90) return { bg: '#FFF8EC', text: '#F5A623', ring: '#F5A623' };
    if (s >= 80) return { bg: '#FFF8EC', text: '#E09020', ring: '#E09020' };
    if (s >= 70) return { bg: '#F0FDF4', text: '#1FAE7A', ring: '#1FAE7A' };
    return { bg: '#F7F3EC', text: '#5C6B7A', ring: '#9CA3AF' };
  };

  const color = getColor(score);

  const sizeMap = {
    sm: { outer: 44, font: 14, label: 9 },
    md: { outer: 64, font: 20, label: 10 },
    lg: { outer: 96, font: 30, label: 12 },
  };

  const s = sizeMap[size];

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl ${className}`}
      style={{
        width: s.outer,
        height: s.outer,
        backgroundColor: color.bg,
        border: `2px solid ${color.ring}`,
      }}
    >
      <span
        className="font-bold leading-none"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: s.font,
          color: color.text,
          letterSpacing: '-0.02em',
        }}
      >
        {score}%
      </span>
      {showLabel && (
        <span
          className="font-semibold uppercase tracking-wider mt-0.5"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: s.label, color: color.text }}
        >
          match
        </span>
      )}
    </div>
  );
}
