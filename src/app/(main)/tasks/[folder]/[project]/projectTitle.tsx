import { Project } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { BiEdit, BiShare } from "react-icons/bi";
import { BsClock, BsStar } from "react-icons/bs";

export default function ProjectTitle({
  project,
  setEditProject,
  editProject,
}: {
  project: Project;
  setEditProject: Dispatch<SetStateAction<boolean>>;
  editProject: boolean;
}) {
  return (
    <div className="flex flex-col rounded-xl p-4 mb-2 bg-gradient-to-r from-gray-600/50 to-gray-800/50 shadow-lg">
      {/* Header with title and edit button */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white truncate max-w-md">
            {project.name}
          </h1>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-200 text-xs font-medium rounded-full flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            Completed
          </span>
        </div>
        <button
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150 text-white/80 hover:text-white"
          onClick={() => setEditProject(!editProject)}
          aria-label="Edit project"
        >
          <BiEdit className="text-xl" />
        </button>
      </div>

      {/* Description and creation date */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
        <p className="text-white/80 text-sm line-clamp-2 flex-1">
          {project.description || "Project description goes here"}
        </p>
        <div className="text-white/70 text-sm">
          Created on:{" "}
          <span className="font-medium text-white">Aug 10, 2023</span>
        </div>
      </div>

      {/* Team members and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Team avatars */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-indigo-900"></div>
          <div className="w-8 h-8 rounded-full bg-red-400 border-2 border-indigo-900 -ml-3"></div>
          <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-indigo-900 -ml-3"></div>
          <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-indigo-900 -ml-3"></div>
          <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-indigo-900 -ml-3 flex items-center justify-center text-gray-900 text-xs font-bold">
            +3
          </div>
          <button className="ml-4 px-3 py-1.5 text-xs font-medium text-white/90 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-150">
            + Add member
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150 text-white/80 hover:text-white"
            aria-label="Set reminder"
          >
            <BsClock />
          </button>
          <button
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150 text-white/80 hover:text-white"
            aria-label="Mark as favorite"
          >
            <BsStar />
          </button>
          <button className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 transition-colors duration-150 text-white font-medium flex items-center gap-1.5">
            <BiShare />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
