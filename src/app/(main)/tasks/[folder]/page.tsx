"use client";
import ProjectCard from "@/componenets/ProjectCard";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useFolderStore } from "../Store/folderStore";
import { usePathname } from "next/navigation";
import AddProjectModal from "./[project]/addProjectModal";

export default function FolderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const folders = useFolderStore((state) => state.folders);
  const projects = useFolderStore((state) => state.projects);
  const realPath = usePathname();

  const path = realPath.split("/")[2].split("%20").join(" ");
  const folder = folders.find((f) => f.name === path);
  const folderId = folder?.id;

  const folderProjects = projects.filter((p) => p.folderId === folderId);

  return (
    <div className="h-full max-h-[100%] mb-20 w-full overflow-auto removeScrollBar">
      <div className="py-5 border-gray-700 border-t">
        <div className="flex items-center justify-between mb-6 px-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-100">
              {folder?.name || "Projects"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {folderProjects.length} project
              {folderProjects.length !== 1 ? "s" : ""} in this folder
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <BiPlus className="text-lg" />
            New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6">
          {folderProjects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              project={project}
            />
          ))}
        </div>

        {/* Empty State */}
        {folderProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <BiPlus className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-light text-gray-300 mb-2">
              No Projects Yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Get started by creating your first project in this folder
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <BiPlus className="text-lg" />
              Create First Project
            </button>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <AddProjectModal
          folderId={folderId}
          folderName={folder?.name || ""}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
