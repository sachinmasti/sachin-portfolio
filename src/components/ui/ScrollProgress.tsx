"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "story", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" }
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      const idx = Math.min(sections.length - 1, Math.round(v * sections.length));
      setActiveIdx(idx);
    });
    return () => unsub();
  }, [smoothProgress]);

  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col items-center gap-5">
        {sections.map((section, i) => {
          const isActive = activeIdx === i;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center gap-3"
            >
              <div
                className="flex items-center gap-3"
                style={{ opacity: Math.abs(activeIdx - i) <= 1 ? 0.8 : 0.2 }}
              >
                <span
                  className="block rounded-[24px] bg-smoke transition-all duration-500"
                  style={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    background: isActive ? "#8052ff" : undefined,
                    boxShadow: isActive ? "0 0 12px rgba(128,82,255,0.6)" : undefined
                  }}
                />
                <span
                  className="text-caption font-regular tracking-[0.021em] text-smoke opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={isActive ? { opacity: 1, color: "#ffffff" } : undefined}
                >
                  {section.label}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
