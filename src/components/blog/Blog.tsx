"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredPosts } from "@/data/blog";
import { MouseEvent } from "react";

function BlogCard({ post }: { post: (typeof featuredPosts)[number] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-void/30 p-4 backdrop-blur-md transition-all duration-500 hover:bg-void/50 hover:border-plum-voltage/40"
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
      <div className="relative z-10 flex flex-col h-full">
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
      </div>
    </motion.article>
  );
}

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
          <BlogCard key={post.title} post={post} />
        ))}
      </motion.div>
    </section>
  );
}
