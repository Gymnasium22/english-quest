export function Mark({ tone, accent }: { tone: string; accent: string }) {
  const ink = "#1c1915";
  if (tone === "blue") {
    return (
      <svg viewBox="0 0 140 88" className="h-20 w-32" aria-hidden>
        <ellipse cx="70" cy="46" rx="62" ry="34" fill={accent} opacity="0.16" />
        <rect x="8" y="14" width="70" height="42" rx="16" fill={accent} />
        <path d="M28 56 l-8 14 18-8z" fill={accent} />
        <rect x="48" y="30" width="82" height="40" rx="16" fill={ink} />
        <path d="M108 70 l10 12-22-6z" fill={ink} />
        <circle cx="28" cy="34" r="3" fill="#f7f1e8" />
        <circle cx="70" cy="50" r="3" fill="#f7f1e8" />
        <circle cx="86" cy="50" r="3" fill="#f7f1e8" />
      </svg>
    );
  }
  if (tone === "plum") {
    return (
      <svg viewBox="0 0 140 88" className="h-20 w-32" aria-hidden>
        <ellipse cx="70" cy="46" rx="62" ry="34" fill={accent} opacity="0.16" />
        <circle cx="46" cy="44" r="22" fill="none" stroke={accent} strokeWidth="8" />
        <circle cx="86" cy="44" r="22" fill="none" stroke={ink} strokeWidth="8" />
        <path d="M62 44h16" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <circle cx="70" cy="44" r="5" fill={accent} />
      </svg>
    );
  }
  if (tone === "green") {
    return (
      <svg viewBox="0 0 140 88" className="h-20 w-32" aria-hidden>
        <ellipse cx="70" cy="46" rx="62" ry="34" fill={accent} opacity="0.16" />
        <path d="M24 62h36M78 28h40M70 16v56" stroke={accent} strokeWidth="7" strokeLinecap="round" />
        <path d="M24 62l10-10M60 62l-10-10M78 28l12 12M118 28l-12 12" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="62" r="6" fill={accent} />
        <circle cx="118" cy="28" r="6" fill={ink} />
      </svg>
    );
  }
  if (tone === "burgundy") {
    return (
      <svg viewBox="0 0 140 88" className="h-20 w-32" aria-hidden>
        <ellipse cx="70" cy="46" rx="62" ry="34" fill={accent} opacity="0.16" />
        <rect x="12" y="30" width="34" height="28" rx="8" fill={accent} />
        <rect x="52" y="18" width="28" height="50" rx="8" fill={ink} />
        <rect x="86" y="36" width="40" height="22" rx="8" fill={accent} opacity="0.85" />
        <path d="M46 44h6M80 44h6" stroke="#f7f1e8" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 140 88" className="h-20 w-32" aria-hidden>
      <ellipse cx="70" cy="46" rx="62" ry="34" fill={accent} opacity="0.16" />
      <rect x="18" y="16" width="40" height="56" rx="8" fill={accent} transform="rotate(-8 38 44)" />
      <rect x="46" y="12" width="42" height="58" rx="8" fill={ink} />
      <path d="M56 28h22M56 40h18M56 52h14" stroke="#f7f1e8" strokeWidth="3" strokeLinecap="round" />
      <rect x="78" y="22" width="40" height="50" rx="8" fill={accent} opacity="0.78" transform="rotate(6 98 47)" />
    </svg>
  );
}

export function HintIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M12 3a6 6 0 0 0-3 11.2V16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.8A6 6 0 0 0 12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 20h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
