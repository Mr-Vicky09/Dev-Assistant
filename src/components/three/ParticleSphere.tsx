"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const particleCount = 2000;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 0.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    targetRotation.current.x = mouse.y * 0.3;
    targetRotation.current.y = mouse.x * 0.3;

    ref.current.rotation.y += 0.002;
    ref.current.rotation.x += 0.001;

    ref.current.rotation.x += (targetRotation.current.x - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (targetRotation.current.y - ref.current.rotation.y) * 0.02;

    const time = state.clock.getElapsedTime();
    const positionAttr = ref.current.geometry.attributes.position;
    const originalPositions = positions;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      const z = originalPositions[i3 + 2];

      const noise = Math.sin(time * 0.5 + i * 0.01) * 0.1;
      positionAttr.setXYZ(i, x + noise, y + noise * 0.5, z + noise * 0.3);
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function InnerSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  const targetRotation = useRef({ x: 0, z: 0 });
  const particleCount = 1000;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    
    targetRotation.current.x = -mouse.y * 0.2;
    targetRotation.current.z = mouse.x * 0.2;
    
    ref.current.rotation.y -= 0.003;
    ref.current.rotation.x += (targetRotation.current.x - ref.current.rotation.x) * 0.02;
    ref.current.rotation.z += (targetRotation.current.z - ref.current.rotation.z) * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#9d00ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ParticleSphereProps {
  mousePosition?: { x: number; y: number };
}

export default function ParticleSphere({ mousePosition = { x: 0, y: 0 } }: ParticleSphereProps) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const normalizedMouse = {
    x: (mousePosition.x / dimensions.width - 0.5) * 2,
    y: (mousePosition.y / dimensions.height - 0.5) * 2,
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField mouse={normalizedMouse} />
        <InnerSphere mouse={normalizedMouse} />
      </Canvas>
    </div>
  );
}
