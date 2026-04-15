"use client";

import { useRef, useEffect } from "react";

interface FaultyTerminalProps {
  className?: string;
  color?: string;
  scanlineOpacity?: number;
  glitchIntensity?: number;
}

export function FaultyTerminal({
  className,
  color = "#FF6B35",
  scanlineOpacity = 0.08,
  glitchIntensity = 0.3,
}: FaultyTerminalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Parse color
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const chars = "01アイウエオカキクケコサシスセソタチツテト>_</>{}[];:.";
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };
    init();

    let frame = 0;

    const tick = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Fade trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);

      // Random glitch bar
      if (Math.random() < glitchIntensity * 0.02) {
        const gy = Math.random() * h;
        const gh = 2 + Math.random() * 8;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.03 + Math.random() * 0.05})`;
        ctx.fillRect(0, gy, w, gh);
      }

      // Matrix rain characters
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Dim orange characters
        const brightness = 0.05 + Math.random() * 0.12;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;
        ctx.fillText(char, x, y);

        // Occasional bright character
        if (Math.random() < 0.005) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
          ctx.fillText(char, x, y);
        }

        if (y > h && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.3 + Math.random() * 0.3;
      }

      // Scanlines
      if (scanlineOpacity > 0) {
        for (let sy = 0; sy < h; sy += 3) {
          ctx.fillStyle = `rgba(0, 0, 0, ${scanlineOpacity})`;
          ctx.fillRect(0, sy, w, 1);
        }
      }

      // Occasional horizontal glitch slice
      if (Math.random() < glitchIntensity * 0.01) {
        const sliceY = Math.random() * h;
        const sliceH = 1 + Math.random() * 3;
        const shift = (Math.random() - 0.5) * 20;
        const imgData = ctx.getImageData(0, sliceY, w, sliceH);
        ctx.putImageData(imgData, shift, sliceY);
      }

      // Flicker
      if (Math.random() < 0.03) {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.01 + Math.random() * 0.02})`;
        ctx.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [color, scanlineOpacity, glitchIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
