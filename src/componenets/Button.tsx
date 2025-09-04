"use client";

import { motion } from "framer-motion";

type ButtonSize = "sm" | "md" | "lg" | "xl";

export default function Button({
  text,
  fill,
  bold,
  size,
  className = "",
  onClick,
}: {
  text: string;
  fill: boolean;
  bold: string;
  size: ButtonSize;
  className?: string;
  onClick?: () => void;
}) {
  // Define size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  // Define bold classes
  const boldClass = bold === "bold" ? "font-bold" : "font-medium";

  return (
    <motion.div
      className={`rounded-md bg-gradient-to-r from-blue-500 via-blue-400 to-purple-600 w-fit h-fit mx-auto p-[1px] ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <button
        className={`h-full w-full px-6 py-3 min-w-fit rounded-md flex items-center ${boldClass} ${
          sizeClasses[size] || sizeClasses.md
        } justify-center cursor-pointer transition-colors duration-200 ${
          fill
            ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
            : "bg-white text-gray-900 hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </motion.div>
  );
}
