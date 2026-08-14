
import { Link } from "react-router-dom";
import LogoMark from "@/components/logo-mark";
import { NAV_LINKS } from "@/lib/content";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-sm"
              aria-label="binary builds — home"
            >
              <LogoMark className="h-7 w-7" />
              <span className="font-sans text-lg font-medium tracking-tight">
                <span className="text-foreground">binary</span>{" "}
                <span className="bg-gradient-to-r from-accent-strong to-accent-soft bg-clip-text text-transparent">
                  builds
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              We build digital experiences — modern websites and online
              stores for businesses that want a professional presence
              online.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-foreground">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-foreground">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href="mailto:binarybuilds29@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  binarybuilds29@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pragya_singh226/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} binary builds. All rights reserved.</p>
          <p>Designed &amp; built by binary builds.</p>
        </div>
      </div>
    </footer>
  );
}
