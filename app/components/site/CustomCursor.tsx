"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const rafRef = useRef<number>(0);

  // spring for the ring — lags behind the dot
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-fg"
          animate={{
            width:  clicking ? 6 : hovering ? 6 : 6,
            height: clicking ? 6 : hovering ? 6 : 6,
            opacity: 1,
          }}
          transition={{ duration: 0.15 }}
          style={{ width: 6, height: 6 }}
        />
      </motion.div>

      {/* Ring — springs behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-fg/50"
          animate={{
            width:   clicking ? 28 : hovering ? 44 : 32,
            height:  clicking ? 28 : hovering ? 44 : 32,
            opacity: clicking ? 0.4 : hovering ? 0.6 : 0.35,
            borderColor: hovering ? "hsla(40,10%,96%,0.8)" : "hsla(40,10%,96%,0.4)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
