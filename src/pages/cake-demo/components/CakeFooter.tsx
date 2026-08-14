import { NAV_LINKS } from "../content";

export default function CakeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--cd-border)] bg-[var(--cd-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="cd-font-display text-xl font-semibold text-[var(--cd-cream)]">
              Gateau <span className="text-[var(--cd-gold)]">Studio</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--cd-cream-muted)]">
              Handcrafted cakes, made in small batches with premium
              ingredients — for the moments worth celebrating.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--cd-cream)]">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--cd-cream-muted)] hover:text-[var(--cd-gold-strong)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--cd-cream)]">Follow</h2>
            <ul className="mt-4 flex items-center gap-3">
              <li>
                <a
                  href="#"
                  aria-label="Gateau Studio on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--cd-border-strong)] text-[var(--cd-cream-muted)] hover:border-[var(--cd-gold)] hover:text-[var(--cd-gold-strong)]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Gateau Studio on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--cd-border-strong)] text-[var(--cd-cream-muted)] hover:border-[var(--cd-gold)] hover:text-[var(--cd-gold-strong)]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Gateau Studio on Pinterest"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--cd-border-strong)] text-[var(--cd-cream-muted)] hover:border-[var(--cd-gold)] hover:text-[var(--cd-gold-strong)]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.169-2.911 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.056-4.869-4.992-4.869-3.4 0-5.399 2.549-5.399 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 01.083.343c-.091.378-.293 1.192-.332 1.36-.053.218-.174.265-.402.159-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.003 2.35-1.494 3.146 1.124.347 2.317.535 3.554.535 6.624 0 11.99-5.367 11.99-11.988C23.997 5.367 18.641 0 12.017 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--cd-border)] pt-8 text-xs text-[var(--cd-cream-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Gateau Studio. All rights reserved.</p>
          <p>Portfolio demo by BinaryBuilds.</p>
        </div>
      </div>
    </footer>
  );
}
