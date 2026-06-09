"use client";

import { useEffect, useState } from "react";

export type SectionInfo = {
  index: number;
  progress: number;
};

export function useScrollSection(sectionIds: string[]): SectionInfo {
  const [section, setSection] = useState<SectionInfo>({ index: 0, progress: 0 });

  useEffect(() => {
    function update() {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const maxScroll = docH - viewH;

      if (maxScroll <= 0) {
        setSection({ index: 0, progress: 0 });
        return;
      }

      const rawProgress = scrollY / maxScroll;
      const totalSections = sectionIds.length;
      const idx = Math.min(totalSections - 1, Math.floor(rawProgress * totalSections));
      const sectionProgress = (rawProgress * totalSections) % 1;

      setSection({ index: idx, progress: sectionProgress });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sectionIds]);

  return section;
}
