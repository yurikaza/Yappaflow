"use client";

import { useRef, useEffect, useCallback } from "react";

const PARTICLE_COUNT = 120;
const RESOLUTION = 0.5;

interface Particle {
  angle: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  size: number;
  opacity: number;
  color: string;
  offsetPhase: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function ParticleRing({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.4 });
  const centerRef = useRef({ x: 0.5, y: 0.4 });
  const particlesRef = useRef<Particle[]>([]);
  const W = useRef(0);
  const H = useRef(0);
  const reducedMotion = useRef(false);

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const layer = Math.random();
      particles.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0012,
        radiusX: 0.25 + layer * 0.18,
        radiusY: 0.15 + layer * 0.12,
        size: 0.5 + Math.random() * 2.5,
        opacity: 0.15 + Math.random() * 0.65,
        color: Math.random() > 0.3 ? "255,107,53" : "255,255,255",
        offsetPhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initParticles();

    const init = () => {
      const pw = Math.max(1, Math.floor(canvas.offsetWidth * RESOLUTION));
      const ph = Math.max(1, Math.floor(canvas.offsetHeight * RESOLUTION));
      if (pw === W.current && ph === H.current) return;
      canvas.width = pw;
      canvas.height = ph;
      W.current = pw;
      H.current = ph;
    };
    init();

    let time = 0;

    const tick = () => {
      if (!ctx || reducedMotion.current) {
        // Static gradient fallback
        const w = W.current;
        const h = H.current;
        if (w > 0 && h > 0) {
          const grad = ctx!.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.4);
          grad.addColorStop(0, "rgba(255, 107, 53, 0.12)");
          grad.addColorStop(1, "transparent");
          ctx!.fillStyle = "#0A0A0F";
          ctx!.fillRect(0, 0, w, h);
          ctx!.fillStyle = grad;
          ctx!.fillRect(0, 0, w, h);
        }
        return;
      }

      const w = W.current;
      const h = H.current;
      time++;

      // Lerp center toward mouse
      centerRef.current.x = lerp(centerRef.current.x, mouseRef.current.x, 0.03);
      centerRef.current.y = lerp(centerRef.current.y, mouseRef.current.y, 0.03);

      const cx = centerRef.current.x * w;
      const cy = centerRef.current.y * h;

      // Clear with fade trail
      ctx.fillStyle = "rgba(10, 10, 15, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Ambient glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
      glow.addColorStop(0, "rgba(255, 107, 53, 0.06)");
      glow.addColorStop(0.5, "rgba(255, 107, 53, 0.02)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Draw particles
      for (const p of particlesRef.current) {
        p.angle += p.speed;

        const pulseOp = 0.5 + 0.5 * Math.sin(time * 0.01 + p.offsetPhase);
        const rx = p.radiusX * w;
        const ry = p.radiusY * h;
        const x = cx + Math.cos(p.angle) * rx;
        const y = cy + Math.sin(p.angle) * ry;

        const alpha = p.opacity * (0.5 + pulseOp * 0.5);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.fill();

        // Faint trail
        const tx = cx + Math.cos(p.angle - p.speed * 8) * rx;
        const ty = cy + Math.sin(p.angle - p.speed * 8) * ry;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = `rgba(${p.color}, ${alpha * 0.3})`;
        ctx.lineWidth = p.size * 0.5;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("mousemove", onMove);

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
