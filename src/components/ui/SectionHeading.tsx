"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/animations/motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mx-auto mb-[60px] max-w-3xl text-center"
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
        }}
        className="mb-4 text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: {
            clipPath: "inset(0 0% 0 0)",
            transition: { duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
          }
        }}
        className="text-balance text-heading font-extralight leading-[1.1] tracking-[-0.04em] text-bone sm:text-heading-lg"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] } }
          }}
          className="mx-auto mt-5 max-w-2xl text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
