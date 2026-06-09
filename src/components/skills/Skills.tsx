"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

const borderColors = [
  "hover:border-plum-voltage",
  "hover:border-amber-spark",
  "hover:border-lichen",
  "hover:border-plum-voltage/60",
  "hover:border-amber-spark/60",
  "hover:border-lichen/60",
  "hover:border-plum-voltage/40",
  "hover:border-amber-spark/40"
];

const iconColors = [
  "text-plum-voltage",
  "text-amber-spark",
  "text-lichen",
  "text-plum-voltage",
  "text-amber-spark",
  "text-lichen",
  "text-plum-voltage",
  "text-amber-spark"
];

export function Skills() {
  return (
    <section id="skills" className="section-shell py-[60px]">
      <SectionHeading
        eyebrow="Skills"
        title="Technical foundations for data-driven products."
        description="A growing toolkit across analysis, statistics, machine learning, and communication."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.article
              key={skill.name}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-void/50 p-6 backdrop-blur-[2px] transition-all duration-500 ${borderColors[i]} hover:bg-white/[0.04]`}
              data-cursor="magnetic"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-[12px] ${iconColors[i]} bg-white/[0.04]`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
              </div>
              <h3 className="mb-2 text-body-sm font-semibold tracking-[0.021em] text-bone">
                {skill.name}
              </h3>
              <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">
                {skill.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
