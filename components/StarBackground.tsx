/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Foruddefinerede stjerne positioner
const STAR_POSITIONS = Array(50)
  .fill(0)
  .map((_, i) => ({
    left: `${(i * 13.5) % 100}%`,
    top: `${(i * 7.3) % 100}%`,
    delay: i * 0.15,
    duration: 2 + (i % 4),
  }));

export default function StarBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10">
      {STAR_POSITIONS.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1"
          style={{
            left: position.left,
            top: position.top,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: position.duration,
            delay: position.delay,
            ease: "easeInOut",
          }}
        >
          <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" />
        </motion.div>
      ))}
    </div>
  );
}
