"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="Projects"
        title="Projects In Progress"
        description="Real-world Data Science and Machine Learning projects will be added soon."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="premium-border bg-white/[0.025] p-7"
          >
            <div className="mb-10 flex items-start justify-between gap-5">
              <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {project.status}
              </span>
              <FiArrowUpRight className="text-2xl text-white/70" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-white/10 px-3 py-1 text-xs text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
