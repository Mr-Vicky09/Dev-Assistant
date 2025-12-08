# Vicky's Data Analyst Portfolio

## Overview
A Gen-Z dark rave aesthetic developer portfolio built with Next.js, featuring animated 3D elements, Framer Motion animations, and a cyberpunk neon design.

## Tech Stack
- **Framework**: Next.js 16 with TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei
- **Icons**: React Icons

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with navbar and cursor
│   └── page.tsx         # Main portfolio page
├── components/
│   ├── sections/        # Page sections (Hero, About, Experience, Projects, Contact)
│   ├── three/           # Three.js components (ParticleSphere)
│   └── ui/              # Reusable UI components (Navbar, GlitchButton, CustomCursor)
├── data/                # Portfolio data (personalInfo, skills, experiences, projects)
├── hooks/               # Custom React hooks (useMousePosition, useScrollPosition)
├── lib/                 # Utility functions
└── styles/              # Global CSS styles
```

## Features
- Interactive 3D particle sphere reacting to cursor movement
- Custom neon cursor with trailing glow effect
- Animated section reveals with Framer Motion
- Tilt-interactive project cards with glow borders
- Experience timeline with hover-to-reveal details
- Skills progress bars with neon animations
- Smooth scroll navigation
- Responsive mobile menu

## Color Palette
- Background: #0a0a0f
- Primary (Purple): #9d00ff
- Secondary (Cyan): #00f0ff
- Text: #ffffff

## Running the Project
```bash
npm run dev    # Start development server on port 5000
npm run build  # Build for production
npm run start  # Start production server
```

## Content Customization
Edit `src/data/portfolio.ts` to update:
- Personal information and bio
- Skills and proficiency levels
- Work experience history
- Project showcase items
- Social media links

## Recent Changes
- Initial project setup with all sections
- Created interactive Three.js particle sphere
- Implemented custom neon cursor with trailing effect
- Built responsive navigation with scroll behavior
- Added animated timeline for experience section
- Created tilt-interactive project cards with modal

## User Preferences
- Gen-Z dark rave aesthetic
- Neon glitch and cyberpunk energy
- Smooth motion animations (not chaotic)
- Bold, experimental typography
- Minimal wording, high visual impact
