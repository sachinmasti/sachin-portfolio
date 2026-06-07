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
    <section id="github" className="section-shell py-24 sm:py-32">
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
        className="premium-border bg-white/[0.025] p-6 sm:p-8"
      >
        <motion.div variants={fadeUp} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-black">
              <FaGithub size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">sachinmasti</h3>
              <p className="text-sm text-muted">GitHub profile metrics</p>
            </div>
          </div>
          <a
            href="https://github.com/sachinmasti"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
            data-cursor="magnetic"
          >
            View GitHub Profile
          </a>
        </motion.div>

        {error ? <p className="text-sm text-muted">{error}</p> : null}

        <div className="grid gap-4 sm:grid-cols-3">
          {statLabels.map((stat) => (
            <motion.div key={stat.key} variants={fadeUp} className="border border-white/10 p-5">
              <p className="text-3xl font-semibold text-white">
                {profile ? profile[stat.key].toLocaleString() : "..."}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
