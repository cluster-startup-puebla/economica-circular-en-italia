interface LogoProps {
  className?: string;
  title: string;
  subtitle: string;
}

export function Logo({ className = "", title, subtitle }: LogoProps) {
  return (
    <span className={`inline-flex h-full items-center gap-2.5 text-ink ${className}`}>
      <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-brand" />
        <path
          d="M16 7c.4 3.2 1.6 5.4 3.6 7.2C21.6 16 23 18 23 20.4 23 24 19.8 26.5 16 26.5S9 24 9 20.4C9 17.2 11.2 14.6 16 7Z"
          fill="white"
        />
      </svg>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-sm font-semibold tracking-tight">{title}</span>
        <span className="block truncate text-[0.7rem] text-ink-secondary">{subtitle}</span>
      </span>
    </span>
  );
}
