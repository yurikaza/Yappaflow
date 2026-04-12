"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface FloatingCrystalProps {
  mousePos: React.RefObject<{ x: number; y: number }>;
}

export function FloatingCrystal({ mousePos }: FloatingCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Auto-rotate
    meshRef.current.rotation.y += 0.003;

    // Sin bob
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;

    // Mouse-chase tilt
    const mouse = mousePos.current;
    if (mouse) {
      meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, mouse.y * 0.3, 0.05);
      meshRef.current.rotation.z = lerp(meshRef.current.rotation.z, -mouse.x * 0.2, 0.05);
    }

    // Halo follows
    if (haloRef.current) {
      haloRef.current.rotation.copy(meshRef.current.rotation);
      haloRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <group>
      {/* Orange halo behind */}
      <mesh ref={haloRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.04}
          wireframe
        />
      </mesh>

      {/* Main crystal */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#FF6B35"
          emissiveIntensity={0.3}
          wireframe
          distort={0.25}
          speed={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
