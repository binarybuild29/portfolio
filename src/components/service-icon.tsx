type ServiceIconProps = {
  slug: string;
  className?: string;
};

/**
 * Small illustrated icon tiles for each of the 4 services — a lighter,
 * friendlier alternative to plain numerals. Colors tuned for dark navy
 * surfaces (deep indigo fills, light periwinkle strokes/accents).
 */
export default function ServiceIcon({ slug, className }: ServiceIconProps) {
  const common = {
    viewBox: "0 0 40 40",
    className,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (slug) {
    case "websites":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="32" height="24" rx="5" fill="#161616" stroke="#383838" strokeWidth="1.5" />
          <rect x="4" y="8" width="32" height="7" rx="5" fill="#1a1a1a" />
          <circle cx="10" cy="11.5" r="1.4" fill="#6c78c9" />
          <circle cx="15" cy="11.5" r="1.4" fill="#6c78c9" />
          <rect x="10" y="20" width="20" height="3" rx="1.5" fill="#a7b3f2" />
          <rect x="10" y="26" width="13" height="3" rx="1.5" fill="#383838" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg {...common}>
          <circle cx="16" cy="32" r="2.4" fill="#a7b3f2" />
          <circle cx="28" cy="32" r="2.4" fill="#a7b3f2" />
          <path
            d="M6 8h4l3.2 17.5a2 2 0 0 0 2 1.7h13.4a2 2 0 0 0 1.96-1.62L33 14H12"
            fill="none"
            stroke="#a7b3f2"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "redesign":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="18" height="14" rx="3" fill="#1a1a1a" opacity="0.8" />
          <rect x="16" y="17" width="19" height="14" rx="3" fill="#161616" stroke="#6c78c9" strokeWidth="1.5" />
          <path
            d="M20 24h9M29 21l3 3-3 3"
            fill="none"
            stroke="#a7b3f2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "maintenance":
    default:
      return (
        <svg {...common}>
          <path
            d="M20 6v4M20 30v4M34 20h-4M10 20H6M29.3 10.7l-2.8 2.8M13.5 26.5l-2.8 2.8M29.3 29.3l-2.8-2.8M13.5 13.5l-2.8-2.8"
            stroke="#6c78c9"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="7" fill="#161616" stroke="#a7b3f2" strokeWidth="2" />
        </svg>
      );
  }
}
