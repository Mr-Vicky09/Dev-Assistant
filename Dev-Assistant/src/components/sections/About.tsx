"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo, skills } from "@/data/portfolio";
import { FiDatabase, FiCode, FiBarChart2, FiCpu, FiEye, FiActivity } from "react-icons/fi";

const iconMap: { [key: string]: React.ReactNode } = {
  python: <FiCode size={20} />,
  database: <FiDatabase size={20} />,
  chart: <FiBarChart2 size={20} />,
  code: <FiCode size={20} />,
  brain: <FiCpu size={20} />,
  eye: <FiEye size={20} />,
  stats: <FiActivity size={20} />,
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]"
          style={{ background: "#9d00ff" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px]"
          style={{ background: "#00f0ff" }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
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
            ABOUT ME
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#9d00ff] to-[#00f0ff]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(10, 10, 15, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(157, 0, 255, 0.3)",
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#00f0ff]">
                The Story
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <div className="flex gap-4">
                <div className="flex-1 text-center p-4 rounded-xl bg-[#9d00ff]/10 border border-[#9d00ff]/30">
                  <div className="text-3xl font-black text-[#9d00ff]">5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="flex-1 text-center p-4 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                  <div className="text-3xl font-black text-[#00f0ff]">50+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-[#00f0ff]">
              Skills Arsenal
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="group cursor-hover"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[#9d00ff] group-hover:text-[#00f0ff] transition-colors">
                        {iconMap[skill.icon] || <FiCode size={20} />}
                      </span>
                      <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 group-hover:text-[#00f0ff] transition-colors">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #9d00ff, #00f0ff)",
                        boxShadow: "0 0 10px #9d00ff, 0 0 20px #00f0ff",
                      }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
