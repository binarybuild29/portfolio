import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Attaches a subtle fade/rise entrance animation to an element once it
 * scrolls into view. Elements should start with the `cd-reveal` class
 * (opacity: 0, translateY(24px)) so there's no flash of full-opacity
 * content before the observer fires.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay,
              ease: "power2.out",
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
