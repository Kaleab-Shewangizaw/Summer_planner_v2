"use client";

import Link from "next/link";
import { FaTasks, FaCalendarAlt, FaUser, FaFlag } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";

export default function ProjectCard({
  name,
  project,
}: {
  name: string;
  project: { id: number; name: string; description?: string };
}) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Generate random project management data for demo purposes

  const randomDueDate = new Date();
  randomDueDate.setDate(
    randomDueDate.getDate() + Math.floor(Math.random() * 30)
  );
  const formattedDueDate = randomDueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const priorityOptions = ["High", "Medium", "Low"];
  const randomPriority = priorityOptions[Math.floor(Math.random() * 3)];
  const priorityColor =
    randomPriority === "High"
      ? "text-red-400"
      : randomPriority === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  const teamMembers = Math.floor(Math.random() * 5) + 1;

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
                  {name}
                </h3>
              </Link>
              <div className="px-2 py-0.5 rounded-full text-gray-500 border text-xs">
                <h3>{teamMembers % 2 ? "Team" : "Private"}</h3>
              </div>
            </div>
            <div className="flex items-center text-xs gap-2 text-gray-400">
              <FaFlag className={`text-sm ${priorityColor}`} />
              <span>{randomPriority}</span>
            </div>
          </div>
          {project.description && (
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {project.description.trim() !== ""
                ? project.description
                : "No description provided."}
            </p>
          )}

          <div className="mt-auto flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1.5" />
              <span>{formattedDueDate}</span>
            </div>

            <div className="flex items-center">
              <FaUser className="mr-1.5" />
              <span>
                {teamMembers} member{teamMembers !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
