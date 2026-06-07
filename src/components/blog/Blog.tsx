"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredPosts } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="Blog"
        title="Writing that turns learning into signal."
        description="Version 1 includes a featured Medium card, with the data shape ready for future RSS integration."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 md:grid-cols-2"
      >
        {featuredPosts.map((post) => (
          <motion.article key={post.title} variants={fadeUp} className="premium-border bg-black/55 p-7">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {post.platform}
            </p>
            <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
            <p className="mt-4 text-base leading-8 text-muted">{post.description}</p>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-accent"
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
