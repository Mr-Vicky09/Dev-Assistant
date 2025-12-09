"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { experiences } from "@/data/portfolio";
import { FiBriefcase, FiCalendar, FiChevronRight } from "react-icons/fi";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/2 w-px h-full -translate-x-1/2 opacity-20"
          style={{
            background: "linear-gradient(to bottom, transparent, #9d00ff, #00f0ff, transparent)",
          }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black mb-4"
            style={{
              background: "linear-gradient(135deg, #9d00ff, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            EXPERIENCE
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#9d00ff] to-[#00f0ff]" />
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, #9d00ff, #00f0ff)",
            }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
              }`}
            >
              <div
                className="absolute left-4 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 rounded-full z-10"
                style={{
                  background: activeId === exp.id ? "#00f0ff" : "#9d00ff",
                  boxShadow: `0 0 20px ${activeId === exp.id ? "#00f0ff" : "#9d00ff"}`,
                }}
              />

              <motion.div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                } cursor-hover`}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveId(exp.id)}
                onHoverEnd={() => setActiveId(null)}
              >
                <div
                  className="p-6 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(10, 10, 15, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${
                      activeId === exp.id
                        ? "rgba(0, 240, 255, 0.5)"
                        : "rgba(157, 0, 255, 0.3)"
                    }`,
                    boxShadow:
                      activeId === exp.id
                        ? "0 0 30px rgba(0, 240, 255, 0.2)"
                        : "none",
                  }}
                >
                  {exp.company && (
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <FiBriefcase className="text-[#9d00ff]" />
                      <span className="text-[#00f0ff] font-medium">
                        {exp.company}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-2">
                    {exp.role}
                  </h3>

                  {exp.period && (
                    <div
                      className={`flex items-center gap-2 text-gray-400 text-sm mb-4 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <FiCalendar />
                      <span>{exp.period}</span>
                    </div>
                  )}

                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeId === exp.id ? "auto" : 0,
                      opacity: activeId === exp.id ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-700">
                      <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 text-sm text-gray-400 ${
                              index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <FiChevronRight className="text-[#00f0ff] flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
