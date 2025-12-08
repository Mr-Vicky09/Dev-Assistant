"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
  onClick: () => void;
}

function ProjectCard({ project, index, isInView, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 20, y: -x * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="cursor-hover perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div
        className="relative h-80 rounded-xl overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, rgba(157, 0, 255, 0.1), rgba(0, 240, 255, 0.1))",
          border: "1px solid rgba(157, 0, 255, 0.3)",
          boxShadow: isHovered
            ? "0 0 40px rgba(157, 0, 255, 0.4), 0 0 80px rgba(0, 240, 255, 0.2)"
            : "0 0 20px rgba(157, 0, 255, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#9d00ff]/20 to-[#00f0ff]/20" />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(0, 240, 255, 0.3), transparent 50%)`,
          }}
        />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.div
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full"
                  style={{
                    background: "rgba(157, 0, 255, 0.2)",
                    border: "1px solid rgba(157, 0, 255, 0.4)",
                    color: "#00f0ff",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-3 py-1 text-xs text-gray-400">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <div
          className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-hover"
            style={{
              background: "rgba(10, 10, 15, 0.8)",
              border: "1px solid rgba(157, 0, 255, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub className="text-[#00f0ff]" />
          </motion.a>
          <motion.a
            href={project.link}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-hover"
            style={{
              background: "rgba(10, 10, 15, 0.8)",
              border: "1px solid rgba(0, 240, 255, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink className="text-[#00f0ff]" />
          </motion.a>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, #9d00ff, #00f0ff)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: "#9d00ff" }}
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
            PROJECTS
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#9d00ff] to-[#00f0ff]" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A selection of projects that showcase my expertise in data analysis and visualization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(10, 10, 15, 0.95)" }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-2xl w-full rounded-2xl p-8"
            style={{
              background: "rgba(10, 10, 15, 0.9)",
              border: "1px solid rgba(157, 0, 255, 0.5)",
              boxShadow: "0 0 60px rgba(157, 0, 255, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-hover"
              onClick={() => setSelectedProject(null)}
            >
              <FiX size={24} />
            </button>

            <h3 className="text-3xl font-bold text-white mb-4">
              {selectedProject.title}
            </h3>
            <p className="text-gray-300 mb-6">{selectedProject.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "rgba(157, 0, 255, 0.2)",
                    border: "1px solid rgba(157, 0, 255, 0.4)",
                    color: "#00f0ff",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                className="flex items-center gap-2 px-6 py-3 rounded-lg cursor-hover"
                style={{
                  background: "rgba(157, 0, 255, 0.2)",
                  border: "1px solid rgba(157, 0, 255, 0.5)",
                }}
              >
                <FiGithub />
                <span>View Code</span>
              </a>
              <a
                href={selectedProject.link}
                className="flex items-center gap-2 px-6 py-3 rounded-lg cursor-hover"
                style={{
                  background: "rgba(0, 240, 255, 0.2)",
                  border: "1px solid rgba(0, 240, 255, 0.5)",
                }}
              >
                <FiExternalLink />
                <span>Live Demo</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
