"use client";

import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { fadeUp, reveal, staggerContainer } from "@/animations/motion";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="home" className="section-shell flex min-h-screen items-center pb-[60px] pt-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid w-full items-center gap-[60px] lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.05em] text-plum-voltage"
          >
            Aspiring Data Scientist
          </motion.p>
          <motion.h1
            variants={reveal}
            className="text-balance max-w-5xl text-5xl font-extralight leading-[0.9] tracking-[-0.04em] text-bone sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Turning Data Into Decisions
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 text-xl font-normal leading-[1.5] tracking-[0.025em] text-ash sm:text-2xl">
            Aspiring Data Scientist & Machine Learning Enthusiast
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke sm:text-base">
            Building skills, solving problems, and creating intelligent solutions through data.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#about">Explore Journey</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Contact Me
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="premium-border relative min-h-[380px] overflow-hidden bg-void p-6"
          data-cursor="magnetic"
        >
          <div className="relative flex h-full min-h-[330px] flex-col justify-between">
            <div className="grid grid-cols-3 gap-3">
              {["Python", "Statistics", "ML", "SQL", "Pandas", "Tableau"].map((label) => (
                <div key={label} className="rounded-[24px] border border-white/[0.1] px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.05em] text-ash">
                  {label}
                </div>
              ))}
            </div>
            <div>
              <div className="mb-5 h-px w-full bg-white/[0.1]" />
              <p className="max-w-md text-2xl font-extralight leading-[0.95] tracking-[-0.04em] text-bone">
                Learning systems, models, and visual stories that help people make better decisions.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="#about"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.05em] text-smoke transition hover:text-bone lg:flex"
        >
          Scroll <FiArrowDownRight size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}
