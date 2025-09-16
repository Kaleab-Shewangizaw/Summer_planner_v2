"use client";

import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { PiX } from "react-icons/pi";

export default function ProjectCard({
  name,
  project,
}: {
  name: string;
  project: { id: number; name: string; description?: string };
}) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const displayName = name.length > 20 ? `${name.substring(0, 17)}...` : name;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="relative group">
      {/* Options Button */}
      <button
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-gray-700/50 z-10"
        onClick={() => setShowOptions(!showOptions)}
      >
        {showOptions ? <PiX size={14} /> : <SlOptionsVertical size={14} />}
      </button>

      {/* Options Menu */}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 right-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20 min-w-[140px]"
          ref={optionsRef}
        >
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors">
            Edit
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors">
            Duplicate
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors">
            Delete
          </button>
        </motion.div>
      )}

      {/* Project Card */}
      <Link
        href={`/tasks/project/${project.id}`}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors duration-200 block h-full"
      >
        <div className="flex flex-col items-center text-center h-full">
          <FaTasks className="text-4xl text-blue-400 mb-3" />
          <h3 className="font-medium text-gray-100 mb-1 text-sm">
            {displayName}
          </h3>
          {project.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
