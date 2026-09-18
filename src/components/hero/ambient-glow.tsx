import { useEffect, useRef } from "react";

type AmbientGlowProps = {
  /** Element the glow is positioned relative to. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** When false the glow parks in the centre and stops tracking. */
  interactive?: boolean;
};

/** Easing toward the cursor — deliberately slow so the light lingers. */
const EASE = 0.055;

/**
 * A soft radial light that trails the cursor across the hero. Position is
 * eased in a rAF loop and written as a `translate3d`, so the blurred layer
 * is only ever composited, never re-laid-out or re-painted.
 */
export default function AmbientGlow({
  containerRef,
  interactive = true,
}: AmbientGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const hasTarget = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    // Park in the middle until the cursor first enters.
    const centre = () => {
      const r = container.getBoundingClientRect();
      const c = { x: r.width / 2, y: r.height * 0.42 };
      target.current = { ...c };
      if (!hasTarget.current) current.current = { ...c };
    };
    centre();

    if (!interactive) {
      glow.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      return;
    }

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      hasTarget.current = true;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * EASE;
      current.current.y += (target.current.y - current.current.y) * EASE;
      glow.style.transform = `translate3d(${current.current.x.toFixed(1)}px, ${current.current.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(tick);
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", centre);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", centre);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, interactive]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 h-[42vw] w-[42vw] max-h-[620px] max-w-[620px] rounded-full opacity-70 blur-[110px] will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(167,179,242,0.34) 0%, rgba(108,120,201,0.16) 42%, transparent 70%)",
      }}
    />
  );
}
