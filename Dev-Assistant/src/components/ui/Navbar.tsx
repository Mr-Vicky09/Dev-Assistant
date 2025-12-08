"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 py-3"
          style={{
            background: "rgba(10, 10, 15, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(157, 0, 255, 0.2)",
          }}
        >
          <motion.a
            href="#hero"
            className="text-xl font-bold cursor-hover"
            whileHover={{ scale: 1.05 }}
            style={{
              background: "linear-gradient(135deg, #9d00ff, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            V.
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-white cursor-hover relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ color: "#00f0ff" }}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#00f0ff]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden text-white cursor-hover"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              className="w-6 h-5 flex flex-col justify-between"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-full h-0.5 bg-[#00f0ff]"
                variants={{
                  open: { rotate: 45, y: 9 },
                  closed: { rotate: 0, y: 0 },
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-[#9d00ff]"
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 },
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-[#00f0ff]"
                variants={{
                  open: { rotate: -45, y: -9 },
                  closed: { rotate: 0, y: 0 },
                }}
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(10, 10, 15, 0.95)" }}
            />
            <motion.div
              className="relative h-full flex flex-col items-center justify-center gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-2xl uppercase tracking-widest text-white cursor-hover"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ color: "#00f0ff", x: 10 }}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
