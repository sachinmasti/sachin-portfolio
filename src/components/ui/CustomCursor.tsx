"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const enabled = useMediaQuery("(pointer: fine) and (min-width: 768px)");
  const [active, setActive] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const idRef = useRef(0);
  const x = useSpring(useMotionValue(0), { stiffness: 520, damping: 36 });
  const y = useSpring(useMotionValue(0), { stiffness: 520, damping: 36 });

  useEffect(() => {
    if (!enabled) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 9);
      y.set(event.clientY - 9);
      idRef.current += 1;
      const point = { x: event.clientX, y: event.clientY, id: idRef.current };
      setTrail((items) => [...items.slice(-10), point]);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a,button,[data-cursor='magnetic']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {trail.map((point, index) => (
        <span
          key={point.id}
          className="absolute h-1.5 w-1.5 bg-plum-voltage"
          style={{
            left: point.x,
            top: point.y,
            opacity: index / 12,
            transform: "translate(-50%, -50%)"
          }}
        />
      ))}
      <motion.span
        className="absolute h-[18px] w-[18px] rounded-[24px] border border-plum-voltage bg-plum-voltage/20"
        style={{ x, y }}
        animate={{ scale: active ? 2.3 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      />
    </div>
  );
}
