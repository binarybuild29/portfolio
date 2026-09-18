import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import KineticWordmark from "./hero/kinetic-wordmark";
import AmbientGlow from "./hero/ambient-glow";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Full-viewport kinetic hero.
 *
 * Layout: the BINARYBUILDS wordmark, centred both horizontally and
 * vertically in the section, with a scroll cue below it.
 *
 * Motion: the wordmark's letters are pushed around by the cursor
 * (KineticWordmark), a soft light trails behind it (AmbientGlow), and it
 * fades up once on load via a GSAP timeline. Under
 * `prefers-reduced-motion` every one of those is skipped and the hero
 * renders as a static composition.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Entrance: reveal the wordmark first, then the surrounding frame.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const targets = frame.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 18 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      });
    }, frame);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background sm:min-h-[calc(100svh-5rem)]"
    >
      {/* ── Atmosphere ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-grid-lines absolute inset-0" />
        <div className="hero-noise absolute inset-0" />
      </div>
      <AmbientGlow containerRef={sectionRef} interactive={!reduceMotion} />

      {/* ── Frame ──────────────────────────────────────────────────── */}
      <div
        ref={frameRef}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 sm:px-8"
      >
        <div data-reveal className="w-full">
          <KineticWordmark interactive={!reduceMotion} />
        </div>
      </div>

      {/* Scroll cue — centred independently of the bottom row so it stays
          optically centred regardless of the bio/action column widths. */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute inset-x-0 bottom-4 z-10 mx-auto hidden w-fit flex-col items-center gap-1.5 text-muted-soft transition-colors hover:text-accent-strong sm:flex"
      >
        <span className="text-[0.6rem] font-medium tracking-[0.3em] uppercase">
          Scroll
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${reduceMotion ? "" : "animate-bounce"}`}
        >
          <path
            d="M4 7l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
