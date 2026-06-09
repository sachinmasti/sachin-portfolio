"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCodeFork, FaStar } from "react-icons/fa6";
import { FiGitCommit, FiGitPullRequest, FiGitBranch } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GitHubUser } from "@/types";

const statLabels = [
  { key: "public_repos", label: "Repositories", icon: FaCodeFork },
  { key: "followers", label: "Followers", icon: FaStar },
  { key: "following", label: "Following", icon: FiGitBranch }
] as const;

const activityData = [
  { label: "Commits", value: 847, icon: FiGitCommit, color: "text-plum-voltage" },
  { label: "PRs", value: 23, icon: FiGitPullRequest, color: "text-lichen" },
  { label: "Repos", value: 12, icon: FaCodeFork, color: "text-amber-spark" }
];

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
        className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"
      >
        <motion.div
          variants={fadeUp}
          className="rounded-[24px] border border-white/[0.08] bg-void/50 p-6 backdrop-blur-[2px]"
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-[16px] bg-gradient-to-br from-plum-voltage to-lichen text-bone">
                <FaGithub size={28} />
              </div>
              <div>
                <h3 className="text-body-sm font-semibold tracking-[0.021em] text-bone">
                  sachinmasti
                </h3>
                <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">
                  {profile ? `${profile.public_repos} public repositories` : "Fetching..."}
                </p>
              </div>
            </div>
            <a
              href="https://github.com/sachinmasti"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[24px] bg-plum-voltage px-5 py-3 text-caption font-semibold uppercase tracking-[0.05em] text-bone transition hover:opacity-90"
              data-cursor="magnetic"
            >
              <FaGithub size={14} />
              Profile
            </a>
          </div>

          {error ? (
            <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">{error}</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-3">
            {activityData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[16px] border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <Icon className={`mb-2 text-xl ${item.color}`} />
                  <p className="text-heading-sm font-extralight leading-[1.1] tracking-[-0.04em] text-bone">
                    {item.value}
                  </p>
                  <p className="text-caption font-semibold uppercase tracking-[0.05em] text-smoke">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-[24px] border border-white/[0.08] bg-void/50 p-6 backdrop-blur-[2px]"
        >
          <p className="mb-6 text-caption font-semibold uppercase tracking-[0.05em] text-ash">
            Live Stats
          </p>
          <div className="flex flex-col gap-5">
            {statLabels.map((stat) => {
              const Icon = stat.icon;
              const value = profile ? profile[stat.key].toLocaleString() : "...";
              return (
                <div key={stat.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/[0.04] text-ash">
                      <Icon size={16} />
                    </div>
                    <span className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-heading-sm font-extralight leading-[1.1] tracking-[-0.04em] text-bone">
                    {value}
                  </span>
                </div>
              );
            })}
            <div className="mt-4 h-px bg-gradient-to-r from-plum-voltage via-lichen to-transparent" />
            <a
              href="https://github.com/sachinmasti"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[24px] border border-white/[0.1] py-3 text-caption font-semibold uppercase tracking-[0.05em] text-smoke transition hover:border-plum-voltage hover:text-bone"
              data-cursor="magnetic"
            >
              View All Activity <FiGitPullRequest size={14} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
