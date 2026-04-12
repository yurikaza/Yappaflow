"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const RADIUS = 3;

export function Particles({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) / 2) * i * Math.PI * 2;

      pos[i * 3] = Math.cos(theta) * radiusAtY * RADIUS;
      pos[i * 3 + 1] = y * RADIUS;
      pos[i * 3 + 2] = Math.sin(theta) * radiusAtY * RADIUS;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    // Slow orbit
    pointsRef.current.rotation.y += 0.0008;
    pointsRef.current.rotation.x += 0.0002;

    // Scatter on scroll
    const scatter = 1 + scrollProgress * 3;
    pointsRef.current.scale.setScalar(scatter);

    // Fade on scroll
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = Math.max(0, 0.6 - scrollProgress * 0.8);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}
