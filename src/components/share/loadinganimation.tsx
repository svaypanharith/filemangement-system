"use client";

import { motion } from "framer-motion";

type LoadingThreeDotsPulseProps = {
  preset?: "primary" | "secondary" | "white";
};

function LoadingAnimation({
  preset = "primary",
}: LoadingThreeDotsPulseProps) {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const dot =
    preset === "primary"
      ? "size-3 bg-primary rounded-full"
      : preset === "secondary"
        ? "size-3 bg-secondary rounded-full"
        : "size-3 bg-white rounded-full";
  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex justify-center items-center gap-3"
    >
      <motion.div className={dot} variants={dotVariants} />
      <motion.div className={dot} variants={dotVariants} />
      <motion.div className={dot} variants={dotVariants} />
    </motion.div>
  );
}

export default LoadingAnimation;
