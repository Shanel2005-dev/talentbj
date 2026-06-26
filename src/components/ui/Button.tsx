import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

const STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#F5A623',
    color: '#0B1F3A',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#0B1F3A',
    color: '#F7F3EC',
    border: 'none',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#0B1F3A',
    border: '2px solid #0B1F3A',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#F5A623',
    border: '2px solid #F5A623',
  },
  danger: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    border: '1.5px solid #FECACA',
  },
};

const SIZE_STYLES: Record<Size, { padding: string; fontSize: number; height: number }> = {
  sm: { padding: '6px 16px', fontSize: 13, height: 34 },
  md: { padding: '10px 24px', fontSize: 14, height: 42 },
  lg: { padding: '14px 32px', fontSize: 16, height: 52 },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  fullWidth = false,
  disabled,
  style,
  className = '',
  ...props
}: ButtonProps) {
  const sz = SIZE_STYLES[size];

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        ...STYLES[variant],
        borderRadius: 100,
        padding: sz.padding,
        fontSize: sz.fontSize,
        height: sz.height,
        fontFamily: 'Space Grotesk, sans-serif',
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {loading ? (
        <span
          className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: variant === 'primary' ? '#0B1F3A' : '#F5A623', borderTopColor: 'transparent' }}
        />
      ) : children}
    </button>
  );
}
