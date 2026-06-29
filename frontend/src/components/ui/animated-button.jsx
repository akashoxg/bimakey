import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedButton = ({
  children = "Get Started",
  className = "",
  onClick,
  type = "button",
  ...rest
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...rest}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={cn(
        "group inline-flex items-center justify-center px-6 py-3 rounded-xl relative overflow-hidden",
        "bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#0F766E] text-white font-display font-extrabold text-sm md:text-base shadow-lg shadow-teal-600/30 hover:shadow-teal-500/50 border border-teal-400/30 transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        className
      )}
    >
      <span className="tracking-wide flex items-center justify-center gap-2 h-full w-full relative z-10">
        {children}
      </span>
      {/* Subtle CSS sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
    </motion.button>
  );
};

export default AnimatedButton;
