"use client";

import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(196, 181, 253, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -100, -50, 0],
          y: [0, -50, -100, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(94, 234, 212, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

    </div>
  );
}
