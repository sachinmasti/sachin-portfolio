"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GitHubUser } from "@/types";

const statLabels = [
  { key: "public_repos", label: "Repositories" },
  { key: "followers", label: "Followers" },
  { key: "following", label: "Following" }
] as const;

export function GitHubStats() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetch("https://api.github.com/users/sachinmasti", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub request failed");
        return response.json() as Promise<GitHubUser>;
      })
      .then((data) => {
        if (mounted) setProfile(data);
      })
      .catch(() => {
        if (mounted) setError("GitHub data is temporarily unavailable.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="github" className="section-shell py-[60px]">
      <SectionHeading
        eyebrow="GitHub"
        title="A public build trail, fetched live."
        description="Repository, follower, and following counts are loaded directly from the GitHub API."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="premium-border bg-void p-6"
      >
        <motion.div variants={fadeUp} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-[24px] bg-plum-voltage text-bone">
              <FaGithub size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-bone">sachinmasti</h3>
              <p className="text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke">GitHub profile metrics</p>
            </div>
          </div>
          <a
            href="https://github.com/sachinmasti"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-[24px] border border-amber-spark bg-transparent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.05em] text-amber-spark transition hover:opacity-90"
            data-cursor="magnetic"
          >
            View GitHub Profile
          </a>
        </motion.div>

        {error ? <p className="text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke">{error}</p> : null}

        <div className="grid gap-4 sm:grid-cols-3">
          {statLabels.map((stat) => (
            <motion.div key={stat.key} variants={fadeUp} className="rounded-[24px] border border-white/[0.1] bg-void p-6">
              <p className="text-3xl font-extralight leading-[0.9] tracking-[-0.04em] text-bone">
                {profile ? profile[stat.key].toLocaleString() : "..."}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.05em] text-smoke">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
