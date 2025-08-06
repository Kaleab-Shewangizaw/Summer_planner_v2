"use client";

import SideFolderComponenet from "@/componenets/Folder";
import { Folder, Project } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { BiFolderPlus } from "react-icons/bi";

export default function TasksSidebar() {
  const [show, setShow] = useState(true);
  const [addingFolder, setAddingFolder] = useState(true);
  const [folders, setFolders] = useState<Folder[] | []>([]);
  const [projects, setProjects] = useState<Project[] | []>([]);
  const [folderName, setFolderName] = useState("");

  return (
    <div className=" bg-blue-900/10 h-full rounded-sm w-fit  group">
      <div
        className=" p-1 h-fit w-fit cursor-pinter  absolute  top-3 left-20   text-2xl cursor-pointer text-gray-100 px-2 py-1 rounded-md bg-blue-900/50"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? (
          <h2 className="text-sm">Hide tree</h2>
        ) : (
          <h2 className="text-sm">Show tree</h2>
        )}
      </div>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            className="rounded-sm w-full min-w-fit p-5 px-1 overflow-hidden  flex-col  h-full max-h-[100%] hidden md:flex"
            key="content"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <div className="overflow-auto flex-1 removeScrollBar min-w-fit rounded-sm w-80 ">
              {folders.length > 0 ? (
                folders.map((folder) => {
                  return (
                    <SideFolderComponenet
                      key={folder.id}
                      name={folder.name}
                      id={folder.id}
                      projects={projects.filter(
                        (project) => project.folderId == folder.id
                      )}
                      deleteFolder={deleteFolder}
                      emptyFolder={emptyFolder}
                      renameFolder={renameFolder}
                      addProject={addProject}
                    />
                  );
                })
              ) : (
                <h2 className="font-light text-center mt-5">No folders</h2>
              )}
              {addingFolder && (
                <div className="w-full flex flex-col items-end mt-3">
                  <input
                    type="text"
                    placeholder="New folder name"
                    className="w-full border border-blue-900/50 px-2 py-2 font-normal focus:outline-0 focus:border-none placeholder:text-gray-600"
                    onChange={(e) => {
                      setFolderName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createFolder(folderName);
                        setAddingFolder(false);
                      }
                    }}
                  />
                  <button
                    className="cursor-pointer bg-[#152a6e] rounded-md px-2 py-1 text-sm font-normal mt-3"
                    onClick={() => {
                      if (folderName.trim().length === 0) {
                        return;
                      }
                      createFolder(folderName);
                      setAddingFolder(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            <div
              className="flex justify-end"
              onClick={() => {
                setAddingFolder(true);
              }}
            >
              <BiFolderPlus className="text-3xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  function createFolder(name: string) {
    const newFolder = {
      name: name,
      projects: [],
      id: generateId(),
    };

    setFolders([...folders, newFolder]);
  }

  function deleteFolder(id: number) {
    setFolders(folders.filter((folder) => folder.id != id));
  }
  function emptyFolder(id: number) {
    const filteredProjects = projects?.filter(
      (project) => project.folderId !== id
    );
    setProjects(filteredProjects);
    return;
  }
  function renameFolder(id: number, name: string) {
    const newFolders = folders.map((folder) => {
      if (folder.id !== id) return folder;
      return { ...folder, name };
    });
    setFolders(newFolders);
    return;
  }
  function addProject(id: number) {
    return;
  }
}
