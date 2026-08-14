import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoMark from "@/components/logo-mark";
import { NAV_LINKS } from "@/lib/content";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Track which section is currently in view so the nav can highlight it.
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-sm"
          aria-label="binary builds — home"
        >
          <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="font-sans text-lg font-medium tracking-tight sm:text-xl">
            <span className="text-foreground">binary</span>{" "}
            <span className="bg-gradient-to-r from-accent-strong to-accent-soft bg-clip-text text-transparent">
              builds
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-accent-strong to-accent-soft"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>



        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-border bg-background`}
      >
        <ul className="flex flex-col px-5 py-3">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-3 text-base font-medium ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
