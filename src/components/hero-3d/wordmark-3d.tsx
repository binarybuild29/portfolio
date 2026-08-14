/**
 * Wordmark3D — cinematic 3D BINARYBUILDS typography.
 *
 * Architecture
 * ─────────────
 * • Wordmark3D  — outer group: cursor tilt, idle breathing, scroll recession
 * • Letter3D    — per-letter group: cinematic entry (Z-travel + rotation),
 *                 hover Z-push, depth-field parallax, material hover animation
 *
 * Animation sequence
 * ──────────────────
 * 1. Font suspends; Suspense waits.
 * 2. Letters mount at depth (z = −5 … −10) with rotations → GSAP stagger
 *    travels each letter to z = 0 over ~1.4 s (cinematic entry).
 * 3. Entry complete → onEntryComplete fires → hero.tsx starts preloader
 *    timeline: solid fill → thin-line outline morph (registerPreloader).
 * 4. Preloader complete → onPreloaderComplete → hover enabled.
 * 5. Steady state: cursor parallax, depth-field per-letter, idle breathing,
 *    scroll recession, per-letter hover (Z-push + fill reveal + edge dim).
 */

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, useFont } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// ─── Constants ───────────────────────────────────────────────────────────────

export const WORD = "BINARYBUILDS";
const FONT_URL = "/fonts/plus-jakarta-sans-bold.typeface.json";
const MAX_TILT = THREE.MathUtils.degToRad(6);   // outer group tilt limit

// ─── Types ───────────────────────────────────────────────────────────────────

export type Wordmark3DHandle = {
  /** Insert per-letter tweens into an external GSAP timeline. */
  registerPreloader: (tl: gsap.core.Timeline) => void;
  /** Call after preloader completes to unlock hover interactions. */
  onPreloaderComplete: () => void;
};

type Wordmark3DProps = {
  interactive?: boolean;
  scrollProgress?: React.MutableRefObject<number>;
  onEntryComplete?: () => void;
};

type LetterHandle = {
  fillMaterial: THREE.MeshStandardMaterial | null;
  setEntryDone: () => void;
  setPreloaderDone: () => void;
  group: THREE.Group | null;
};

type LetterProps = {
  char: string;
  fontSize: number;
  interactive: boolean;
  letterIndex: number;
  totalLetters: number;
  /** Shared ref — the index of the currently hovered letter (null = none). */
  hoverIndexRef: React.MutableRefObject<number | null>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lerpF(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, t);
}

// ─── Letter3D ────────────────────────────────────────────────────────────────

const Letter3D = forwardRef<LetterHandle, LetterProps>(function Letter3D(
  { char, fontSize, interactive, letterIndex, totalLetters, hoverIndexRef },
  ref
) {
  const groupRef       = useRef<THREE.Group>(null);
  const fillMatRef     = useRef<THREE.MeshStandardMaterial>(null);
  const isHovered      = useRef(false);
  const entryDone      = useRef(false);
  const preloaderDone  = useRef(false);
  const smoothHoverZ   = useRef(0);      // lerped hover/depth-field Z

  const depth = fontSize * 0.13;

  useImperativeHandle(ref, () => ({
    get fillMaterial() { return fillMatRef.current; },
    get group()        { return groupRef.current; },
    setEntryDone()    { entryDone.current = true; },
    setPreloaderDone() { preloaderDone.current = true; },
  }));

  // ── Per-frame: hover Z-push, depth-field parallax, material lerps ─────────
  useFrame((state, delta) => {
    const group   = groupRef.current;
    const fillMat = fillMatRef.current;
    if (!group) return;

    const hIdx        = hoverIndexRef.current;
    const isHov       = hIdx === letterIndex;
    const neighborDist = hIdx !== null ? Math.abs(hIdx - letterIndex) : 99;
    isHovered.current  = isHov;

    // Only animate Z after cinematic entry is finished
    if (entryDone.current) {
      // Depth-field: letters at edges shift slightly more than center letters
      const centerNorm = (letterIndex - (totalLetters - 1) / 2) / ((totalLetters - 1) / 2 || 1);
      const depthField = state.pointer.x * centerNorm * 0.055;

      const hoverZTarget =
        isHov          ? 0.55
        : neighborDist === 1 ? 0.10
        : neighborDist === 2 ? 0.03
        : 0;

      smoothHoverZ.current = lerpF(smoothHoverZ.current, hoverZTarget + depthField, delta * 7);
      group.position.z = smoothHoverZ.current;
    }

    // Material animation — only after preloader completes
    if (preloaderDone.current && fillMat) {
      // Solid fill: slightly dimmer at rest, fades to full white on hover
      const fillTarget =
        isHov          ? 1.0
        : neighborDist === 1 ? 0.90
        : neighborDist === 2 ? 0.87
        : 0.85;

      // Emissive (accent blue glow on hover)
      const emissTarget = isHov ? 0.18 : 0;

      fillMat.opacity = lerpF(fillMat.opacity, fillTarget, delta * 10);
      fillMat.emissiveIntensity = lerpF(fillMat.emissiveIntensity, emissTarget, delta * 10);
    }
  });

  return (
    <group ref={groupRef}>
      <Text3D
        font={FONT_URL}
        size={fontSize}
        height={depth}
        curveSegments={10}
        bevelEnabled
        bevelThickness={depth * 0.07}
        bevelSize={depth * 0.035}
        bevelSegments={4}
        onPointerOver={(e) => {
          if (!interactive || !preloaderDone.current) return;
          e.stopPropagation();
          hoverIndexRef.current = letterIndex;
        }}
        onPointerOut={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          if (hoverIndexRef.current === letterIndex) hoverIndexRef.current = null;
        }}
      >
        {char}
        {/* Solid fill — starts invisible; entry animation fades it in */}
        <meshStandardMaterial
          ref={fillMatRef}
          color="#f0f2f5"
          metalness={0.22}
          roughness={0.28}
          transparent
          opacity={0}
          emissive="#a7b3f2"
          emissiveIntensity={0}
        />
      </Text3D>
    </group>
  );
});

// ─── Wordmark3D ───────────────────────────────────────────────────────────────

const Wordmark3D = forwardRef<Wordmark3DHandle, Wordmark3DProps>(
  function Wordmark3D({ interactive = true, scrollProgress, onEntryComplete }, ref) {
    const outerGroupRef  = useRef<THREE.Group>(null);
    const lettersRef     = useRef<(LetterHandle | null)[]>([]);
    const hoverIndexRef  = useRef<number | null>(null);
    const { viewport }   = useThree();

    const tiltTarget  = useRef({ x: 0, y: 0 });
    const tiltCurrent = useRef({ x: 0, y: 0 });
    const idleClock   = useRef(0);

    // Suspend until font is parsed — this is what Text3D expects as `font` prop.
    const fontData = useFont(FONT_URL) as any;
    const letters  = useMemo(() => WORD.split(""), []);

    // Precise X positions derived from font glyph advance widths
    const { fontSize, positions, totalWidth } = useMemo(() => {
      const data = fontData.data as {
        glyphs: Record<string, { ha: number }>;
        resolution: number;
      };
      let designWidth = 0;
      letters.forEach((ch) => {
        designWidth += (data.glyphs[ch] ?? data.glyphs["?"] ?? { ha: 600 }).ha;
      });
      // Scale so the word spans ~82 % of viewport width
      const size  = (viewport.width * 0.82 * data.resolution) / designWidth;
      const scale = size / data.resolution;
      const pos: number[] = [];
      let cx = 0;
      letters.forEach((ch) => {
        pos.push(cx);
        cx += (data.glyphs[ch] ?? data.glyphs["?"] ?? { ha: 600 }).ha * scale;
      });
      return { fontSize: size, positions: pos, totalWidth: cx };
    }, [viewport.width, fontData, letters]);

    // ── Preloader API (called by hero.tsx after entry completes) ──────────────
    useImperativeHandle(ref, () => ({
      registerPreloader(tl: gsap.core.Timeline) {
        lettersRef.current.forEach((letter, i) => {
          if (!letter) return;
          const at = 0.30 + i * 0.022;   // slight stagger across letters
          tl.to(letter.fillMaterial,  { opacity: 0.85, duration: 0.55, ease: "power2.out" }, at);
        });
      },
      onPreloaderComplete() {
        lettersRef.current.forEach((l) => l?.setPreloaderDone());
      },
    }));

    // ── Cinematic entry animation (runs once after mount + font resolution) ───
    useEffect(() => {
      // Small delay so R3F has committed all letter groups to the scene
      const timer = window.setTimeout(() => {
        const ls = lettersRef.current;

        // 1. Set dramatic initial state for each letter
        ls.forEach((letter, i) => {
          const g = letter?.group;
          if (!g) return;
          // Alternate even/odd Z depths and rotations for visual variety
          const sign = i % 2 === 0 ? 1 : -1;
          g.position.z = -5.5 - (i % 4) * 1.8;
          g.rotation.y = sign * (0.22 + (i % 3) * 0.08);
          g.rotation.x = sign * 0.06;
          // opacity already 0 from JSX initial state
        });

        // 2. Staggered GSAP travel to final position
        const tl = gsap.timeline({
          delay: 0.05,
          onComplete: () => {
            // Mark each letter entry done → unlocks hover Z logic
            ls.forEach((l) => l?.setEntryDone());
            // Signal hero.tsx that preloader can begin
            onEntryComplete?.();
          },
        });

        ls.forEach((letter, i) => {
          const g = letter?.group;
          if (!g || !letter) return;
          const at = i * 0.055;   // stagger offset (seconds)
          // Z travel: deep → 0
          tl.to(g.position,  { z: 0, duration: 1.30, ease: "power3.out" }, at);
          // Rotation settle
          tl.to(g.rotation,  { y: 0, x: 0, duration: 1.10, ease: "power2.out" }, at);
          // Opacity: 0 → 1 (solid fill reveals during travel)
          if (letter.fillMaterial) {
            tl.to(letter.fillMaterial, { opacity: 1, duration: 0.50, ease: "power2.in" }, at);
          }
        });
      }, 60);

      return () => { window.clearTimeout(timer); };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Per-frame: outer group tilt, idle breathing, scroll recession ─────────
    useFrame((state, delta) => {
      const outer = outerGroupRef.current;
      if (!outer) return;

      idleClock.current += delta;

      // Cursor-driven tilt
      if (interactive) {
        tiltTarget.current.y =  state.pointer.x * MAX_TILT;
        tiltTarget.current.x = -state.pointer.y * MAX_TILT * 0.45;
      }
      tiltCurrent.current.x = lerpF(tiltCurrent.current.x, tiltTarget.current.x, delta * 3.5);
      tiltCurrent.current.y = lerpF(tiltCurrent.current.y, tiltTarget.current.y, delta * 3.5);
      outer.rotation.x = tiltCurrent.current.x;
      outer.rotation.y = tiltCurrent.current.y;

      // Idle breathing — slow sinusoidal Y drift
      outer.position.y = Math.sin(idleClock.current * 0.36) * 0.016;

      // Scroll recession — typography recedes into depth + shrinks gently
      const scroll = scrollProgress?.current ?? 0;
      outer.position.z  = -scroll * 2.8;
      outer.scale.setScalar(1 - scroll * 0.10);
    });

    return (
      <group ref={outerGroupRef}>
        {/* Center the word: shift left by half total advance width */}
        <group position={[-totalWidth / 2, -0.35 * fontSize, 0]}>
          {letters.map((char, index) => (
            /* Fixed X via stable parent group; Letter3D controls Z + rotation */
            <group key={`${char}-${index}`} position={[positions[index], 0, 0]}>
              <Letter3D
                char={char}
                fontSize={fontSize}
                interactive={interactive}
                letterIndex={index}
                totalLetters={letters.length}
                hoverIndexRef={hoverIndexRef}
                ref={(el) => { lettersRef.current[index] = el; }}
              />
            </group>
          ))}
        </group>
      </group>
    );
  }
);

export default Wordmark3D;
