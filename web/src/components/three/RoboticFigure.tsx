"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function RoboticFigure({ gesture = 0 }: { gesture?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle idle bob
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;

    // Head looks around subtly
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      headRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }

    // Arms gesture based on scroll progress
    if (armRRef.current) {
      armRRef.current.rotation.z = lerp(
        armRRef.current.rotation.z,
        -0.3 - gesture * 0.8,
        0.05
      );
      armRRef.current.rotation.x = Math.sin(t * 0.6) * 0.05;
    }
    if (armLRef.current) {
      armLRef.current.rotation.z = lerp(
        armLRef.current.rotation.z,
        0.3 + gesture * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.9}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <MeshDistortMaterial
          color="#222222"
          emissive="#FF6B35"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.2}
          distort={0.05}
          speed={2}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.65, 0.3]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#FF6B35" />
      </mesh>
      <mesh position={[0.1, 1.65, 0.3]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#FF6B35" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Torso */}
      <mesh ref={bodyRef} position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Chest light */}
      <mesh position={[0, 0.85, 0.28]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color="#FF6B35" />
      </mesh>

      {/* Right arm */}
      <group position={[0.45, 1.0, 0]}>
        <mesh ref={armRRef} position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.07, 0.5, 6, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Left arm */}
      <group position={[-0.45, 1.0, 0]}>
        <mesh ref={armLRef} position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.07, 0.5, 6, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[0.15, -0.1, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 6, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-0.15, -0.1, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 6, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Base glow ring */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.5, 32]} />
        <meshBasicMaterial color="#FF6B35" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}
