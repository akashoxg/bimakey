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
        "bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#0F766E] text-white font-display font-extrabold text-sm md:text-base shadow-lg shadow-teal-600/30 hover:shadow-teal-500/50 border border-teal-400/30 transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        "[--shine:rgba(255,255,255,0.7)]",
        className
      )}
    >
      {/* Text with shine mask */}
      <motion.span
        className="tracking-wide flex items-center justify-center gap-2 h-full w-full relative z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ "--mask-x": "100%" }}
        animate={{ "--mask-x": "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
          repeatDelay: 1.5,
        }}
      >
        {children}
      </motion.span>

      {/* Border shine effect */}
      <motion.span
        className="block absolute inset-0 rounded-xl p-px pointer-events-none"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1.5,
        }}
      />
    </motion.button>
  );
};

export default AnimatedButton;
