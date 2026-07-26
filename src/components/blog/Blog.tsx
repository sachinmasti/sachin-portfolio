"use client";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredPosts } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" className="section-shell py-8 sm:py-[60px]">
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
        className="grid gap-5 md:grid-cols-2"
      >
        {featuredPosts.map((post) => (
          <motion.article
            key={post.title}
            variants={fadeUp}
            className="premium-border flex flex-col p-4 transition-all duration-500 hover:border-plum-voltage/40"
          >
            <p className="mb-3 text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage">
              {post.platform}
            </p>
            <h3 className="text-lg font-extralight leading-[1.2] tracking-[-0.02em] text-bone">
              {post.title}
            </h3>
            <p className="mt-2 text-body-sm font-regular leading-[1.5] tracking-[0.025em] text-smoke">
              {post.description}
            </p>
            <div className="mt-auto pt-4">
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[24px] bg-plum-voltage px-4 py-2 text-caption font-semibold uppercase tracking-[0.05em] text-void transition hover:opacity-90"
                data-cursor="magnetic"
              >
                Read On Medium <FiArrowUpRight />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
