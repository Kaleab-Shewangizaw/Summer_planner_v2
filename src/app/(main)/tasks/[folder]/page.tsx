"use client";
import ProjectCard from "@/componenets/ProjectCard";
import { useState } from "react";
import { BiFolderPlus, BiPlus } from "react-icons/bi";
import { GoProject, GoProjectRoadmap } from "react-icons/go";

export default function FolderPage() {
  const [addingProject, setAddingProject] = useState(false);
  return (
    <div className=" h-full max-h-[100%]   w-full  overflow-auto removeScrollBar ">
      <div className=" py-5 border-gray-700 border-t">
        <div className="flex items-center justify-between mb-3  px-4">
          <p className="text-gray-300 text-lg">Projects</p>
          <button
            onClick={() => {
              setAddingProject(true);
            }}
            className="cursor-pointer bg-blue-900/50 rounded-md px-2 py-1 text-sm font-normal hover:bg-blue-900/70 transition-all duration-200 flex items-center gap-1"
          >
            <BiPlus className="text-xl text-gray-300" /> New Project
          </button>
        </div>
        <div className="flex gap-5 justify-start px-auto flex-wrap  px-2"></div>
      </div>
    </div>
  );
}
