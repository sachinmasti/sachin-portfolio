"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiX } from "react-icons/fi";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DownloadPopup({ open, onClose }: Props) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = "/Sachin_Masti_Resume.pdf";
    a.download = "Sachin_Masti_Resume.pdf";
    a.click();
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-[24px] border border-white/[0.08] bg-void/90 p-6 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] text-ash transition hover:text-bone"
            >
              <FiX size={16} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-plum-voltage/10 text-plum-voltage">
                <FiDownload size={24} />
              </div>
              <h3 className="text-[20px] font-extralight leading-[1.2] tracking-[-0.02em] text-bone">
                Download my resume?
              </h3>
              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-[20px] border border-white/[0.08] bg-white/[0.02] px-5 py-3 text-caption font-semibold uppercase tracking-[0.05em] text-ash transition hover:bg-white/[0.05] hover:text-bone"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 rounded-[20px] bg-plum-voltage px-5 py-3 text-caption font-semibold uppercase tracking-[0.05em] text-void transition hover:opacity-90"
                  data-cursor="magnetic"
                >
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
