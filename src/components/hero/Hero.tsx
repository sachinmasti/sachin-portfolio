"use client";

import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { fadeUp, reveal, staggerContainer } from "@/animations/motion";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="home" className="section-shell flex min-h-screen items-center pb-20 pt-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-accent"
          >
            Aspiring Data Scientist
          </motion.p>
          <motion.h1
            variants={reveal}
            className="text-balance max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Turning Data Into Decisions
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 text-xl text-white/[0.86] sm:text-2xl">
            Aspiring Data Scientist & Machine Learning Enthusiast
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
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
          className="relative min-h-[380px] overflow-hidden border border-line bg-black/40 p-6"
          data-cursor="magnetic"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(128,82,255,0.28),transparent_36%)]" />
          <div className="relative flex h-full min-h-[330px] flex-col justify-between">
            <div className="grid grid-cols-3 gap-3">
              {["Python", "Statistics", "ML", "SQL", "Pandas", "Tableau"].map((label) => (
                <div key={label} className="border border-white/10 px-3 py-4 text-center text-sm text-white/80">
                  {label}
                </div>
              ))}
            </div>
            <div>
              <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="max-w-md text-2xl font-semibold leading-tight text-white">
                Learning systems, models, and visual stories that help people make better decisions.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="#about"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted transition hover:text-white lg:flex"
        >
          Scroll <FiArrowDownRight size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}
