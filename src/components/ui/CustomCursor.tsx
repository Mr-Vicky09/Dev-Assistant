"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  const trailX = useSpring(x, { damping: 35, stiffness: 200 });
  const trailY = useSpring(y, { damping: 35, stiffness: 200 });

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
    trailX.set(x);
    trailY.set(y);
  }, [x, y, cursorX, cursorY, trailX, trailY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-8 h-8 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background: "linear-gradient(135deg, #9d00ff, #00f0ff)",
            boxShadow: "0 0 10px #9d00ff, 0 0 20px #00f0ff, 0 0 30px #9d00ff",
          }}
        />
      </motion.div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: useSpring(x, { damping: 40 + i * 10, stiffness: 150 - i * 30 }),
            y: useSpring(y, { damping: 40 + i * 10, stiffness: 150 - i * 30 }),
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${6 - i}px`,
              height: `${6 - i}px`,
              background: i % 2 === 0 ? "#9d00ff" : "#00f0ff",
              opacity: 0.5 - i * 0.15,
              filter: `blur(${i}px)`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
