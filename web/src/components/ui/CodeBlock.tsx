import { cn } from "@/lib/cn";

interface CodeBlockProps {
  code: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, title, className }: CodeBlockProps) {
  return (
    <div className={cn("rounded-xl bg-[#1A1A1A] overflow-hidden shadow-xl", className)}>
      {title && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-xs text-white/30 ml-2 uppercase tracking-wider">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-white/70">{code}</code>
      </pre>
    </div>
  );
}
