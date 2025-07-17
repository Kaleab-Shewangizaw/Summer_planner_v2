"use client";
import { motion } from "framer-motion";

export default function NavLinks() {
  return (
    <div>
      <ul className="flex gap-10 justify-between">
        <motion.li whileHover={{}} className="cursor-pointer">
          Home
        </motion.li>
        <motion.li whileHover={{}} className="cursor-pointer">
          How it works
        </motion.li>
        <motion.li whileHover={{}} className="cursor-pointer">
          New
        </motion.li>
        <motion.li whileHover={{}} className="cursor-pointer">
          Blog
        </motion.li>
        <motion.li whileHover={{}} className="cursor-pointer">
          Help
        </motion.li>
      </ul>
    </div>
  );
}
