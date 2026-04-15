"use client";

import { useRef, useEffect } from "react";

const PARTICLE_COUNT = 1800;
const GLOBE_RADIUS = 280;
const ROTATION_SPEED = 0.002;
const RESOLUTION = 1;

interface Point3D {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
}

function fibonacciSphere(count: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    points.push({
      x: Math.cos(theta) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * radius,
      size: 0.5 + Math.random() * 1.5,
      brightness: 0.3 + Math.random() * 0.7,
    });
  }
  return points;
}

export function ParticleGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);
  const pointsRef = useRef<Point3D[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    pointsRef.current = fibonacciSphere(PARTICLE_COUNT, GLOBE_RADIUS);

    const init = () => {
      const pw = Math.floor(canvas.offsetWidth * RESOLUTION);
      const ph = Math.floor(canvas.offsetHeight * RESOLUTION);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
    };
    init();

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      angleRef.current += ROTATION_SPEED;
      const angle = angleRef.current;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Globe center
      const cx = w / 2;
      const cy = h * 0.42;

      // Ambient glow behind globe
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, GLOBE_RADIUS * 1.5);
      glow.addColorStop(0, "rgba(255, 107, 53, 0.08)");
      glow.addColorStop(0.4, "rgba(255, 107, 53, 0.03)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Sort by z for depth
      const projected = pointsRef.current.map((p) => {
        const rx = p.x * cosA - p.z * sinA;
        const rz = p.x * sinA + p.z * cosA;
        const scale = 600 / (600 + rz);
        return {
          px: cx + rx * scale,
          py: cy + p.y * scale * 0.85,
          z: rz,
          size: p.size * scale,
          brightness: p.brightness,
          scale,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        const depth = (p.z + GLOBE_RADIUS) / (GLOBE_RADIUS * 2);
        const alpha = depth * p.brightness * 0.9;

        // Orange-tinted particles with depth
        const r = Math.round(255 - depth * 60);
        const g = Math.round(107 + depth * 80);
        const b = Math.round(53 + depth * 120);

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Bright glow for front-facing particles
        if (depth > 0.6 && p.brightness > 0.6) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      // Horizontal ring glow (equator line)
      const ringGlow = ctx.createRadialGradient(cx, cy, GLOBE_RADIUS * 0.8, cx, cy, GLOBE_RADIUS * 1.3);
      ringGlow.addColorStop(0, "transparent");
      ringGlow.addColorStop(0.5, "rgba(255, 107, 53, 0.02)");
      ringGlow.addColorStop(1, "transparent");
      ctx.fillStyle = ringGlow;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
