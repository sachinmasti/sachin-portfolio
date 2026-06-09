"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";

const stories = [
  {
    title: "First Line of Code",
    preview: "Python basics — variables, loops, functions",
    detail: "Started with Python basics — variables, loops, functions. Didn't know this would turn into a full-blown data science obsession."
  },
  {
    title: "Data Deep-Dive",
    preview: "Pandas, NumPy, SQL — the trifecta",
    detail: "Cleaned messy datasets, wrote complex queries, and fell in love with finding patterns in chaos. Every bug was a lesson."
  },
  {
    title: "ML Clicked",
    preview: "Models started making sense",
    detail: "From linear regression to neural networks — the 'why' behind the math finally clicked. Built first end-to-end ML pipeline."
  },
  {
    title: "Building in Public",
    preview: "Projects, blogs, and open source",
    detail: "Started sharing work on GitHub and Medium. Realized teaching is the best way to learn. Currently building toward production-grade data systems."
  }
];

export function Story() {
  return (
    <section id="story" className="section-shell py-[60px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-4xl"
      >
        <motion.p
          variants={fadeUp}
          className="mb-2 text-caption font-semibold uppercase tracking-[0.05em] text-lichen"
        >
          The Journey
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-balance mb-12 text-heading font-extralight leading-[1.1] tracking-[-0.04em] text-bone sm:text-heading-lg"
        >
          How it started → How it&apos;s going
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-plum-voltage via-lichen to-amber-spark" />

          <div className="flex flex-col gap-10">
            {stories.map((story, i) => (
              <motion.div
                key={story.title}
                variants={fadeUp}
                className="group relative pl-14"
              >
                <div className="absolute left-[11px] top-1.5 h-4 w-4 rounded-[24px] border-2 border-plum-voltage bg-void transition-all duration-500 group-hover:bg-plum-voltage group-hover:shadow-[0_0_12px_rgba(128,82,255,0.6)]" />

                <div className="rounded-[24px] border border-white/[0.08] bg-void/50 p-6 backdrop-blur-[2px] transition-all duration-500 hover:border-white/[0.15]">
                  <h3 className="text-heading-sm font-extralight leading-[1.1] tracking-[-0.04em] text-bone">
                    {story.title}
                  </h3>
                  
                  <p className="mt-2 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke transition-opacity duration-300 group-hover:opacity-0">
                    {story.preview}
                  </p>

                  <div className="mt-2 grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="flex items-center gap-2 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-ash">
                        <FiArrowRight className="shrink-0 text-lichen" />
                        {story.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
