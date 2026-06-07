"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  "Started with Python and expanded into Statistics, Data Analysis, Machine Learning and Data Visualization.",
  "Currently focused on real-world projects and stronger mathematical foundations.",
  "Goal: become a highly skilled Data Scientist capable of building intelligent solutions with real-world impact."
];

export function About() {
  return (
    <section id="about" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="About"
        title="A focused journey into applied intelligence."
        description="Sachin Masti is an aspiring Data Scientist passionate about solving problems using data and technology."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 md:grid-cols-3"
      >
        {points.map((point) => (
          <motion.div key={point} variants={fadeUp} className="premium-border bg-white/[0.025] p-6">
            <p className="text-base leading-8 text-white/[0.82]">{point}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
