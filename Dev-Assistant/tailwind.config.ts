import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        primary: "#9d00ff",
        secondary: "#00f0ff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "glitch": "glitch 0.3s infinite",
        "glow-pulse": "glow-pulse 2s infinite",
        "neon-flicker": "neon-flicker 1.5s infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
