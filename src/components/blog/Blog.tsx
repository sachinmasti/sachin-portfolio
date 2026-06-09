"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredPosts } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" className="section-shell py-[60px]">
      <SectionHeading
        eyebrow="Blog"
        title="Writing that turns learning into signal."
        description="Featured posts from Medium, with data shape ready for future RSS integration."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-2"
      >
        {featuredPosts.map((post) => (
          <motion.article
            key={post.title}
            variants={fadeUp}
            className="premium-border p-6"
          >
            <p className="mb-8 text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage">
              {post.platform}
            </p>
            <h3 className="text-heading-sm font-extralight leading-[1.1] tracking-[-0.04em] text-bone">
              {post.title}
            </h3>
            <p className="mt-4 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">
              {post.description}
            </p>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-[24px] bg-plum-voltage px-6 py-3.5 text-caption font-semibold uppercase tracking-[0.05em] text-bone transition hover:opacity-90"
              data-cursor="magnetic"
            >
              Read On Medium <FiArrowUpRight />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
