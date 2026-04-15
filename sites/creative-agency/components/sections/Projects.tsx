"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  span: "large" | "small";
}

const projects: Project[] = [
  { title: "Meridian Studio", category: "Brand Identity", span: "large" },
  { title: "Nocturn App", category: "Product Design", span: "small" },
  { title: "Paysage Hotel", category: "Web Experience", span: "small" },
  { title: "Atelier Collective", category: "Digital Campaign", span: "large" },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <RevealOnScroll delay={index * 0.1} className="group cursor-pointer">
      {/* Image placeholder */}
      <div className="relative overflow-hidden bg-[var(--color-surface)] rounded-sm">
        <div
          className="w-full transition-transform duration-700"
          style={{
            aspectRatio: project.span === "large" ? "16/10" : "4/3",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Placeholder gradient to simulate a project image */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-alt)] group-hover:scale-105 transition-transform duration-700"
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[var(--color-text)] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-heading text-[var(--text-h3)] font-semibold">
          {project.title}
        </h3>
        <span className="text-label">{project.category}</span>
      </div>
    </RevealOnScroll>
  );
}

export function Projects() {
  return (
    <section id="work" className="section-padding px-[var(--grid-margin)]">
      {/* Section label */}
      <RevealOnScroll>
        <p className="text-label mb-16">Selected Work</p>
      </RevealOnScroll>

      {/* Asymmetric project grid */}
      <div className="space-y-[var(--grid-gutter)]">
        {/* Row 1: 7col + 5col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--grid-gutter)]">
          <div className="lg:col-span-7">
            <ProjectCard project={projects[0]} index={0} />
          </div>
          <div className="lg:col-span-5">
            <ProjectCard project={projects[1]} index={1} />
          </div>
        </div>

        {/* Row 2: 5col + 7col (reversed asymmetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--grid-gutter)]">
          <div className="lg:col-span-5">
            <ProjectCard project={projects[2]} index={2} />
          </div>
          <div className="lg:col-span-7">
            <ProjectCard project={projects[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
