"use client";

import Link from "next/link";
import { FaTasks, FaCalendarAlt, FaFlag } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";

export default function ProjectCard({
  project,
}: {
  project: {
    title: string;
    id: number;
    name: string;
    description?: string;
    priority: string;
    startedAt: Date;
  };
}) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Generate random project management data for demo purposes

  const randomDueDate = new Date();
  randomDueDate.setDate(
    randomDueDate.getDate() + Math.floor(Math.random() * 30)
  );
  console.log(project);

  const priorityColor =
    project.priority === "high"
      ? "text-red-400"
      : project.priority === "medium"
      ? "text-yellow-400"
      : "text-green-400";

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
    <div className="relative group bg-gray-800/50 border border-gray-700 rounded-lg py-4 px-2 hover:border-gray-600 transition-colors duration-200 h-full flex flex-col">
      <div className="flex-grow block">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-3 mb-3 ">
              <FaTasks className="text-gray-400 text-md" />

              <Link href={`/tasks/project/${project.id}`}>
                <h3 className="font-semibold text-blue-400 text-md truncate  hover:underline">
                  {project.title}
                </h3>
              </Link>
              <div className="px-2 py-0.5 rounded-full text-gray-500 border text-xs">
                <h3>{"Private"}</h3>
              </div>
            </div>
            <div className="flex items-center text-xs gap-2 text-gray-400">
              <FaFlag className={`text-sm ${priorityColor}`} />
              <span>{project.priority}</span>
            </div>
          </div>
          {project.description && (
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {project.description.trim() !== ""
                ? project.description
                : "No description provided."}
            </p>
          )}

          <div className="mt-auto flex justify-end text-xs text-gray-500">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1.5" />
              <span>{"date goes here"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
