import { useEffect, useMemo, useRef } from "react";

const WORD = "BINARYBUILDS";

/** How far (px) a letter can be pushed by the cursor at closest range. */
const MAX_PUSH = 26;
/** Radius (px) of the cursor's influence. Beyond this a letter is at rest. */
const INFLUENCE = 260;
/** Per-frame easing toward the target — lower is heavier/laggier. */
const EASE = 0.12;

type LetterState = {
  el: HTMLSpanElement;
  /** Element centre in viewport coords, refreshed on resize/scroll. */
  cx: number;
  cy: number;
  /** Current (eased) displacement. */
  x: number;
  y: number;
  s: number;
  /** Target displacement, recomputed from cursor each frame. */
  tx: number;
  ty: number;
  ts: number;
};

type KineticWordmarkProps = {
  /** When false, letters stay at rest (reduced motion / touch). */
  interactive?: boolean;
};

/**
 * The BINARYBUILDS wordmark, split into per-letter spans that are pushed
 * away from the cursor with an eased, distance-weighted displacement.
 *
 * Implementation notes:
 * - One rAF loop drives every letter. Each frame it only writes CSS custom
 *   properties (--kx/--ky/--ks); the transform that consumes them is
 *   declared once in CSS, so nothing here triggers layout.
 * - Letter centres are cached and only re-measured on resize, not per
 *   frame, which keeps getBoundingClientRect out of the hot path.
 * - Two ghost copies sit behind the main text and receive an amplified
 *   version of the same displacement, producing a chromatic-split fringe
 *   on hover without a canvas or shader.
 */
export default function KineticWordmark({
  interactive = true,
}: KineticWordmarkProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const rafId = useRef<number | null>(null);

  const chars = useMemo(() => WORD.split(""), []);

  useEffect(() => {
    if (!interactive) return;
    const stage = stageRef.current;
    if (!stage) return;

    // Collect the main (non-ghost) letter spans and cache their centres.
    const nodes = Array.from(
      stage.querySelectorAll<HTMLSpanElement>("[data-kinetic-letter]")
    );

    const measure = () => {
      lettersRef.current = nodes.map((el) => {
        const r = el.getBoundingClientRect();
        const prev = lettersRef.current.find((p) => p.el === el);
        return {
          el,
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          x: prev?.x ?? 0,
          y: prev?.y ?? 0,
          s: prev?.s ?? 1,
          tx: 0,
          ty: 0,
          ts: 1,
        };
      });
    };
    measure();

    const onPointerMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
    };
    const onPointerLeave = () => {
      pointer.current.active = false;
    };

    const tick = () => {
      const { x: px, y: py, active } = pointer.current;

      for (const L of lettersRef.current) {
        if (active) {
          const dx = L.cx - px;
          const dy = L.cy - py;
          const dist = Math.hypot(dx, dy);

          if (dist < INFLUENCE) {
            // 1 at the cursor, 0 at the edge of influence, eased so the
            // falloff feels soft rather than linear.
            const f = 1 - dist / INFLUENCE;
            const strength = f * f;
            const inv = dist === 0 ? 0 : 1 / dist;
            L.tx = dx * inv * MAX_PUSH * strength;
            L.ty = dy * inv * MAX_PUSH * strength * 0.75;
            L.ts = 1 + strength * 0.12;
          } else {
            L.tx = 0;
            L.ty = 0;
            L.ts = 1;
          }
        } else {
          L.tx = 0;
          L.ty = 0;
          L.ts = 1;
        }

        L.x += (L.tx - L.x) * EASE;
        L.y += (L.ty - L.y) * EASE;
        L.s += (L.ts - L.s) * EASE;

        L.el.style.setProperty("--kx", `${L.x.toFixed(2)}px`);
        L.el.style.setProperty("--ky", `${L.y.toFixed(2)}px`);
        L.el.style.setProperty("--ks", L.s.toFixed(4));
      }

      // Ghost layers ride the average displacement, amplified and mirrored
      // so the two colour channels split in opposite directions.
      const n = lettersRef.current.length || 1;
      let ax = 0;
      let ay = 0;
      for (const L of lettersRef.current) {
        ax += L.x;
        ay += L.y;
      }
      ax /= n;
      ay /= n;

      const g0 = ghostRefs.current[0];
      const g1 = ghostRefs.current[1];
      if (g0) g0.style.transform = `translate3d(${(ax * 1.6).toFixed(2)}px, ${(ay * 1.6).toFixed(2)}px, 0)`;
      if (g1) g1.style.transform = `translate3d(${(-ax * 1.6).toFixed(2)}px, ${(-ay * 1.6).toFixed(2)}px, 0)`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [interactive]);

  // 12 characters need to fit on one line at every width. clamp() keeps a
  // sane floor/ceiling; the vw component is tuned down for narrow
  // viewports (where 12 uppercase glyphs are proportionally much wider
  // relative to the screen) and back up once there's room past sm.
  const wordClass =
    "font-display text-[clamp(2.3rem,10vw,8.2rem)] leading-[0.82] font-extrabold tracking-[-0.01em] whitespace-nowrap select-none sm:text-[clamp(4rem,13.5vw,10.5rem)] sm:tracking-[-0.03em]";

  return (
    <div ref={stageRef} className="kinetic-stage relative">
      {/* Chromatic ghosts — decorative duplicates of the wordmark. */}
      <div
        aria-hidden="true"
        ref={(el) => {
          ghostRefs.current[0] = el;
        }}
        className="kinetic-ghost"
      >
        <span className={`${wordClass} block text-accent-soft`}>{WORD}</span>
      </div>
      <div
        aria-hidden="true"
        ref={(el) => {
          ghostRefs.current[1] = el;
        }}
        className="kinetic-ghost"
      >
        <span className={`${wordClass} block text-accent-strong`}>{WORD}</span>
      </div>

      <h1 className={`${wordClass} relative text-foreground`}>
        <span className="sr-only">BinaryBuilds</span>
        {chars.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            data-kinetic-letter
            className="kinetic-letter"
          >
            {ch}
          </span>
        ))}
      </h1>
    </div>
  );
}
