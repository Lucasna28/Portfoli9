/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkSpeed: number;
  color: string;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  color: string;
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulas, setNebulas] = useState<Nebula[]>([]);

  useEffect(() => {
    const starColors = [
      "rgb(255, 255, 255)", // Hvid
      "rgb(255, 250, 240)", // Varm hvid
      "rgb(230, 240, 255)", // Blålig
      "rgb(255, 240, 245)", // Let rosa
    ];

    const nebulaColors = [
      "rgba(147, 51, 234, 0.03)", // primary farve
      "rgba(139, 92, 246, 0.02)", // Violet
      "rgba(167, 139, 250, 0.02)", // Lysere violet
    ];

    const createStars = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        blinkSpeed: Math.random() * 0.01 + 0.005,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      }));
    };

    const createNebulas = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.7 + 0.8,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.2 + 0.1,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
      }));
    };

    setStars(createStars(150));
    setNebulas(createNebulas(6));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Baggrundsgradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-30" />

      {/* Nebula effekter */}
      {nebulas.map((nebula) => (
        <motion.div
          key={nebula.id}
          className="absolute rounded-full blur-[100px]"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: "50vmax",
            height: "50vmax",
            backgroundColor: nebula.color,
            opacity: nebula.opacity,
            transform: `scale(${nebula.scale}) rotate(${nebula.rotation}deg)`,
          }}
          animate={{
            scale: [nebula.scale, nebula.scale * 1.1, nebula.scale],
            opacity: [nebula.opacity, nebula.opacity * 0.7, nebula.opacity],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stjerner med forbedret glow */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            filter: `blur(${star.size * 0.2}px)`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 1.3, star.opacity],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 / star.blinkSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Overlay gradienter */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                   from-transparent via-black/20 to-black/40"
      />
    </div>
  );
}
