/**
 * Scene — WebGL canvas + light rig + Wordmark3D.
 *
 * Light rig:
 *   • Ambient  — soft periwinkle fill keeps dark faces readable
 *   • Key      — directional white light makes extrusion + bevels pop
 *   • Rim      — accent-blue rim from behind-left catches letter edges
 *   • Studio   — soft moving PointLight follows cursor slowly,
 *                sweeping the extrusion surface like a studio light
 *
 * The `onReady` callback is now fired by Wordmark3D *after* its cinematic
 * entry animation completes, so hero.tsx only starts the solid→outline
 * preloader morph once the letters have settled into position.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { forwardRef, Suspense, useRef } from "react";
import * as THREE from "three";
import Wordmark3D, { type Wordmark3DHandle } from "./wordmark-3d";

// ─── Types ───────────────────────────────────────────────────────────────────

type SceneProps = {
  interactive?: boolean;
  scrollProgress?: React.MutableRefObject<number>;
  onReady?: () => void;
};

// ─── Studio Light (moves with cursor for surface-reveal sweep) ───────────────

function StudioLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state, delta) => {
    const light = lightRef.current;
    if (!light) return;
    // Slowly follow cursor on X; sits above & in front of text
    const targetX = state.pointer.x * 5;
    light.position.x += (targetX - light.position.x) * Math.min(1, delta * 1.8);
  });
  return (
    <pointLight
      ref={lightRef}
      position={[0, 3.5, 5.5]}
      intensity={18}
      color="#edf0ff"
      distance={16}
      decay={2}
    />
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

const Scene = forwardRef<Wordmark3DHandle, SceneProps>(function Scene(
  { interactive = true, scrollProgress, onReady },
  wordmarkRef
) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9], fov: 33, near: 0.1, far: 60 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#050505"]} />

      {/* Ambient fill — soft periwinkle so unlit faces aren't dead-black */}
      <ambientLight intensity={0.30} color="#a7b3f2" />

      {/* Key light — sharp diagonal reveals extrusion depth & bevels */}
      <directionalLight position={[4, 5, 6]} intensity={1.5} color="#f5f5f5" />

      {/* Rim light — brand-blue from behind-left, catches letter edges */}
      <directionalLight position={[-5, -2, -4]} intensity={0.70} color="#6c78c9" />

      {/* Moving studio light — creates a subtle sweep as cursor moves */}
      <StudioLight />

      {/*
        Inner Suspense boundary: Text3D suspends here (font fetch/parse)
        NOT at the outer lazy-import boundary. onEntryComplete fires after
        the cinematic entry, which is when hero.tsx starts the preloader.
      */}
      <Suspense fallback={null}>
        <Wordmark3D
          ref={wordmarkRef}
          interactive={interactive}
          scrollProgress={scrollProgress}
          onEntryComplete={onReady}
        />
      </Suspense>
    </Canvas>
  );
});

export default Scene;
