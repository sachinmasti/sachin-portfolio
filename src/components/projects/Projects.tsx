"use client";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

const borderAccents = [
  "hover:border-plum-voltage",
  "hover:border-amber-spark",
  "hover:border-lichen",
  "hover:border-plum-voltage/60",
  "hover:border-amber-spark/60",
];

export function Projects() {
  return (
    <section id="projects" className="section-shell py-8 sm:py-[60px]">
      <SectionHeading
        eyebrow="Projects"
        title="Selected Work"
        description="Real-world Data Science and Machine Learning projects."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={`premium-border flex flex-col p-4 transition-all duration-500 ${borderAccents[i % borderAccents.length]} ${
              projects.length % 2 !== 0 && i === projects.length - 1
                ? "lg:col-span-2 lg:max-w-[50%] lg:mx-auto"
                : ""
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <span className="rounded-[24px] bg-plum-voltage px-3 py-1 text-caption font-semibold uppercase tracking-[0.05em] text-void">
                {project.status}
              </span>
              <FiArrowUpRight className="text-xl text-ash" />
            </div>
            <h3 className="text-lg font-extralight leading-[1.2] tracking-[-0.02em] text-bone">
              {project.title}
            </h3>
            <p className="mt-2 max-w-2xl text-body-sm font-regular leading-[1.5] tracking-[0.025em] text-smoke">
              {project.description}
            </p>
            <div className="mt-auto pt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[24px] border border-white/[0.1] px-2 py-0.5 text-caption font-semibold uppercase tracking-[0.05em] text-ash"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.github || project.live) && (
              <div className="mt-3 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-caption font-semibold uppercase tracking-[0.05em] text-smoke transition-colors hover:text-plum-voltage"
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
                    className="flex items-center gap-1.5 text-caption font-semibold uppercase tracking-[0.05em] text-smoke transition-colors hover:text-lichen"
                  >
                    <FiExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
