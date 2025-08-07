"use client";

import SideFolderComponenet from "@/componenets/Folder";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { useFolderStore } from "./Store/folderStore";

export default function TasksSidebar() {
  const folders = useFolderStore((state) => state.folders);
  const projects = useFolderStore((state) => state.projects);

  const deleteFolder = useFolderStore((state) => state.deleteFolder);
  const emptyFolder = useFolderStore((state) => state.emptyFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const addProject = useFolderStore((state) => state.addProject);
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
