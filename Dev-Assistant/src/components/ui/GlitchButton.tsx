"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function GlitchButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
}: GlitchButtonProps) {
  const baseStyles = `
    relative px-8 py-4 font-bold text-sm uppercase tracking-widest
    overflow-hidden group cursor-hover
  `;

  const variants = {
    primary: "bg-transparent border-2 border-[#9d00ff] text-white",
    secondary: "bg-transparent border-2 border-[#00f0ff] text-white",
  };

  const glowColor = variant === "primary" ? "#9d00ff" : "#00f0ff";

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className} inline-block`}
      whileHover={{
        boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      <motion.span
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${glowColor}20, transparent)`,
        }}
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}40, transparent)`,
          animation: "glitch 0.3s infinite",
        }}
      />

      <span className="absolute -inset-1 opacity-0 group-hover:opacity-30">
        <span
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, ${glowColor}, transparent)`,
            filter: "blur(4px)",
          }}
        />
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}
