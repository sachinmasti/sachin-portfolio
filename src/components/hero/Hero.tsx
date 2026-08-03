"use client";

import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { fadeUp, reveal, staggerContainer } from "@/animations/motion";
import { ButtonLink } from "@/components/ui/Button";

function AnimatedHeroTitle() {
  const line1 = "Finding Signals";
  const line2 = "in the Noise";

  return (
    <motion.div className="group relative cursor-default py-2 select-none">
      <motion.h1
        variants={reveal}
        className="relative z-10 text-balance max-w-4xl text-[2rem] font-extralight leading-[0.92] tracking-[-0.04em] text-bone sm:text-display lg:text-hero"
      >
        {/* Line 1 */}
        <span className="inline-block transition-transform duration-300">
          {line1.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              whileHover={{
                scale: 1.25,
                y: -6,
                color: "#21F1A8",
                textShadow: "0 0 20px rgba(33,241,168,0.8)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block transition-colors duration-200"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <br />
        {/* Line 2 */}
        <span className="inline-block transition-transform duration-300">
          {line2.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              whileHover={{
                scale: 1.25,
                y: -6,
                color: "#21F1A8",
                textShadow: "0 0 20px rgba(33,241,168,0.8)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block transition-colors duration-200"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </motion.h1>
    </motion.div>
  );
}

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
            Data Scientist — Machine Learning Engineer
          </motion.p>

          {/* Interactive Animated Hero Title */}
          <AnimatedHeroTitle />

          <motion.p
            variants={fadeUp}
            className="mt-4 text-xs font-regular leading-[1.5] tracking-[0.025em] text-ash sm:mt-6 sm:text-subheading"
          >
            Turning raw data into clarity — one model at a time.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-2 max-w-[60ch] text-[11px] font-regular leading-[1.5] tracking-[0.025em] text-smoke sm:mt-4 sm:text-body-sm"
          >
            Python · Machine Learning · NLP · Data Pipeline — from messy datasets to
            production-ready intelligence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-4 sm:mt-10 sm:flex-row">
            <ButtonLink href="#about">Launch Into Orbit</ButtonLink>
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