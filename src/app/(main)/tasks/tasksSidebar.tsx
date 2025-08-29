"use client";

import SideFolderComponenet from "@/componenets/Folder";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { useFolderStore } from "./Store/folderStore";
import { BiFolderPlus } from "react-icons/bi";

export default function TasksSidebar() {
  const folders = useFolderStore((state) => state.folders);
  const projects = useFolderStore((state) => state.projects);

  const deleteFolder = useFolderStore((state) => state.deleteFolder);
  const emptyFolder = useFolderStore((state) => state.emptyFolder);
  const createFolder = useFolderStore((state) => state.createFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const addProject = useFolderStore((state) => state.addProject);
  const [addingFolder, setAddingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [show, setShow] = useState(true);

  return (
    <div className=" bg-blue-900/10 h-full rounded-sm   group">
      <div
        className=" p-1 h-fit w-fit cursor-pinter hidden md:block  absolute  top-3 left-20   text-2xl cursor-pointer text-gray-100 px-2 py-1 rounded-md bg-blue-900/50"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? (
          <h2 className="text-sm hidden md:block">Hide tray</h2>
        ) : (
          <h2 className="text-sm hidden md:block">Show tray</h2>
        )}
      </div>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            className="rounded-sm w-80 min-w-fit p-5 px-1 overflow-x-hidden  flex-col  h-full max-h-[100%] hidden md:flex"
            key="content"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
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
                <div className="w-full flex flex-col items-end my-1">
                  <input
                    aria-placeholder="new project"
                    value={folderName}
                    type="text"
                    autoFocus
                    placeholder="untitled folder"
                    className="w-full border border-blue-900/50 px-2 py-2 font-normal focus:outline-0 focus:border-none placeholder:text-gray-600"
                    onChange={(e) => {
                      setFolderName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const fdName = folderName.trim();

                        if (fdName.length === 0) {
                          createFolder("untitled folder");
                          setAddingFolder(false);
                          setFolderName("");
                          setShow(true);
                        } else {
                          createFolder(folderName);
                          setAddingFolder(false);
                          setFolderName("");
                        }
                      } else if (e.key === "Escape") {
                        setAddingFolder(false);
                      }
                    }}
                  />
                  <div>
                    <button
                      className="cursor-pointer bg-[#101113] rounded-md px-5 py-1  text-sm font-normal mt-3 mx-3 "
                      onClick={() => {
                        setAddingFolder(false);

                        setFolderName("");
                      }}
                    >
                      Cancel
                    </button>{" "}
                    <button
                      className="cursor-pointer bg-[#152a6e] rounded-md px-5 py-1  text-sm font-normal mt-3 mx-3 "
                      onClick={() => {
                        const fdName = folderName.trim();

                        if (fdName.length === 0) {
                          createFolder("untitled folder");
                          setAddingFolder(false);
                          setFolderName("");
                          setShow(true);
                        } else {
                          createFolder(folderName);
                          setAddingFolder(false);
                          setFolderName("");
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setAddingFolder(true);
              }}
              className="cursor-pointer bg-blue-900/50 rounded-md px-2 py-1 text-sm font-normal hover:bg-blue-900/70 transition-all duration-200 flex items-center gap-2 justify-center"
            >
              <BiFolderPlus className="text-3xl text-gray-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
