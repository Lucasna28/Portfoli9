"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 origin-top z-50"
      style={{
        scaleY: scrollYProgress,
        opacity: 1,
      }}
    />
  );
}
