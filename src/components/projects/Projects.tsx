"use client";
import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { MouseEvent } from "react";

const borderAccents = [
  "group-hover:border-plum-voltage",
  "group-hover:border-amber-spark",
  "group-hover:border-lichen",
  "group-hover:border-plum-voltage/60",
  "group-hover:border-amber-spark/60",
];

function ProjectCard({ project, index, isLastOdd, isDimmed, onHover }: { project: Project, index: number, isLastOdd: boolean, isDimmed: boolean, onHover: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      className={`group relative flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-void/30 p-4 backdrop-blur-md transition-all duration-500 hover:bg-void/50 ${borderAccents[index % borderAccents.length]} ${
        isLastOdd
          ? "md:col-span-2 md:max-w-[50%] md:mx-auto md:w-full"
          : ""
      } ${isDimmed ? "opacity-60 saturate-50" : "opacity-100 saturate-100"}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(33,241,168, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-3 flex items-start justify-between gap-4">
          <span className="rounded-[24px] bg-plum-voltage px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-void shadow-[0_0_12px_rgba(33,241,168,0.4)]">
            {project.status}
          </span>
          <FiArrowUpRight className="text-xl text-ash transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-plum-voltage" />
        </div>
        <h3 className="text-[16px] font-extralight leading-[1.2] tracking-[-0.02em] text-bone transition-colors duration-300 group-hover:text-plum-voltage">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 max-w-2xl text-[13px] font-regular leading-[1.5] tracking-[0.025em] text-smoke transition-colors duration-300 group-hover:text-bone/80">
          {project.description}
        </p>
        <div className="mt-auto pt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-[24px] border border-white/[0.1] bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-ash transition-colors duration-300 group-hover:border-white/[0.2] group-hover:bg-white/[0.05] group-hover:text-bone"
            >
              {tag}
            </span>
          ))}
        </div>
        {(project.github || project.live) && (
          <div className="mt-4 flex flex-wrap gap-4 border-t border-white/[0.05] pt-4 transition-colors duration-300 group-hover:border-white/[0.1]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-smoke transition-all duration-300 hover:text-plum-voltage hover:opacity-80"
              >
                <FiGithub size={14} />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-smoke transition-all duration-300 hover:text-lichen hover:opacity-80"
              >
                <FiExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="section-shell py-8 sm:py-[60px]">
      <SectionHeading
        eyebrow="Projects"
        title="Selected Work"
        description="Real-world Data Science and Machine Learning projects."
      />
      <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-2" onMouseLeave={() => setHovered(null)}>
        {projects.map((project, i) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            index={i} 
            isLastOdd={projects.length % 2 !== 0 && i === projects.length - 1}
            isDimmed={hovered !== null && hovered !== i}
            onHover={() => setHovered(i)}
          />
        ))}
      </div>
    </section>
  );
}
