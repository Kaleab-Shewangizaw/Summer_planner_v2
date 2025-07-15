"use client";
import { motion, scale } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      className="w-10 h-10  flex items-end justify-center p-0 font-extrabold bg-red-500 rounded-md  cursor-pointer"
      whileHover={{ scale: 1.1 }}
    >
      SP
    </motion.div>
  );
}
