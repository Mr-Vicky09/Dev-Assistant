"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { socialLinks, personalInfo } from "@/data/portfolio";
import GlitchButton from "@/components/ui/GlitchButton";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSend } from "react-icons/fi";

const iconMap: { [key: string]: React.ReactNode } = {
  github: <FiGithub size={24} />,
  linkedin: <FiLinkedin size={24} />,
  twitter: <FiTwitter size={24} />,
  email: <FiMail size={24} />,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyles = {
    background: "rgba(10, 10, 15, 0.8)",
    border: "1px solid rgba(157, 0, 255, 0.3)",
    transition: "all 0.3s ease",
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px]"
          style={{ background: "linear-gradient(to top, #9d00ff, #00f0ff)" }}
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
            GET IN TOUCH
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#9d00ff] to-[#00f0ff]" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Got a project in mind? Let&apos;s create something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:border-[#00f0ff] cursor-hover"
                  style={inputStyles}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:border-[#00f0ff] cursor-hover"
                  style={inputStyles}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:border-[#00f0ff] resize-none cursor-hover"
                  style={inputStyles}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-hover disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #9d00ff, #00f0ff)",
                    boxShadow: "0 0 30px rgba(157, 0, 255, 0.5)",
                  }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : submitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message <FiSend />
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div
              className="p-8 rounded-2xl mb-8"
              style={{
                background: "rgba(10, 10, 15, 0.8)",
                border: "1px solid rgba(157, 0, 255, 0.3)",
              }}
            >
              <h3 className="text-2xl font-bold text-[#00f0ff] mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-400 mb-6">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <div className="flex items-center gap-3 text-gray-300">
                <FiMail className="text-[#9d00ff]" />
                <span>{personalInfo.email}</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Find me on
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)",
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center cursor-hover"
                    style={{
                      background: "rgba(10, 10, 15, 0.8)",
                      border: "1px solid rgba(157, 0, 255, 0.5)",
                    }}
                  >
                    <span className="text-[#00f0ff]">
                      {iconMap[link.icon] || <FiMail size={24} />}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="text-center mt-20 pt-8 border-t border-gray-800"
      >
        <p className="text-gray-500 text-sm">
          Designed & Built by{" "}
          <span className="text-[#00f0ff]">{personalInfo.name}</span> with{" "}
          <span className="text-[#9d00ff]">love</span>
        </p>
      </motion.div>
    </section>
  );
}
