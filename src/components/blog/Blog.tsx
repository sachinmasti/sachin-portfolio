"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SiMedium } from "react-icons/si";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MouseEvent } from "react";

const MEDIUM_URL = "https://medium.com/@sachinmasti88";

export function Blog() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id="blog" className="section-shell py-8 sm:py-[60px]">
      <SectionHeading
        eyebrow="Blog"
        title="Writing that turns learning into signal."
        description="Deep dives on classification metrics, hyperparameter tuning, and ML in production — all on Medium."
      />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-xl"
      >
        <a
          href={MEDIUM_URL}
          target="_blank"
          rel="noreferrer"
          onMouseMove={handleMouseMove}
          data-cursor="magnetic"
          className="group relative flex items-center gap-5 overflow-hidden rounded-[24px] border border-white/[0.08] bg-void/30 p-6 backdrop-blur-md transition-all duration-500 hover:bg-void/50 hover:border-plum-voltage/40 sm:p-8"
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(33,241,168, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-[20px] bg-plum-voltage text-void shadow-[0_0_24px_rgba(33,241,168,0.35)] transition-shadow duration-500 group-hover:shadow-[0_0_36px_rgba(33,241,168,0.55)]"
          >
            <SiMedium size={30} />
          </motion.div>
          <div className="relative z-10 flex-1">
            <p className="text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage">
              Medium
            </p>
            <h3 className="mt-1 text-[18px] font-extralight leading-[1.2] tracking-[-0.02em] text-bone">
              @sachinmasti88
            </h3>
            <p className="mt-1 text-body-sm font-regular leading-[1.5] tracking-[0.025em] text-smoke">
              ML notes, experiments &amp; learnings from the field.
            </p>
          </div>
          <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-white/[0.1] text-ash transition-all duration-300 group-hover:border-plum-voltage/60 group-hover:text-plum-voltage">
            <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
