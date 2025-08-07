"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GrTask } from "react-icons/gr";
import { SlOptionsVertical } from "react-icons/sl";
import { Project } from "@/utils/types";

interface ProjectCardProps {
  name: string;
  project: Project;
}

export default function ProjectCard({ name, project }: ProjectCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const link = `${path}/${encodeURIComponent(name)}`;

  // Truncate name if needed
  const displayName = name.length > 22 ? name.slice(0, 20) + "..." : name;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    if (showOptions) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  return (
    <div className="relative group bg-[#131e3c] border border-blue-300/10 rounded-xl p-4 w-full sm:w-64 md:w-72 shadow hover:shadow-blue-300/10 transition">
      {/* Options Button */}
      <div className="absolute top-3 right-3 z-30">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions((prev) => !prev);
          }}
          className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
        >
          <SlOptionsVertical className="text-gray-300 text-sm" />
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 bg-[#1f2a48] border border-blue-400/20 rounded-md w-36 shadow-md z-50 overflow-hidden"
            >
              {["Rename", "Move", "Delete"].map((option) => (
                <button
                  key={option}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition ${
                    option === "Delete" ? "text-red-400" : "text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Link */}
      <Link
        href={link}
        className="flex flex-col h-full text-gray-300 hover:text-white transition-all"
      >
        <GrTask className="text-4xl text-blue-400 mb-4 mx-auto" />
        <h2 className="text-lg font-semibold text-center mb-2">
          {displayName}
        </h2>
        <p className="text-xs text-gray-400 text-center line-clamp-2 mb-3">
          {project.description
            ? project.description
            : "no description provided"}
        </p>

        {/* Metadata row */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span className="px-2 py-0.5 rounded-full bg-blue-800/40 text-blue-300 capitalize">
            {status}
          </span>
          <span className="italic"></span>
        </div>
      </Link>
    </div>
  );
}
