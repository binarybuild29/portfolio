import { useEffect, useState } from "react";
import { NAV_LINKS } from "../content";

export default function CakeNavbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--cd-border)] bg-[var(--cd-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Brand */}
        <a
          href="#home"
          className="cd-font-display shrink-0 text-xl font-semibold tracking-tight text-[var(--cd-cream)] sm:text-2xl"
        >
          Gateau <span className="text-[var(--cd-gold)]">Studio</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-md px-3.5 py-2 text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-[var(--cd-gold-strong)]"
                        : "text-[var(--cd-cream-muted)] hover:text-[var(--cd-cream)]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right icons + CTA */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--cd-cream-muted)] transition-colors hover:text-[var(--cd-gold-strong)] sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--cd-cream-muted)] transition-colors hover:text-[var(--cd-gold-strong)] sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M12 20s-7-4.35-9.5-8.8C.8 7.9 2.3 4.5 5.7 4.1c1.9-.2 3.6.8 4.3 2.4C10.7 4.9 12.4 3.9 14.3 4.1c3.4.4 4.9 3.8 3.2 7.1C19.9 15.5 12 20 12 20z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Cart, 0 items"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-[var(--cd-cream-muted)] transition-colors hover:text-[var(--cd-gold-strong)] sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M4 6h2l1.6 9.6a2 2 0 002 1.7h6.6a2 2 0 002-1.6L20 8H7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1.3" fill="currentColor" />
              <circle cx="17" cy="20" r="1.3" fill="currentColor" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--cd-gold)] text-[10px] font-semibold text-[var(--cd-gold-contrast)]">
              0
            </span>
          </button>

          <a href="#contact" className="cd-btn cd-btn-solid hidden sm:inline-flex">
            Order Custom Cake
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="cd-mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--cd-cream)] lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <nav
        id="cd-mobile-nav"
        aria-label="Primary"
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-[var(--cd-border)] bg-[var(--cd-bg)]`}
      >
        <ul className="flex flex-col px-5 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-[var(--cd-cream-muted)] hover:text-[var(--cd-cream)]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-3">
            <a href="#contact" onClick={() => setOpen(false)} className="cd-btn cd-btn-solid w-full">
              Order Custom Cake
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
