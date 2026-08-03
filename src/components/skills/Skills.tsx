"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";
import type { Skill } from "@/types";

const borderColors = [
  "group-hover:border-plum-voltage",
  "group-hover:border-amber-spark",
  "group-hover:border-lichen",
  "group-hover:border-plum-voltage/60",
  "group-hover:border-amber-spark/60",
  "group-hover:border-lichen/60",
  "group-hover:border-plum-voltage/40",
  "group-hover:border-amber-spark/40",
];

const iconColors = [
  "text-plum-voltage bg-plum-voltage/10 group-hover:bg-plum-voltage/20",
  "text-amber-spark bg-amber-spark/10 group-hover:bg-amber-spark/20",
  "text-lichen bg-lichen/10 group-hover:bg-lichen/20",
  "text-plum-voltage bg-plum-voltage/10 group-hover:bg-plum-voltage/20",
  "text-amber-spark bg-amber-spark/10 group-hover:bg-amber-spark/20",
  "text-lichen bg-lichen/10 group-hover:bg-lichen/20",
  "text-plum-voltage bg-plum-voltage/10 group-hover:bg-plum-voltage/20",
  "text-amber-spark bg-amber-spark/10 group-hover:bg-amber-spark/20",
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = skill.icon;

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-void/30 p-6 backdrop-blur-md transition-all duration-500 hover:bg-void/60 ${
        borderColors[index % borderColors.length]
      }`}
      data-cursor="magnetic"
    >
      {/* Interactive Spotlight Radial Gradient Effect matching Projects & Blog */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(33,241,168, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110 ${
              iconColors[index % iconColors.length]
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent transition-opacity group-hover:opacity-100 opacity-60" />
        </div>
        <h3 className="mb-2 text-body-sm font-semibold tracking-[0.021em] text-bone transition-colors duration-300 group-hover:text-plum-voltage">
          {skill.name}
        </h3>
        <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke transition-colors duration-300 group-hover:text-bone/80">
          {skill.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-shell py-8 sm:py-[60px]">
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
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </section>
  );
}