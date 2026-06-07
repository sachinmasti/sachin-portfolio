"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

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
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.article
              key={skill.name}
              variants={fadeUp}
              whileHover={{ y: -8, borderColor: "rgba(255,255,255,0.1)" }}
              className="premium-border min-h-48 bg-void p-6 transition-colors"
              data-cursor="magnetic"
            >
              <Icon className="mb-8 text-3xl text-plum-voltage" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-bone">{skill.name}</h3>
              <p className="mt-3 text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke">{skill.description}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
