"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mb-[60px] max-w-3xl text-center"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-plum-voltage">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-extralight leading-[0.9] tracking-[-0.04em] text-bone sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke sm:text-base">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
