"use client";

import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { fadeUp, reveal, staggerContainer } from "@/animations/motion";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="home"
      className="section-shell flex min-h-screen items-center pb-[60px] pt-28"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid w-full items-center gap-[60px] lg:grid-cols-[1fr_1fr]"
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-4 text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage"
          >
            Aspiring Data Scientist
          </motion.p>
          <motion.h1
            variants={reveal}
            className="text-balance max-w-4xl text-heading-lg font-extralight leading-[0.9] tracking-[-0.04em] text-bone sm:text-display lg:text-hero"
          >
            Turning Data Into Decisions
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-ash"
          >
            Aspiring Data Scientist & Machine Learning Enthusiast
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[60ch] text-body-sm font-regular leading-[1.5] tracking-[0.025em] text-smoke"
          >
            Building skills, solving problems, and creating intelligent solutions
            through data.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#about">Explore Journey</ButtonLink>
          </motion.div>
        </div>

        <div className="hidden lg:block" />

        <motion.a
          variants={fadeUp}
          href="#about"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-caption font-semibold uppercase tracking-[0.05em] text-smoke transition hover:text-bone lg:flex"
        >
          Scroll <FiArrowDownRight size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}
