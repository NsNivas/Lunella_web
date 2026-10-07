interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const color = variant === 'dark' ? 'var(--color-plum)' : '#fff';
  const subColor = variant === 'dark' ? 'var(--color-deep-mauve)' : 'rgba(255,255,255,0.7)';
  return (
    <div className={`flex flex-col items-center leading-none ${className}`}>
      <div className="flex items-center gap-1.5" style={{ color }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2C12 2 8 6 8 11C8 14.3 9.8 17 12 17C14.2 17 16 14.3 16 11C16 6 12 2 12 2Z" fill="currentColor" opacity="0.85"/>
          <path d="M5 14C5 14 3 17 3 20C3 21.5 4 22 5.5 22C7 22 8 20.5 8 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M19 14C19 14 21 17 21 20C21 21.5 20 22 18.5 22C17 22 16 20.5 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="font-display text-2xl font-bold tracking-[0.15em]">LUNELLE</span>
      </div>
      <span className="text-[0.6rem] tracking-[0.3em] uppercase mt-0.5 font-medium" style={{ color: subColor }}>
        Style · Cosmetics · You
      </span>
    </div>
  );
}
