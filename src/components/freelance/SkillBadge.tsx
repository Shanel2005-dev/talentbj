interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'dark' | 'gold';
  size?: 'sm' | 'md';
}

export default function SkillBadge({ skill, variant = 'default', size = 'md' }: SkillBadgeProps) {
  const styles = {
    default: { bg: '#F7F3EC', text: '#0B1F3A', border: '#E8E4DC' },
    dark: { bg: '#142A4D', text: '#F7F3EC', border: 'rgba(255,255,255,0.1)' },
    gold: { bg: 'rgba(245,166,35,0.12)', text: '#F5A623', border: 'rgba(245,166,35,0.3)' },
  };

  const s = styles[variant];
  const padding = size === 'sm' ? '3px 10px' : '5px 14px';
  const fontSize = size === 'sm' ? 11 : 12;

  return (
    <span
      className="inline-flex items-center font-medium rounded-md"
      style={{
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        padding,
        fontSize,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {skill}
    </span>
  );
}
