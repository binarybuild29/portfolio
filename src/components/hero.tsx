import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { gsap } from "gsap";
import { isWebGLAvailable } from "three-stdlib";
import type { Wordmark3DHandle } from "./hero-3d/wordmark-3d";

// The R3F scene pulls in three.js + fiber + drei, a meaningfully large
// chunk — load it only once we know WebGL is actually usable, instead of
// bundling it into the initial page weight for everyone.
const Scene = lazy(() => import("./hero-3d/scene"));

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
 * Permanent 3D hero. A single extruded <Text3D> BINARYBUILDS wordmark
 * renders in a React Three Fiber canvas: solid on load, then a GSAP
 * timeline cross-fades it to a thin outline while the surrounding page
 * content fades in. Cursor position tilts the whole mesh on X/Y for a real
 * parallax read on the extrusion depth (handled inside the R3F scene via
 * useFrame, not here).
 *
 * Falls back to a static 2D outlined wordmark (no WebGL, no JS motion cost)
 * when the browser can't do WebGL or the user has asked for reduced
 * motion — the layout and copy are identical either way, only the
 * rendering technique changes.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordmarkHandleRef = useRef<Wordmark3DHandle>(null);
  const scrollProgress = useRef(0);
  const rafId = useRef<number | null>(null);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Detected once on mount; never changes afterward, so it doesn't need to
  // be reactive to anything but its own initial value.
  const [webglOk] = useState(() => {
    try {
      return isWebGLAvailable();
    } catch {
      return false;
    }
  });

  const use3D = webglOk && !reduceMotion;
  const [sceneReady, setSceneReady] = useState(false);

  // Preloader: solid -> outline morph, then reveal the surrounding DOM
  // content. Runs once per mount. If the 3D path isn't active, content is
  // just faded straight in — no morph to perform.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!use3D) {
      gsap.set(content, { opacity: 0, y: 12 });
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : 0.6,
        ease: "power2.out",
        delay: reduceMotion ? 0 : 0.1,
      });
      return;
    }

    if (!sceneReady) return;

    const handle = wordmarkHandleRef.current;
    gsap.set(content, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        handle?.onPreloaderComplete?.();
      },
    });

    if (handle?.registerPreloader) {
      handle.registerPreloader(tl);
    }

    tl.to(
      content,
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      handle?.registerPreloader ? 0.55 : 0
    );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once the scene mounts, not on every render
  }, [use3D, sceneReady]);

  // Scroll-linked fade for the DOM content (headline copy / CTAs, if any
  // sit in `content`). The canvas itself is left alone — it sits behind
  // everything and is inexpensive to leave rendering.
  useEffect(() => {
    if (reduceMotion) return;

    function readScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const height = section.offsetHeight || 1;
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / height));
    }

    function tick() {
      const content = contentRef.current;
      if (content) {
        const p = scrollProgress.current;
        content.style.opacity = String(1 - p);
      }
      rafId.current = requestAnimationFrame(tick);
    }

    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", readScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background sm:min-h-[calc(100svh-5rem)]"
    >
      {use3D ? (
        <Suspense fallback={null}>
          <Scene
            ref={wordmarkHandleRef}
            interactive={!reduceMotion}
            scrollProgress={scrollProgress}
            onReady={() => setSceneReady(true)}
          />
        </Suspense>
      ) : (
        <StaticWordmark />
      )}

      {/* Ambient wash kept in DOM (not WebGL) so it's present immediately,
          even before the 3D scene chunk has loaded. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_0%,rgba(199,207,250,0.09),transparent_68%)]" />
      </div>

      {/* Reserved for any future copy/CTAs below the wordmark; currently
          empty but kept as the fade target for the preloader + scroll
          reveal so both code paths share one element. */}
      <div ref={contentRef} className="relative z-10 flex-1" aria-hidden="true" />
    </section>
  );
}

/** Fallback for no-WebGL / reduced-motion: the previous flat CSS wordmark. */
function StaticWordmark() {
  return (
    <div className="relative z-10 flex flex-1 items-center justify-center px-4 sm:px-6">
      <h1 className="flex justify-center font-display text-[7.5vw] leading-[0.95] font-extralight tracking-[0.02em] whitespace-nowrap text-foreground select-none sm:text-[7.2vw] sm:tracking-[0.05em]">
        <span className="sr-only">binary builds</span>
        {"BINARYBUILDS".split("").map((letter, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`hero-letter ${i === "BINARYBUILDS".length - 1 ? "!tracking-normal" : ""}`}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
