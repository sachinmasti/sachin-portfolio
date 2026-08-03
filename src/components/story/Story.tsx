"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";

const stories = [
  {
    step: "01",
    title: "First Line of Code",
    tag: "Genesis",
    preview: "Python basics — variables, loops, functions",
    detail:
      "Started with Python basics — variables, loops, functions. Didn't know this would turn into a full-blown data science obsession.",
    accent: "text-plum-voltage border-plum-voltage/40 bg-plum-voltage/10",
  },
  {
    step: "02",
    title: "Data Deep-Dive",
    tag: "Core Analytics",
    preview: "Pandas, NumPy, SQL — the trifecta",
    detail:
      "Cleaned messy datasets, wrote complex queries, and fell in love with finding patterns in chaos. Every bug was a lesson.",
    accent: "text-amber-spark border-amber-spark/40 bg-amber-spark/10",
  },
  {
    step: "03",
    title: "ML Clicked",
    tag: "Machine Learning",
    preview: "Models started making sense",
    detail:
      "From linear regression to neural networks — the 'why' behind the math finally clicked. Built first end-to-end ML pipeline.",
    accent: "text-lichen border-lichen/40 bg-lichen/10",
  },
  {
    step: "04",
    title: "Building in Public",
    tag: "Present",
    preview: "Projects, blogs, and open source",
    detail:
      "Started sharing work on GitHub and Medium. Realized teaching is the best way to learn. Currently building toward production-grade data systems.",
    accent: "text-plum-voltage border-plum-voltage/40 bg-plum-voltage/10",
  },
];

function JourneyCard({ story }: { story: typeof stories[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      className="group relative pl-10 sm:pl-16"
    >
      {/* Pulsing Glowing Node Circle on Vertical Line */}
      <div className="absolute left-[5px] top-4 h-5 w-5 rounded-full border-2 border-plum-voltage bg-void transition-all duration-500 group-hover:bg-plum-voltage group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(33,241,168,0.8)] sm:left-[9px]" />

      {/* Card Body with Spotlight */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-void/40 p-6 sm:p-7 backdrop-blur-md transition-all duration-500 hover:border-white/[0.2] hover:bg-void/70 shadow-xl">
        {/* Interactive Spotlight Radial Gradient */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                380px circle at ${mouseX}px ${mouseY}px,
                rgba(33,241,168, 0.14),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${story.accent}`}>
              <span className="font-bold">{story.step}</span> • {story.tag}
            </span>
            <span className="text-caption font-semibold uppercase tracking-wider text-ash opacity-60">
              Milestone
            </span>
          </div>

          <h3 className="text-heading-sm font-extralight leading-[1.1] tracking-[-0.04em] text-bone transition-colors group-hover:text-plum-voltage">
            {story.title}
          </h3>

          <p className="mt-2 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke transition-colors group-hover:text-bone">
            {story.preview}
          </p>

          <div className="mt-3 grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="flex items-start gap-2.5 pt-2 border-t border-white/[0.06] text-body-sm font-regular leading-[1.6] tracking-[0.025em] text-ash">
                <FiCheckCircle className="shrink-0 text-plum-voltage mt-1" size={16} />
                {story.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Story() {
  return (
    <section id="story" className="section-shell py-8 sm:py-[60px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-4xl"
      >
        <motion.p
          variants={fadeUp}
          className="mb-2 text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage"
        >
          The Journey
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-balance mb-8 text-[1.25rem] font-extralight leading-[1.1] tracking-[-0.04em] text-bone sm:mb-12 sm:text-heading lg:text-heading-lg"
        >
          How it started → How it&apos;s going
        </motion.h2>

        <div className="relative">
          {/* Glowing Gradient Vertical Line */}
          <div className="absolute left-[14px] top-2 h-full w-[2px] bg-gradient-to-b from-plum-voltage via-lichen to-amber-spark sm:left-[18px]" />

          <div className="flex flex-col gap-8 sm:gap-10">
            {stories.map((story) => (
              <JourneyCard key={story.title} story={story} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}