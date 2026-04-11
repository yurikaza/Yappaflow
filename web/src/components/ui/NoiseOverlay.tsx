import { cn } from "@/lib/cn";

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

const NOISE_SVG = `data:image/svg+xml;base64,${typeof btoa !== "undefined" ? "" : ""}PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=`;

export function NoiseOverlay({ opacity = 0.03, className }: NoiseOverlayProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none z-[1]", className)}
      style={{
        opacity,
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
