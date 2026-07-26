"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { navigation } from "@/data/navigation";
import { DownloadPopup } from "@/components/ui/DownloadPopup";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  function handleResumeClick() {
    setOpen(false);
    setShowDownload(true);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-void">
        <nav className="section-shell flex h-18 items-center justify-between py-4">
          <a
            href="#home"
            className="text-body-sm font-semibold tracking-[0.021em] text-bone"
          >
            SACHIN MASTI
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) =>
              item.label === "Resume" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={handleResumeClick}
                  className="flex items-center gap-2 rounded-[24px] bg-plum-voltage px-4 py-2 text-caption font-semibold uppercase tracking-[0.05em] text-void transition hover:opacity-90"
                  data-cursor="magnetic"
                >
                  <FiDownload size={14} />
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-body-sm font-regular tracking-[0.021em] text-smoke transition hover:text-bone"
                  data-cursor="magnetic"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-[24px] border border-line text-bone md:hidden"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </nav>
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-white/[0.05] bg-void md:hidden"
            >
              <div className="section-shell flex flex-col py-4">
                {navigation.map((item) =>
                  item.label === "Resume" ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={handleResumeClick}
                      className="flex items-center gap-2 border-b border-white/[0.1] py-4 text-body-sm font-regular tracking-[0.021em] text-smoke transition last:border-0 hover:text-bone"
                    >
                      <FiDownload size={16} />
                      {item.label}
                    </button>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-white/[0.1] py-4 text-body-sm font-regular tracking-[0.021em] text-smoke transition last:border-0 hover:text-bone"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
      <DownloadPopup open={showDownload} onClose={() => setShowDownload(false)} />
    </>
  );
}
