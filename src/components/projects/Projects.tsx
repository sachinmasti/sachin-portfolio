"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-shell py-[60px]">
      <SectionHeading
        eyebrow="Projects"
        title="Projects In Progress"
        description="Real-world Data Science and Machine Learning projects will be added soon."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="premium-border bg-void p-6"
          >
            <div className="mb-10 flex items-start justify-between gap-5">
              <span className="rounded-[24px] bg-plum-voltage px-4 py-2 text-xs font-semibold uppercase tracking-[0.05em] text-bone">
                {project.status}
              </span>
              <FiArrowUpRight className="text-2xl text-ash" />
            </div>
            <h3 className="text-2xl font-extralight leading-[0.9] tracking-[-0.04em] text-bone">{project.title}</h3>
            <p className="mt-4 max-w-2xl text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-[24px] border border-white/[0.1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.05em] text-ash">
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
