"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { BiFolder } from "react-icons/bi";
import { BsHash } from "react-icons/bs";
import { CgMoreVertical } from "react-icons/cg";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function SideFolderComponent({
  name,
  id,
  projects,
  deleteFolder,
  addProject,
  renameFolder,
  emptyFolder,
}: {
  name: string;
  id: number;
  deleteFolder: (id: number) => void;
  addProject: (id: number, name: string, folderId: number) => void;
  renameFolder: (id: number, name: string) => void;
  emptyFolder: (id: number) => void;
  projects:
    | []
    | {
        name: string;
        id: number;
      }[];
}) {
  const pathname = usePathname();
  const [path, setPath] = useState("");
  const [path2, setPath2] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editFolderName, setEditFolderName] = useState(false);
  const [newName, setNewName] = useState(name);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    if (pathname) {
      const parts = pathname.split("/");
      setPath(parts[1] === "tasks" ? decodeURIComponent(parts[2] || "") : "");
      setPath2(parts[1] === "tasks" ? decodeURIComponent(parts[3] || "") : "");
    }
  }, [pathname]);

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

  if (!hasMounted) return null;

  const generateId = () => Math.floor(Math.random() * 10001);

  const handleDoubleClick = () => {
    setEditFolderName(true);
    setShowOptions(false);
  };

  const handleBlur = () => {
    setEditFolderName(false);
    const trimmed = newName.trim();
    if (!trimmed) {
      setNewName(name); // revert
    } else if (trimmed !== name) {
      renameFolder(id, trimmed);
    }
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="text-gray-400 bg-blue-900/20 relative w-full">
      <AnimatePresence>
        {showOptions && (
          <motion.div
            ref={optionsRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-10 right-3 z-50 w-40 rounded-md bg-[#131e3c] border border-blue-400/20 shadow-lg p-1 text-sm"
          >
            <button
              className="w-full text-left py-2 px-3 rounded-sm hover:bg-gray-800"
              onClick={() => {
                const newId = generateId();
                addProject(id, "Untitled Project", newId);
              }}
            >
              + New Project
            </button>
            <button
              className="w-full text-left py-2 px-3 rounded-sm hover:bg-gray-800"
              onClick={handleDoubleClick}
            >
              Rename folder
            </button>
            <button
              className="w-full text-left py-2 px-3 rounded-sm hover:bg-gray-800"
              onClick={() => {
                if (confirm("Are you sure you want to empty this folder?")) {
                  emptyFolder(id);
                }
              }}
            >
              Empty folder
            </button>
            <button
              className="w-full text-left py-2 px-3 rounded-sm hover:bg-gray-800"
              onClick={() => {
                if (confirm("Delete this folder permanently?")) {
                  deleteFolder(id);
                }
              }}
            >
              Delete Folder
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="flex w-full items-center justify-between px-3 py-3 hover:bg-blue-800/20 group relative"
        onDoubleClick={handleDoubleClick}
      >
        <div onClick={() => setShow(!show)} className="cursor-pointer p-1">
          {show ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        <div className="text-2xl px-2">
          <BiFolder />
        </div>
        {editFolderName ? (
          <input
            autoFocus
            type="text"
            value={newName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-[90%] px-2 py-1 border border-blue-800 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xl"
          />
        ) : (
          <Link
            href={`/tasks/${name}`}
            className="flex-1"
            onClick={() => setShow(true)}
          >
            <h1
              className={`text-sm ${
                path === name ? "text-gray-100 font-bold" : ""
              }`}
            >
              {name}
            </h1>
            {!show && (
              <div className="text-gray-400 text-xs px-2">
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </div>
            )}
          </Link>
        )}

        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className="cursor-pointer p-1 hover:bg-gray-700/30 rounded"
        >
          <CgMoreVertical />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            key="folder-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-gray-900 border-x border-gray-700"
          >
            <div className="px-3 py-1 text-gray-400 text-xs">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </div>

            {projects.map((project) => {
              const isActive = path === name && path2 === project.name;
              return (
                <Link
                  key={project.id}
                  href={`/tasks/${encodeURIComponent(
                    name
                  )}/${encodeURIComponent(project.name)}`}
                  className={`flex items-center gap-2 py-2 px-4 pl-10 text-sm rounded-sm transition-all duration-200 cursor-pointer hover:bg-gray-800 ${
                    isActive ? "text-white font-bold" : ""
                  }`}
                >
                  <BsHash />
                  {project.name}
                </Link>
              );
            })}

            {projects.length === 0 && (
              <div className="text-gray-500 text-sm px-4 py-3 italic">
                No projects in this folder.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
