"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { navigation } from "@/data/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-void">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="#home" className="text-xs font-semibold uppercase tracking-[0.05em] text-bone">
          SACHIN MASTI
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.05em] text-smoke transition hover:text-bone"
              data-cursor="magnetic"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-[24px] bg-plum-voltage px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.05em] text-bone transition md:inline-flex"
          data-cursor="magnetic"
        >
          Start a conversation
        </a>

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
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/[0.1] py-4 text-xs font-semibold uppercase tracking-[0.05em] text-smoke transition last:border-0 hover:text-bone"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
