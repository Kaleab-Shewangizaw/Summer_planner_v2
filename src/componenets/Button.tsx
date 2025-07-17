"use client";

import { motion } from "framer-motion";
export default function Button({
  text,
  fill,
  bold,
  size,
}: {
  text: string;
  fill: boolean;
  bold: string;
  size: string;
}) {
  return (
    <motion.div
      className="rounded-md bg-gradient-to-r from-white via-blue-400 to-gray-800 w-fit h-fit mx-auto p-[1px] "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
    >
      <button
        className={`h-full w-full  px-2  py-1 rounded-sm flex items-center font-${bold} text-${size} justify-center cursor-pointer ${
          fill ? "bg-[#0f161e]" : "bg-[#0f161ea8]"
        }`}
      >
        {text}
      </button>
    </motion.div>
  );
}
