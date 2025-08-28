"use client";
import ProjectCard from "@/componenets/ProjectCard";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useFolderStore } from "../Store/folderStore";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";

export default function FolderPage() {
  const [addingProject, setAddingProject] = useState(false);
  const folders = useFolderStore((state) => state.folders);
  const projects = useFolderStore((state) => state.projects);
  const realPath = usePathname();
  const [projectName, setProjectName] = useState("");

  const path = realPath.split("/")[2].split("%20").join(" ");
  const folder = folders.filter((f) => f.name === path)[0];
  const folderId = folder?.id;
  const addProject = useFolderStore((state) => state.addProject);

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  return (
    <div className=" h-full max-h-[100%] mb-20   w-full  overflow-auto removeScrollBar ">
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
        <div className="flex gap-5 justify-start px-auto flex-wrap  px-2">
          {projects.filter((p) => p.folderId == folderId).length > 0 ||
          addingProject ? (
            projects
              .filter((p) => p.folderId == folderId)
              .map((p) => {
                return <ProjectCard key={p.id} name={p.name} project={p} />;
              })
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h2 className="font-light text-4xl w-full mt-5 text-gray-400 text-center">
                No Projects
              </h2>
              <h2 className="text-gray-400">
                Add project by clicking <i>+ New project</i> button.
              </h2>
            </div>
          )}

          {addingProject && (
            <div className="w-40 flex flex-col items-end mt-3">
              <FaTasks className="text-7xl text-gray-400 self-center" />
              <input
                type="text"
                autoFocus
                placeholder="New Project name"
                className="w-full border border-blue-900/50 px-2 py-2 font-normal focus:outline-0 focus:border-none placeholder:text-gray-600"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addProject(folderId, projectName, generateId(), "", []);
                    setAddingProject(false);
                  } else if (e.key === "Escape") {
                    setAddingProject(false);
                  }
                }}
              />
              <button
                className="cursor-pointer bg-[#152a6e] rounded-md px-2 py-1 text-sm font-normal mt-3"
                onClick={() => {
                  if (projectName.trim().length === 0) {
                    return;
                  }
                  addProject(folderId, projectName, generateId(), "", []);
                  setAddingProject(false);
                }}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
