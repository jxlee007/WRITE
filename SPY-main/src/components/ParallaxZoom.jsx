"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxZoom() {
  try {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.6], [0.2, 1.3]);

    return (
      <motion.div
        className="parallax-zoom fixed top-0 h-screen w-full flex items-center justify-center -z-10"
        style={{ scale }}
      >
        <div
          className="w-full h-full bg-center bg-cover opacity-90"
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}images/c6138875-a9c0-4dab-a7f1-66a261c7671e.png")`,
          }}
        />
      </motion.div>
    );
  } catch (e) {
    // If framer-motion isn't available at runtime, render a static hero image
    return (
      <div className="parallax-zoom fixed top-0 h-screen w-full flex items-center justify-center -z-10">
        <div
          className="w-full h-full bg-center bg-cover opacity-90"
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}images/c6138875-a9c0-4dab-a7f1-66a261c7671e.png")`,
          }}
        />
      </div>
    );
  }
}
