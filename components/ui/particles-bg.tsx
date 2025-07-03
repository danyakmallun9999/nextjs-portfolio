"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: "#a78bfa" },
          shape: { type: "circle" },
          opacity: { value: 0.2 },
          size: { value: 2 },
          move: { enable: true, speed: 0.5 },
          links: {
            enable: true,
            color: "#a78bfa",
            opacity: 0.2,
            width: 1,
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
} 