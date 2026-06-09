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
    <section id="about" className="section-shell py-[60px]">
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
        className="grid gap-6 md:grid-cols-3"
      >
        {points.map((point) => (
            <motion.div
              key={point}
              variants={fadeUp}
              className="premium-border p-6"
            >
            <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-ash">
              {point}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
