"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/hooks/useMousePosition";
import GlitchButton from "@/components/ui/GlitchButton";
import { personalInfo } from "@/data/portfolio";
import { FiArrowDown } from "react-icons/fi";

const ParticleSphere = dynamic(() => import("@/components/three/ParticleSphere"), {
  ssr: false,
});

export default function Hero() {
  const mousePosition = useMousePosition();

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  const name = personalInfo.name.toUpperCase();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleSphere mousePosition={mousePosition} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="flex justify-center items-center gap-2 md:gap-4 overflow-hidden">
            {name.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-6xl md:text-8xl lg:text-9xl font-black glitch-text"
                data-text={letter}
                style={{
                  textShadow:
                    "0 0 10px #9d00ff, 0 0 20px #9d00ff, 0 0 40px #00f0ff",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase"
            style={{ color: "#00f0ff" }}
          >
            — {personalInfo.role} —
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <GlitchButton onClick={scrollToAbout}>
            Explore My Work
          </GlitchButton>
          <GlitchButton variant="secondary" href="#contact">
            Get In Touch
          </GlitchButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <button
          onClick={scrollToAbout}
          className="text-[#00f0ff] cursor-hover"
          aria-label="Scroll down"
        >
          <FiArrowDown size={30} />
        </button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
