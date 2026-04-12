"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingCrystal } from "./FloatingCrystal";
import { Particles } from "./Particles";

interface HeroSceneProps {
  mousePos: React.RefObject<{ x: number; y: number }>;
  scrollProgress?: number;
  className?: string;
}

export function HeroScene({ mousePos, scrollProgress = 0, className }: HeroSceneProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-3, -3, 2]} intensity={0.4} color="#FF6B35" />

          <FloatingCrystal mousePos={mousePos} />
          <Particles scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
