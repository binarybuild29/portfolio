type LogoMarkProps = {
  className?: string;
};

/**
 * Compact "bD" ribbon icon distilled from the binary builds logo, rebuilt as
 * inline SVG so it stays crisp at small nav/footer sizes. Gradient stops
 * match the original dark logo tile (light periwinkle/lavender on navy).
 */
export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="bb-logo-gradient" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfe3fb" />
          <stop offset="55%" stopColor="#a7b3f2" />
          <stop offset="100%" stopColor="#6c78c9" />
        </linearGradient>
      </defs>
      <path
        d="M17 6v25.5c0 2.2-1.8 4-4 4s-4-1.8-4-4V22"
        fill="none"
        stroke="url(#bb-logo-gradient)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M22 16.5 32.5 27 22 37.5"
        fill="none"
        stroke="url(#bb-logo-gradient)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 16.5h9c3 0 5.5 2.5 5.5 5.5v10.5c0 2.8-2.2 5-5 5h-9.5"
        fill="none"
        stroke="url(#bb-logo-gradient)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
